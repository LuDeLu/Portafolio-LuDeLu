"use client";
import Image from "next/image";
import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
  useModal,
} from "../ui/animated-modal";
import Link from "next/link";
import lucasProjects, { Project, ProjectsLinks } from "@/data/lucas-projects";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";
import { useLanguage } from "@/contexts/language";
import SectionWrapper from "../ui/section-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Globe,
  ChevronRight,
  Layers,
  Code2,
  Tag,
  X,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
};

const SkillChips = ({
  items,
}: {
  items: { title: string; icon: React.ReactNode }[];
}) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item, i) => (
      <div
        key={i}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/60 border border-border/40 text-xs font-mono text-foreground"
      >
        <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
          {item.icon}
        </span>
        {item.title}
      </div>
    ))}
  </div>
);

const CATEGORY_KEYS = ["all", "webapp", "ecommerce", "website"];

const FilterTabs = ({
  active,
  onChange,
}: {
  active: string;
  onChange: (cat: string) => void;
}) => {
  const { t } = useLanguage();
  const labels: Record<string, string> = {
    all: t.projects.filterAll,
    webapp: t.projects.filterWebApp,
    ecommerce: t.projects.filterEcommerce,
    website: t.projects.filterWebsite,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-wrap items-center gap-2 mb-12"
    >
      {CATEGORY_KEYS.map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            "relative px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 border",
            active === key
              ? "text-primary border-primary/60 bg-primary/10 shadow-lg shadow-primary/10"
              : "text-muted-foreground border-border/40 hover:border-primary/40 hover:text-foreground bg-transparent"
          )}
        >
          {labels[key] || key}
          {active === key && (
            <motion.div
              layoutId="filter-pill"
              className="absolute inset-0 rounded-full bg-primary/5 border border-primary/40"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </motion.div>
  );
};

const MobileProjectModal = ({
  project,
  open,
  onClose,
}: {
  project: Project;
  open: boolean;
  onClose: () => void;
}) => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      scrollRef.current?.scrollTo({ top: 0 });
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  const frontendSkills = project.skills.frontend || [];
  const backendSkills = project.skills.backend || [];
  const projectData = (t.projects.items as any)[project.id];
  const categoryLabel = projectData?.category || project.categoryKey;
  const description = projectData?.description;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 36, mass: 0.9 }}
            className="fixed z-[70] bottom-0 left-0 right-0 flex flex-col bg-card rounded-t-3xl max-h-[94dvh] shadow-2xl"
          >
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-9 h-[3px] rounded-full bg-border/50" />
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">

              <div className="relative w-full h-[195px] sm:h-[240px] flex-shrink-0 overflow-hidden">
                <Image
                  src={project.src || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-card/20 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-primary bg-black/50 border border-primary/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <Tag className="w-2.5 h-2.5" />
                    {categoryLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-green-400 bg-black/50 border border-green-500/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                    </span>
                    Live
                  </span>
                </div>

                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.92 }}
                  className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white backdrop-blur-sm transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>

                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                  <p className="text-[9px] font-mono text-primary/55 uppercase tracking-widest mb-1">
                    {categoryLabel}
                  </p>
                  <h2 className="text-2xl font-display font-bold text-foreground leading-tight">
                    {project.title}
                  </h2>
                </div>
              </div>

              <div className="px-5 py-5 flex flex-col gap-5">
                {(frontendSkills.length > 0 || backendSkills.length > 0) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {frontendSkills.length > 0 && (
                      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/15 border border-primary/25">
                            <Code2 className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-xs font-mono font-semibold text-primary uppercase tracking-widest">
                            {t.projects.frontend}
                          </span>
                        </div>
                        <SkillChips items={frontendSkills} />
                      </div>
                    )}
                    {backendSkills.length > 0 && (
                      <div className="rounded-xl border border-border/30 bg-muted/20 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-muted border border-border/30">
                            <Layers className="w-3 h-3 text-muted-foreground" />
                          </div>
                          <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">
                            {t.projects.backend}
                          </span>
                        </div>
                        <SkillChips items={backendSkills} />
                      </div>
                    )}
                  </div>
                )}

                <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

                {description && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-3 h-3 text-primary/50" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/55">
                        Descripción
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                      {description}
                    </p>
                  </div>
                )}

                <div className="pb-1">
                  <ProjectsLinks
                    live={project.live}
                    repo={project.github}
                    visitLabel={t.projects.visitSite}
                  />
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center justify-between gap-3 px-5 py-4 border-t border-border/30 bg-card/95">
              <p className="text-[11px] font-mono text-muted-foreground/35 tracking-wider truncate">
                {project.title}
              </p>
              <div className="flex items-center gap-2.5 flex-shrink-0">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-muted/60 hover:bg-muted text-foreground/70 border border-border/50 transition-all duration-200"
                >
                  {t.projects.cancel}
                </motion.button>
                <Link href={project.live} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-primary/25"
                  >
                    {t.projects.visit}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DesktopProjectContents = ({ project }: { project: Project }) => {
  const { t } = useLanguage();
  const frontendSkills = project.skills.frontend || [];
  const backendSkills = project.skills.backend || [];
  const projectData = (t.projects.items as any)[project.id];
  const categoryLabel = projectData?.category || project.categoryKey;
  const description = projectData?.description;

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-[200px] md:h-[280px] overflow-hidden flex-shrink-0">
        <Image
          src={project.src || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-primary bg-background/80 border border-primary/30 px-3 py-1 rounded-full">
            <Tag className="w-2.5 h-2.5" />
            {categoryLabel}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-400 bg-background/80 border border-green-500/30 px-3 py-1 rounded-full">
            <span className="inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            Live
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-8 pb-5">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight">
            {project.title}
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-6 md:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {frontendSkills.length > 0 && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/15 border border-primary/25">
                  <Code2 className="w-3 h-3 text-primary" />
                </div>
                <span className="text-xs font-mono font-semibold text-primary uppercase tracking-widest">
                  {t.projects.frontend}
                </span>
              </div>
              <SkillChips items={frontendSkills} />
            </div>
          )}
          {backendSkills.length > 0 && (
            <div className="rounded-xl border border-border/30 bg-muted/20 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-muted border border-border/30">
                  <Layers className="w-3 h-3 text-muted-foreground" />
                </div>
                <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">
                  {t.projects.backend}
                </span>
              </div>
              <SkillChips items={backendSkills} />
            </div>
          )}
        </div>

        {description && (
          <div className="border-t border-border/30 pt-5">
            <p className="font-mono text-muted-foreground leading-relaxed text-sm">
              {description}
            </p>
            <div className="mt-5">
              <ProjectsLinks
                live={project.live}
                repo={project.github}
                visitLabel={t.projects.visitSite}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DesktopProjectModal = ({ project, t }: { project: Project; t: any }) => {
  return (
    <ModalBody className="!p-0">
      <ModalContent className="!p-0">
        <DesktopProjectContents project={project} />
      </ModalContent>
      <div className="flex items-center justify-between px-6 py-4 border-t border-border/40 bg-card/60 flex-shrink-0">
        <p className="text-xs font-mono text-muted-foreground/50 tracking-wider truncate max-w-[50%]">
          {project.title}
        </p>
        <div className="flex items-center gap-3">
          <CancelButton />
          <Link href={project.live} target="_blank">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-primary/25"
            >
              {t.projects.visit}
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.button>
          </Link>
        </div>
      </div>
    </ModalBody>
  );
};

const FeaturedCard = ({ project, index }: { project: Project; index: number }) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  const allSkills = [
    ...(project.skills.frontend || []),
    ...(project.skills.backend || []),
  ].slice(0, 4);

  const projectData = (t.projects.items as any)[project.id];
  const categoryLabel = projectData?.category || project.categoryKey;

  const CardInner = (
    <div className="relative h-[340px] md:h-[420px] rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-500 bg-card cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-primary/15">
      <Image
        src={project.src || "/placeholder.svg"}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/15" />

      <div className="absolute top-4 right-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/75 bg-black/50 border border-white/15 backdrop-blur-md px-3 py-1 rounded-full">
          {categoryLabel}
        </span>
      </div>

      <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 border border-white/15 backdrop-blur-md rounded-full px-3 py-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
        </span>
        <span className="text-[10px] font-mono text-white/75">Live</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {allSkills.map((skill, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 border border-white/15 text-white/70 backdrop-blur-sm"
            >
              <span className="opacity-80">{skill.icon}</span>
              {skill.title}
            </span>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300 drop-shadow-sm">
          {project.title}
        </h3>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <span className="text-sm font-mono text-primary">
            {t.projects.viewProject}
          </span>
          <ChevronRight className="w-4 h-4 text-primary" />
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-primary/30" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      viewport={{ once: true }}
      className="group"
    >
      {isMobile ? (
        <>
          <button
            onClick={() => setMobileOpen(true)}
            className="w-full text-left focus:outline-none rounded-2xl block"
          >
            {CardInner}
          </button>
          <MobileProjectModal
            project={project}
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
        </>
      ) : (
        <Modal>
          <ModalTrigger className="bg-transparent w-full text-left">
            {CardInner}
          </ModalTrigger>
          <DesktopProjectModal project={project} t={t} />
        </Modal>
      )}
    </motion.div>
  );
};

const CompactCard = ({ project, index }: { project: Project; index: number }) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  const allSkills = [
    ...(project.skills.frontend || []),
    ...(project.skills.backend || []),
  ].slice(0, 3);

  const projectData = (t.projects.items as any)[project.id];
  const categoryLabel = projectData?.category || project.categoryKey;

  const CardInner = (
    <div className="relative flex flex-col rounded-xl overflow-hidden border border-border/40 hover:border-primary/40 transition-all duration-300 bg-card/50 backdrop-blur-sm hover:bg-card shadow-sm hover:shadow-lg hover:shadow-primary/10 cursor-pointer h-full">
      <div className="relative h-[160px] overflow-hidden">
        <Image
          src={project.src || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-background/60 border border-border/20 rounded-full px-2 py-0.5">
          <span className="inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          <span className="text-[9px] font-mono text-muted-foreground/80">Live</span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="text-[9px] font-mono uppercase tracking-widest text-primary/70 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-1">
          {allSkills.map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted/60 border border-border/30 text-muted-foreground"
            >
              <span className="text-[10px]">{skill.icon}</span>
              {skill.title}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Globe className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-mono text-primary">
            {t.projects.viewDetails}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      viewport={{ once: true }}
      className="group"
    >
      {isMobile ? (
        <>
          <button
            onClick={() => setMobileOpen(true)}
            className="w-full text-left focus:outline-none rounded-xl block h-full"
          >
            {CardInner}
          </button>
          <MobileProjectModal
            project={project}
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
        </>
      ) : (
        <Modal>
          <ModalTrigger className="bg-transparent w-full text-left">
            {CardInner}
          </ModalTrigger>
          <DesktopProjectModal project={project} t={t} />
        </Modal>
      )}
    </motion.div>
  );
};

const CancelButton = () => {
  const { setOpen } = useModal();
  const { t } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => setOpen(false)}
      className="px-5 py-2 bg-muted/60 text-foreground hover:bg-muted border border-border/50 rounded-lg text-sm font-medium transition-all duration-200"
    >
      {t.projects.cancel}
    </motion.button>
  );
};

const ProjectsSection = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return lucasProjects;
    return lucasProjects.filter((p) => p.categoryKey === activeFilter);
  }, [activeFilter]);

  const featuredProjects = filtered.slice(0, 2);
  const compactProjects = filtered.slice(2);

  return (
    <SectionWrapper id="projects" className="max-w-7xl mx-auto min-h-screen py-20 md:py-32">
      <SectionHeader id="projects" title={t.projects.title} />

      <FilterTabs active={activeFilter} onChange={setActiveFilter} />

      <AnimatePresence mode="wait">
        <motion.div key={activeFilter}>
          {featuredProjects.length > 0 && (
            <div
              className={cn(
                "grid gap-6 mb-6",
                featuredProjects.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2"
              )}
            >
              {featuredProjects.map((project, i) => (
                <FeaturedCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}

          {compactProjects.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {compactProjects.map((project, i) => (
                <CompactCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-40 text-muted-foreground font-mono text-sm"
            >
              {t.projects.emptyMessage}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
};

export default ProjectsSection;