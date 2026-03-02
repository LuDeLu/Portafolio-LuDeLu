"use client";
import React from "react";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { useLanguage } from "@/contexts/language";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram, MapPin, Clock } from "lucide-react";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import Link from "next/link";

const ContactSection = () => {
  const { t, language } = useLanguage();

  const infoItems = [
    {
      icon: Mail,
      label: "Email",
      value: config.email,
      href: `mailto:${config.email}`,
    },
    {
      icon: MapPin,
      label: language === "es" ? "Ubicación" : "Location",
      value: "Argentina 🇦🇷",
      href: null,
    },
    {
      icon: Clock,
      label: language === "es" ? "Disponibilidad" : "Availability",
      value: language === "es" ? "Abierto a propuestas" : "Open to opportunities",
      href: null,
      highlight: true,
    },
  ];

  const socials = [
    ...(config.social.github ? [{ icon: SiGithub, href: config.social.github, label: "GitHub" }] : []),
    ...(config.social.linkedin ? [{ icon: SiLinkedin, href: config.social.linkedin, label: "LinkedIn" }] : []),
    ...(config.social.instagram ? [{ icon: SiInstagram, href: config.social.instagram, label: "Instagram" }] : []),
  ];

  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-6xl mx-auto py-20 md:py-32">
      <SectionHeader
        id="contact"
        title={
          language === "es" ? (
            <>TRABAJEMOS <br /> JUNTOS</>
          ) : (
            <>LET&apos;S WORK <br /> TOGETHER</>
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 px-4 md:px-8">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3"
        >
          <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 md:p-8 shadow-xl shadow-black/10">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground mb-1.5">
                {language === "es" ? "Formulario de Contacto" : "Contact Form"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "es" ? (
                  <>
                    O contactame directo en{" "}
                    <a
                      href={`mailto:${config.email}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {config.email}
                    </a>
                  </>
                ) : (
                  <>
                    Or reach me at{" "}
                    <a
                      href={`mailto:${config.email}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {config.email}
                    </a>
                  </>
                )}
              </p>
            </div>
            <ContactForm />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2 flex flex-col gap-4"
        >
          {infoItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 group",
                    item.highlight
                      ? "border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50"
                      : "border-border/40 bg-card/40 backdrop-blur-sm hover:border-border/70 hover:bg-card/60"
                  )}
                >
                  <InfoCardContent item={item} />
                </a>
              ) : (
                <div
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border",
                    item.highlight
                      ? "border-primary/30 bg-primary/5"
                      : "border-border/40 bg-card/40 backdrop-blur-sm"
                  )}
                >
                  <InfoCardContent item={item} />
                </div>
              )}
            </motion.div>
          ))}

          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-border/30" />
            <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
              Social
            </span>
            <div className="flex-1 h-px bg-border/30" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {socials.map((social, i) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.5 + i * 0.07 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200 group"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-[9px] font-mono text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-wider">
                    {social.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="p-5 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
          >
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              {language === "es"
                ? '"¿Tenés un proyecto en mente? Me encantaría escucharte y ayudarte a hacerlo realidad."'
                : '"Have a project in mind? I\'d love to hear from you and help bring it to life."'}
            </p>
            <p className="text-xs font-mono text-primary/60 mt-2">— Lucas Baez</p>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

const InfoCardContent = ({
  item,
}: {
  item: {
    icon: any;
    label: string;
    value: string;
    href: string | null;
    highlight?: boolean;
  };
}) => {
  return (
    <>
      <div
        className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
          item.highlight
            ? "bg-primary/20"
            : "bg-muted/60"
        )}
      >
        <item.icon className={cn("w-4 h-4", item.highlight ? "text-primary" : "text-muted-foreground")} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider mb-0.5">
          {item.label}
        </p>
        <p
          className={cn(
            "text-sm font-medium truncate",
            item.highlight ? "text-primary" : "text-foreground"
          )}
        >
          {item.value}
        </p>
      </div>
    </>
  );
};

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default ContactSection;
