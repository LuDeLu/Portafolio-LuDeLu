import { NotificationEmail } from "@/components/emails/notification-email";
import { ConfirmationEmail } from "@/components/emails/confirmation-email";
import { Resend } from "resend";
import { z } from "zod";

// Instantiated per request so a missing key fails the request, not the build.
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(apiKey);
};

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "lucas@orionmkt.com.ar";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Portafolio LuDeLu <no-reply@orionmkt.com.ar>";

// Route files may only export handlers, so these stay local — the client
// mirrors them in src/components/ContactForm.tsx.
const MIN_NAME = 2;
const MIN_MESSAGE = 10;

const Email = z.object({
  fullName: z.string().trim().min(MIN_NAME),
  email: z.string().trim().email(),
  message: z.string().trim().min(MIN_MESSAGE),
  language: z.enum(["es", "en"]).default("es"),
});

/**
 * The client renders the message, so the API answers with a stable code per
 * field instead of an English sentence the visitor would never understand.
 */
const FIELD_CODES: Record<string, string> = {
  fullName: "invalid_name",
  email: "invalid_email",
  message: "short_message",
};

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = Email.safeParse(body);

    if (!parsed.success) {
      const fields = parsed.error.issues.map(
        (i) => FIELD_CODES[String(i.path[0])] ?? "invalid_request"
      );
      return Response.json(
        { error: "validation", code: fields[0], fields },
        { status: 400 }
      );
    }

    const { fullName, email, message, language } = parsed.data;
    const resend = getResend();

    // The notification is the one that must land — if it fails, the visitor
    // gets an error instead of a false confirmation.
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Nuevo mensaje de ${fullName} — Portafolio`,
      react: NotificationEmail({ fullName, email, message }),
    });

    if (error) {
      console.error("[contact] notification failed:", error);
      return Response.json({ error: error.message ?? "Email delivery failed" }, { status: 502 });
    }

    // Best effort: a failed receipt shouldn't invalidate a message that arrived.
    let confirmationSent = true;
    const { error: confirmationError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      replyTo: TO_EMAIL,
      subject:
        language === "en"
          ? "We got your message — Lucas Baez"
          : "Recibí tu mensaje — Lucas Baez",
      react: ConfirmationEmail({ fullName, message, language, replyTo: TO_EMAIL }),
    });

    if (confirmationError) {
      confirmationSent = false;
      console.error("[contact] confirmation failed:", confirmationError);
    }

    return Response.json({ id: data?.id, confirmationSent });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    const messageText = err instanceof Error ? err.message : "Unexpected error";
    return Response.json({ error: messageText }, { status: 500 });
  }
}
