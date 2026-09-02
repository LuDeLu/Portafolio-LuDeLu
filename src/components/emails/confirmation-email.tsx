import * as React from "react";

interface ConfirmationEmailProps {
  fullName: string;
  message: string;
  language: "es" | "en";
  replyTo: string;
}

const copy = {
  es: {
    kicker: "PORTAFOLIO · LUDELU",
    heading: "¡Recibí tu mensaje!",
    greeting: (name: string) => `Hola ${name},`,
    body: "Gracias por escribirme. Ya me llegó tu consulta y te voy a responder lo antes posible, normalmente dentro de las 24 hs hábiles.",
    copyLabel: "Esto fue lo que enviaste",
    footer: (email: string) =>
      `Si necesitás agregar algo, respondé este mail o escribime a ${email}.`,
    signature: "Lucas Baez · Desarrollador Full Stack",
  },
  en: {
    kicker: "PORTFOLIO · LUDELU",
    heading: "Got your message!",
    greeting: (name: string) => `Hi ${name},`,
    body: "Thanks for reaching out. Your message came through and I'll get back to you as soon as possible, usually within 24 business hours.",
    copyLabel: "Here's what you sent",
    footer: (email: string) =>
      `If you need to add anything, just reply to this email or write to ${email}.`,
    signature: "Lucas Baez · Full Stack Developer",
  },
};

const wrapper: React.CSSProperties = {
  margin: 0,
  padding: "32px 16px",
  backgroundColor: "#f4f4f5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const card: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #e4e4e7",
};

export const ConfirmationEmail: React.FC<Readonly<ConfirmationEmailProps>> = ({
  fullName,
  message,
  language,
  replyTo,
}) => {
  const c = copy[language] ?? copy.es;

  return (
    <div style={wrapper}>
      <div style={card}>
        <div style={{ padding: "20px 28px", backgroundColor: "#171123" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "#a663cc", letterSpacing: "1px" }}>
            {c.kicker}
          </p>
          <p style={{ margin: "6px 0 0", fontSize: "19px", color: "#ffffff", fontWeight: 700 }}>
            {c.heading}
          </p>
        </div>

        <div style={{ padding: "28px" }}>
          <p style={{ margin: "0 0 12px", fontSize: "16px", color: "#18181b" }}>
            {c.greeting(fullName)}
          </p>
          <p style={{ margin: "0 0 24px", fontSize: "15px", lineHeight: "1.6", color: "#3f3f46" }}>
            {c.body}
          </p>

          <p
            style={{
              margin: "0 0 8px",
              fontSize: "11px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#71717a",
            }}
          >
            {c.copyLabel}
          </p>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#fafafa",
              borderLeft: "3px solid #6f2dbd",
              borderRadius: "6px",
              fontSize: "14px",
              lineHeight: "1.6",
              color: "#52525b",
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </div>

          <p style={{ margin: "24px 0 0", fontSize: "13px", color: "#71717a" }}>
            {c.footer(replyTo)}
          </p>
          <p style={{ margin: "20px 0 0", fontSize: "14px", color: "#18181b", fontWeight: 600 }}>
            {c.signature}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationEmail;
