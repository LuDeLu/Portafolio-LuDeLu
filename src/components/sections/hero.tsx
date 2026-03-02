'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { File, ChevronDown, ArrowDown } from "lucide-react";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { config } from "@/data/config";
import { useLanguage } from "@/contexts/language";
import { usePreloader } from "../preloader";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/section-wrapper";
import HeroTerminal from "../hero-terminal";
import { useLenis } from "@/lib/lenis";

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.substring(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          setText(current.substring(0, charIndex - 1));
          setCharIndex((c) => c - 1);
          if (charIndex - 1 === 0) {
            setDeleting(false);
            setWordIndex((w) => w + 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [text, charIndex, deleting, wordIndex, words, speed, pause]);

  return text;
}

const LetterReveal = ({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  return (
    <span className={cn("inline-block", className)}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const HeroSection = () => {
  const { isLoading } = usePreloader();
  const { t, language } = useLanguage();
  const lenis = useLenis();

  const scrollTo = useCallback((id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [lenis]);

  const roles =
    language === "es"
      ? ["Full Stack Developer", "Desarrollador Web", "React & Node.js", "UI/UX Enthusiast"]
      : ["Full Stack Developer", "Web Developer", "React & Node.js", "UI/UX Enthusiast"];

  const typedText = useTypewriter(roles, 75, 2200);

  const firstName = config.author.split(" ")[0];
  const lastName = config.author.split(" ")[1];

  const tagline =
    language === "es"
      ? "Creando experiencias digitales desde Argentina 🇦🇷"
      : "Crafting digital experiences from Argentina 🇦🇷";

  return (
    <SectionWrapper
      id="hero"
      className={cn("relative w-full h-screen overflow-hidden")}
    >
      <AnimatePresence>
        {!isLoading && (
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="w-full md:w-[45%] lg:w-[40%] px-6 md:px-12 lg:px-20 flex flex-col justify-center h-full pointer-events-none mx-auto">

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="h-px w-8 bg-primary/60" />
                <p className="text-xs md:text-sm font-mono text-primary/70 tracking-[0.3em] uppercase">
                  {t.hero.greeting}
                </p>
              </motion.div>

              <div className="select-none">
                <h1
                  className={cn(
                    "font-display tracking-tighter flex flex-col",
                    "leading-[0.85]",
                    "text-[clamp(3.5rem,7vw,8rem)]"
                  )}
                >
                  <motion.div
                    className="overflow-hidden block"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                  >
                    <LetterReveal text={firstName} delay={0.2} className="text-foreground" />
                  </motion.div>

                  <div className="overflow-hidden block -mt-[0.12em]">
                    <motion.span
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary"
                      style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    >
                      {lastName}
                    </motion.span>
                  </div>
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex items-center gap-2 mb-5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-sm md:text-base text-muted-foreground">
                  {typedText}
                </span>
                <span className="w-[2px] h-4 bg-primary animate-pulse rounded-full" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex items-start gap-3 mb-8"
              >
                <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent mt-1 shrink-0" />
                <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed max-w-xs">
                  {tagline}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap items-center gap-3 mb-8 pointer-events-auto"
              >
                <Button
                  size="default"
                  onClick={() => scrollTo("projects")}
                  className="flex items-center gap-2 shadow-lg shadow-primary/30 font-mono text-sm tracking-wider px-6 group cursor-pointer"
                >
                  {language === "es" ? "Ver Proyectos" : "View Work"}
                  <ArrowDown size={15} className="group-hover:translate-y-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  size="default"
                  onClick={() => scrollTo("contact")}
                  className="font-mono text-sm tracking-wider border-primary/40 hover:border-primary hover:bg-primary/5 transition-all px-6 cursor-pointer"
                >
                  {t.hero.hireMe}
                </Button>

                <Link href="/cv/Lucas_Baez-CV.pdf" target="_blank">
                  <Button
                    variant="ghost"
                    size="default"
                    className="flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground"
                  >
                    <File size={13} />
                    CV
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className="flex items-center gap-4 pointer-events-auto"
              >
                <span className="text-xs font-mono text-muted-foreground/40 tracking-widest uppercase">
                  Social
                </span>
                <div className="h-px w-4 bg-border/50" />
                <div className="flex items-center gap-1">
                  {config.social.instagram && (
                    <Link href={config.social.instagram} target="_blank">
                      <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-primary transition-colors">
                        <SiInstagram size={13} />
                      </Button>
                    </Link>
                  )}
                  <Link href={config.social.github} target="_blank">
                    <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-primary transition-colors">
                      <SiGithub size={13} />
                    </Button>
                  </Link>
                  <Link href={config.social.linkedin} target="_blank">
                    <Button variant="ghost" size="icon" className="w-8 h-8 hover:text-primary transition-colors">
                      <SiLinkedin size={13} />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="hidden md:flex flex-col items-center justify-center w-[42%] lg:w-[48%] h-full pointer-events-none pr-8 lg:pr-16">
              <HeroTerminal />
            </div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};

export default HeroSection;
