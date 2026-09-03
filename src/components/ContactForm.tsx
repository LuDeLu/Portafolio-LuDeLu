"use client";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/language";

/** Kept in sync with the zod schema in src/app/api/send/route.ts. */
const MIN_NAME = 2;
const MIN_MESSAGE = 10;

const FIELD_FOR_CODE: Record<string, string> = {
  invalid_name: "fullname",
  invalid_email: "email",
  short_message: "content",
};

/** Marks an error whose message is already localised and safe to show. */
class FormError extends Error {}

const ContactForm = () => {
  const { t, language } = useLanguage();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [fieldError, setFieldError] = React.useState<string | null>(null);

  const { toast } = useToast();

  // Move the caret to whichever field the API rejected.
  React.useEffect(() => {
    if (!fieldError) return;
    document.getElementById(fieldError)?.focus();
  }, [fieldError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          message,
          language,
        }),
      });
      const data = await res.json().catch(() => ({}));
      // A status check is the only reliable signal that the mail went out.
      if (!res.ok || data.error) {
        // 400 carries a field code the API defined; anything else is delivery.
        const key: string =
          res.status === 400 ? data.code ?? "invalid_request" : "delivery";
        const errors = t.contact.errors as Record<string, string>;
        setFieldError(FIELD_FOR_CODE[key] ?? null);
        throw new FormError(errors[key] ?? errors.generic);
      }
      setFieldError(null);
      toast({
        title: language === 'es' ? "¡Gracias!" : "Thank you!",
        description: data.confirmationSent
          ? (language === 'es'
            ? "Te mandé un mail de confirmación. Te respondo lo antes posible."
            : "I sent you a confirmation email. I'll get back to you as soon as possible.")
          : (language === 'es'
            ? "Te responderé lo antes posible."
            : "I'll get back to you as soon as possible."),
        variant: "default",
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
      });
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      toast({
        title: "Error",
        description:
          err instanceof FormError ? err.message : t.contact.errors.generic,
        className: cn(
          "top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"
        ),
        variant: "destructive",
      });
    }
    setLoading(false);
  };
  return (
    <form className="min-w-7xl mx-auto sm:mt-4" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <LabelInputContainer>
          <Label htmlFor="fullname">{t.contact.name}</Label>
          <Input
            id="fullname"
            placeholder={language === 'es' ? 'Tu nombre' : 'Your Name'}
            type="text"
            required
            minLength={MIN_NAME}
            autoComplete="name"
            aria-invalid={fieldError === "fullname"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">{t.contact.email}</Label>
          <Input
            id="email"
            placeholder={language === 'es' ? 'tu@ejemplo.com' : 'you@example.com'}
            type="email"
            required
            autoComplete="email"
            aria-invalid={fieldError === "email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
      </div>
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="content">{t.contact.message}</Label>
        <Textarea
          placeholder={language === 'es'
            ? 'Cuéntame sobre tu proyecto...'
            : 'Tell me about your project...'}
          id="content"
          required
          minLength={MIN_MESSAGE}
          aria-invalid={fieldError === "content"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {message.trim().length > 0 && message.trim().length < MIN_MESSAGE
              ? t.contact.minMessage
              : language === 'es'
                ? 'Nunca compartiré tus datos con nadie más. ¡Lo prometo!'
                : "I'll never share your data with anyone else. Pinky promise!"}
          </p>
          <span
            className={cn(
              "text-xs font-mono tabular-nums flex-shrink-0 pt-0.5",
              message.trim().length > 0 && message.trim().length < MIN_MESSAGE
                ? "text-destructive"
                : "text-muted-foreground/50"
            )}
          >
            {message.trim().length}/{MIN_MESSAGE}
          </span>
        </div>
      </div>
      <Button
        disabled={loading}
        className="relative w-full h-11 font-medium text-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 group"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{t.contact.sending}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>{t.contact.send}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent orange-400 to-transparent" />
    </>
  );
};
