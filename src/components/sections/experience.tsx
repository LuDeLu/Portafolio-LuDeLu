'use client';

import { EXPERIENCE, SkillNames, SKILLS } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";

const ExperienceSection = () => {
  const { t } = useLanguage();

  return (
    <SectionWrapper
      id="experience"
      className="flex flex-col items-center justify-center min-h-screen py-20 md:py-32 z-10"
    >
      <div className="w-full max-w-3xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="experience"
          title={t.experience.title}
          desc={t.experience.subtitle}
        />

        <div className="relative">
          <div
            className="absolute top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-transparent hidden md:block"
            style={{ left: "calc(1.25rem - 1px)" }}
          />

          <div className="flex flex-col gap-10">
            {EXPERIENCE.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                isLast={index === EXPERIENCE.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

const ExperienceCard = ({
  experience,
  index,
  isLast,
}: {
  experience: (typeof EXPERIENCE)[0];
  index: number;
  isLast: boolean;
}) => {
  const { t } = useLanguage();

  const jobData = t.experience.jobs[index];

  const isPresent = experience.endDate.toLowerCase() === 'present';

  const formatDate = (date: string) => {
    if (date.toLowerCase() === 'present') {
      return t.experience.present;
    }
    return date;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      className="relative md:pl-14"
    >
      <div
        className={cn(
          "absolute left-0 top-5 hidden md:flex items-center justify-center",
          "w-10 h-10 rounded-full border-[2px] z-10",
          isPresent
            ? "border-primary bg-background shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            : "border-border/60 bg-background"
        )}
      >
        <Briefcase
          className={cn("w-4 h-4", isPresent ? "text-primary" : "text-muted-foreground")}
        />
      </div>

      <div
        className={cn(
          "relative rounded-2xl border transition-all duration-300",
          "bg-card/60 backdrop-blur-sm",
          "hover:shadow-xl hover:shadow-primary/5",
          isPresent
            ? "border-primary/30 hover:border-primary/50"
            : "border-border/40 hover:border-border/70"
        )}
      >
        <div
          className={cn(
            "absolute left-0 top-4 bottom-4 w-0.5 rounded-full z-10",
            isPresent
              ? "bg-gradient-to-b from-primary to-primary/20"
              : "bg-gradient-to-b from-border/70 to-transparent"
          )}
        />

        <div className="px-6 pt-5 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-foreground">{jobData?.title}</h3>
                {isPresent && (
                  <span className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/25 px-2 py-0.5 rounded-full">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                    </span>
                    {t.experience.current}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3 shrink-0" />
                <span>{jobData?.company}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-muted/40 border border-border/40 rounded-full px-3 py-1 shrink-0">
              <Calendar className="w-3 h-3" />
              {formatDate(experience.startDate)} — {formatDate(experience.endDate)}
            </div>
          </div>

          <ul className="space-y-2 mb-5">
            {(jobData?.description || []).map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary/60 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {experience.skills.map((skillName) => {
              const skill = SKILLS[skillName as SkillNames];
              return (
                <span
                  key={skillName}
                  className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-primary/5 border border-primary/15 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  <img
                    src={skill.icon}
                    alt={skill.label}
                    className="w-3 h-3 object-contain opacity-80"
                  />
                  {skill.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceSection;
