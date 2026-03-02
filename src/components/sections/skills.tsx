'use client';

import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { useLanguage } from "@/contexts/language";
import { SKILLS } from "@/data/constants";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SKILL_CATEGORIES = {
  Frontend: ["js", "ts", "html", "css", "react", "vue", "nextjs", "tailwind"],
  Backend: ["nodejs", "express", "postgres", "mongodb", "firebase"],
  "Cloud & DevOps": ["git", "github", "docker", "linux", "nginx", "aws", "gcp", "vercel"],
  Tools: ["npm", "wordpress", "vim"],
};

const categoryColors: Record<string, { border: string; bg: string; label: string }> = {
  Frontend: {
    border: "border-blue-500/30 hover:border-blue-400/60",
    bg: "hover:bg-blue-500/5",
    label: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  Backend: {
    border: "border-green-500/30 hover:border-green-400/60",
    bg: "hover:bg-green-500/5",
    label: "text-green-400 bg-green-500/10 border-green-500/20",
  },
  "Cloud & DevOps": {
    border: "border-orange-500/30 hover:border-orange-400/60",
    bg: "hover:bg-orange-500/5",
    label: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  Tools: {
    border: "border-purple-500/30 hover:border-purple-400/60",
    bg: "hover:bg-purple-500/5",
    label: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
};

const SkillsSection = () => {
  const { t } = useLanguage();
  const skillList = Object.values(SKILLS);

  return (
    <SectionWrapper id="skills" className="w-full min-h-screen py-20 md:py-32">
      <SectionHeader id="skills" title={t.skills.title} desc={t.skills.hint} />

      <div className="max-w-5xl mx-auto px-4 space-y-14">
        {Object.entries(SKILL_CATEGORIES).map(([category, skillNames], catIndex) => {
          const catSkills = skillNames
            .map((name) => skillList.find((s) => s.name === name))
            .filter(Boolean) as typeof skillList;

          if (catSkills.length === 0) return null;

          const colors = categoryColors[category];

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border",
                    colors.label
                  )}
                >
                  {(t.skills.categories as any)[category] || category}
                </span>
                <div className="flex-1 h-px bg-border/30" />
                <span className="text-[10px] font-mono text-muted-foreground/40">
                  {catSkills.length} {t.skills.technologies}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {catSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className={cn(
                      "group flex flex-col items-center gap-2.5 p-3 rounded-xl",
                      "border border-border/40 bg-card/40 backdrop-blur-sm",
                      "transition-all duration-300 cursor-default",
                      colors.border,
                      colors.bg
                    )}
                  >
                    <div className="w-9 h-9 flex items-center justify-center">
                      <img
                        src={skill.icon}
                        alt={skill.label}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                      />
                    </div>
                    <span className="text-[9px] font-mono text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                      {skill.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
