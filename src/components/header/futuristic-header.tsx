"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useLanguage } from "@/contexts/language";
import { LanguageSelector } from "../language-selector";
import { Menu, X } from "lucide-react";
import { config } from "@/data/config";
import Link from "next/link";
import { useLenis } from "@/lib/lenis";

interface FuturisticHeaderProps {
  loader?: boolean;
}

const FuturisticHeader = ({ loader }: FuturisticHeaderProps) => {
  const { t } = useLanguage();
  const lenis = useLenis();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(`#${targetId}`, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
      } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }
      setIsActive(false);
    },
    [lenis]
  );

  const navLinks = [
    { id: "skills", label: t.sections.skills },
    { id: "experience", label: t.sections.experience },
    { id: "projects", label: t.sections.projects },
    { id: "contact", label: t.sections.contact },
  ];

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-500",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/5"
            : "bg-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: loader ? 3.5 : 0,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-14 md:h-16 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: loader ? 3.5 : 0.1 }}
            >
              <Link href="/" className="font-display font-bold text-sm md:text-base tracking-tight hover:text-primary transition-colors">
                LuDeLu
              </Link>
            </motion.div>

            <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (loader ? 3.5 : 0) + index * 0.08 }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleSmoothScroll(e, link.id)}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative group px-3 py-1.5 text-sm font-mono text-muted-foreground hover:text-foreground overflow-hidden"
                    >
                      <span className="relative z-10 transition-colors duration-300">
                        {link.label}
                      </span>
                      <div className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-primary group-hover:w-[70%] group-hover:left-[15%] transition-all duration-300" />
                    </Button>
                  </a>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: loader ? 3.7 : 0.2 }}
              >
                <LanguageSelector />
              </motion.div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsActive(!isActive)}
                className="md:hidden w-8 h-8"
              >
                <motion.div animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.25 }}>
                  {isActive ? (
                    <X className="w-4 h-4 text-primary" />
                  ) : (
                    <Menu className="w-4 h-4 text-foreground" />
                  )}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-primary via-secondary to-primary"
          initial={{ width: "0%" }}
          animate={{ width: scrolled ? "100%" : "0%" }}
          transition={{ duration: 0.5 }}
        />
      </motion.header>

      <AnimatePresence>
        {isActive && (
          <>
            <motion.div
              className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[999] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsActive(false)}
            />
            <motion.div
              className="fixed inset-x-0 top-14 bottom-0 z-[999] md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="p-8 flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleSmoothScroll(e, link.id)}
                      className="block"
                    >
                      <div className="group relative p-5 rounded-xl border border-border bg-card/40 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300">
                        <span className="font-mono text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300 rounded-b-xl" />
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FuturisticHeader;
