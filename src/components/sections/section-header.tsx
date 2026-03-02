"use client";

import { cn } from "@/lib/utils"
import { BoxReveal } from "../reveal-animations"
import { ReactNode, useCallback } from "react"
import { useLenis } from "@/lib/lenis"

export const SectionHeader = ({ id, title, desc, className }: { id: string, title: string | ReactNode, desc?: string, className?: string }) => {
  const lenis = useLenis();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(`#${id}`, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis, id]
  );

  return (
    <div className={cn("relative mb-16 md:mb-24 text-center", className)}>
      <a href={`#${id}`} onClick={handleClick}>
        <BoxReveal width="100%">
          <h2
            className={cn(
              "text-5xl md:text-7xl font-display font-bold tracking-tight",
              "text-foreground"
            )}
          >
            {title}
          </h2>
        </BoxReveal>
      </a>
      <div className="flex items-center justify-center mt-4 gap-2">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
      </div>
      {desc && (
        <p className="mx-auto mt-4 line-clamp-4 max-w-2xl font-normal text-sm text-center text-muted-foreground/70 leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  )
}

