import * as React from "react";

interface NotificationEmailProps {
  fullName: string;
  email: string;
  message: string;
}

// Email clients ignore <style> and classes, so everything is inline.
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

const header: React.CSSProperties = {
  padding: "20px 28px",
  backgroundColor: "#171123",
};

const label: React.CSSProperties = {
  margin: "0 0 4px",
  fontSize: "11px",
  letterSpacing: "1px",
  textTransform: "uppercase",
  color: "#71717a",
};

const value: React.CSSProperties = {
  margin: "0 0 20px",
  fontSize: "15px",
  color: "#18181b",
};

export const NotificationEmail: React.FC<Readonly<NotificationEmailProps>> = ({
  fullName,
  email,
  message,
}) => (
  <div style={wrapper}>
    <div style={card}>
      <div style={header}>
        <p style={{ margin: 0, fontSize: "13px", color: "#a663cc", letterSpacing: "1px" }}>
          PORTAFOLIO · LUDELU
        </p>
        <p style={{ margin: "6px 0 0", fontSize: "19px", color: "#ffffff", fontWeight: 700 }}>
          Nuevo mensaje del formulario
        </p>
      </div>

      <div style={{ padding: "28px" }}>
        <p style={label}>Nombre</p>
        <p style={value}>{fullName}</p>

        <p style={label}>Email</p>
        <p style={value}>
          <a href={`mailto:${email}`} style={{ color: "#6f2dbd", textDecoration: "none" }}>
            {email}
          </a>
        </p>

        <p style={label}>Mensaje</p>
        <div
          style={{
            padding: "16px",
            backgroundColor: "#fafafa",
            borderLeft: "3px solid #6f2dbd",
            borderRadius: "6px",
            fontSize: "15px",
            lineHeight: "1.6",
            color: "#27272a",
            whiteSpace: "pre-wrap",
          }}
        >
          {message}
        </div>

        <p style={{ margin: "24px 0 0", fontSize: "13px", color: "#71717a" }}>
          Respondé a este mail y le llega directo a {fullName}.
        </p>
      </div>
    </div>
  </div>
);

export default NotificationEmail;
