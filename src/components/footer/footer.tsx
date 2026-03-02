"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { config } from "@/data/config";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { Heart } from "lucide-react";
import { useLanguage } from "@/contexts/language";
import { useLenis } from "@/lib/lenis";

function Footer() {
  const { t } = useLanguage();
  const lenis = useLenis();
  const year = new Date().getFullYear();

  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(`#${id}`, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis]
  );

  const navLinks = [
    { id: "skills", label: t.sections.skills },
    { id: "experience", label: t.sections.experience },
    { id: "projects", label: t.sections.projects },
    { id: "contact", label: t.sections.contact },
  ];

  const socials = [
    ...(config.social.github ? [{ icon: SiGithub, href: config.social.github, label: "GitHub" }] : []),
    ...(config.social.linkedin ? [{ icon: SiLinkedin, href: config.social.linkedin, label: "LinkedIn" }] : []),
    ...(config.social.instagram ? [{ icon: SiInstagram, href: config.social.instagram, label: "Instagram" }] : []),
  ];

  return (
    <footer className="relative w-full border-t border-border/40 bg-background/50 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

          <div className="flex flex-col gap-1">
            <Link href="/" className="text-lg font-display font-bold text-foreground hover:text-primary transition-colors">
              {config.author}
            </Link>
            <p className="text-xs text-muted-foreground/60 font-mono">
              Full Stack Developer · Argentina 🇦🇷
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                aria-label={social.label}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
              >
                <social.icon className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-6 pt-5 border-t border-border/20">
          <p className="text-[10px] font-mono text-muted-foreground/40">
            © {year} {config.author} — {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
