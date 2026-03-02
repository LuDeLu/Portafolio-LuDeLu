"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Section } from "./animated-background-config";
import { usePreloader } from "./preloader";

const AnimatedBackground = () => {
  const { bypassLoading } = usePreloader();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const prevSection = useRef<Section>("hero");

  useEffect(() => {
    bypassLoading();
  }, []);

  useEffect(() => {
    const sectionIds: Section[] = ["hero", "skills", "experience", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id as Section;
            if (id !== prevSection.current) {
              prevSection.current = id;
              setActiveSection(id);
              const hash = id === "hero" ? "/" : `/#${id}`;
              router.push(hash, { scroll: false });
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [router]);

  return null;
};

export default AnimatedBackground;
