"use client";
import { useEffect, useRef, useState, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language";

type CodeToken = { t: string; v: string };
const getCodeBlocks = (lang: string): CodeToken[][] => [
  [
    { t: "keyword", v: "const " },
    { t: "var", v: "lucas" },
    { t: "op", v: " = " },
    { t: "brace", v: "{" },
  ],
  [
    { t: "indent", v: "  " },
    { t: "key", v: "role" },
    { t: "op", v: ": " },
    { t: "str", v: lang === "es" ? '"Desarrollador Full Stack"' : '"Full Stack Dev"' },
    { t: "op", v: "," },
  ],
  [
    { t: "indent", v: "  " },
    { t: "key", v: "stack" },
    { t: "op", v: ": " },
    { t: "brace", v: "[" },
    { t: "str", v: '"Next.js"' },
    { t: "op", v: ", " },
    { t: "str", v: '"Node"' },
    { t: "op", v: ", " },
    { t: "str", v: '"TS"' },
    { t: "brace", v: "]" },
    { t: "op", v: "," },
  ],
  [
    { t: "indent", v: "  " },
    { t: "key", v: "open" },
    { t: "op", v: ": " },
    { t: "bool", v: "true" },
    { t: "op", v: "," },
  ],
  [
    { t: "indent", v: "  " },
    { t: "fn", v: "hire" },
    { t: "op", v: ": () => " },
    { t: "brace", v: "{" },
  ],
  [
    { t: "indent", v: "    " },
    { t: "keyword", v: "return " },
    { t: "str", v: lang === "es" ? '"¡Buena idea!"' : '"Good idea!"' },
    { t: "op", v: ";" },
  ],
  [
    { t: "indent", v: "  " },
    { t: "brace", v: "}" },
    { t: "op", v: "," },
  ],
  [{ t: "brace", v: "};" }],
];

const TOKEN_COLORS: Record<string, string> = {
  keyword: "text-purple-400",
  var: "text-sky-300",
  key: "text-emerald-300",
  str: "text-amber-300",
  bool: "text-orange-400",
  fn: "text-blue-300",
  op: "text-slate-400",
  brace: "text-slate-300",
  indent: "",
};

const getMetrics = (lang: string) => [
  { label: lang === "es" ? "Proyectos" : "Projects", value: "15+", color: "border-purple-500/40 bg-purple-500/10 text-purple-300" },
  { label: lang === "es" ? "Experiencia" : "Experience", value: lang === "es" ? "3 años" : "3y", color: "border-sky-500/40 bg-sky-500/10 text-sky-300" },
  { label: lang === "es" ? "Commits" : "Commits", value: "1k+", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300" },
];

const CodeLine = memo(({ tokens, visible }: { tokens: CodeToken[]; visible: boolean }) => {
  const fullText = tokens.map((t) => t.v).join("");
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!visible) { setShown(0); return; }
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(i);
      if (i >= fullText.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [visible, fullText]);

  let rendered = 0;
  return (
    <span className="block h-5">
      {tokens.map((token, ti) => {
        if (rendered >= shown) return null;
        const available = shown - rendered;
        const slice = token.v.slice(0, available);
        rendered += slice.length;
        return (
          <span key={ti} className={cn("font-mono text-xs leading-5", TOKEN_COLORS[token.t] ?? "")}>
            {slice}
          </span>
        );
      })}
      {shown < fullText.length && (
        <span className="inline-block w-[2px] h-3 bg-purple-400 align-middle animate-pulse ml-[1px]" />
      )}
    </span>
  );
});
CodeLine.displayName = "CodeLine";

export default function HeroTerminal() {
  const { language } = useLanguage();
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const CODE_BLOCKS = useMemo(() => getCodeBlocks(language), [language]);
  const METRICS = useMemo(() => getMetrics(language), [language]);

  useEffect(() => {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
    setVisibleLines([]);

    const reveal = () => {
      CODE_BLOCKS.forEach((_, i) => {
        const prev = CODE_BLOCKS.slice(0, i).reduce(
          (acc, line) => acc + line.reduce((s, t) => s + t.v.length, 0) * 28 + 60,
          0
        );
        const id = setTimeout(() => {
          setVisibleLines((v) => [...v, i]);
        }, prev + 200);
        timerRef.current.push(id);
      });
    };

    reveal();
    const total =
      CODE_BLOCKS.reduce((acc, line) => acc + line.reduce((s, t) => s + t.v.length, 0) * 28 + 60, 0) +
      3200;
    const loopId = setInterval(() => {
      timerRef.current.forEach(clearTimeout);
      timerRef.current = [];
      setVisibleLines([]);
      setTimeout(reveal, 400);
    }, total);

    return () => {
      timerRef.current.forEach(clearTimeout);
      clearInterval(loopId);
    };
  }, [language, CODE_BLOCKS]);

  return (
    <div className="relative w-full max-w-[420px] select-none">
      {METRICS.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { delay: 1.4 + i * 0.2, duration: 0.5 },
            y: { delay: 1.4 + i * 0.2, duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
          }}
          className={cn(
            "absolute border rounded-lg px-3 py-1.5 backdrop-blur-sm z-20",
            "flex items-center gap-1.5 shadow-lg",
            m.color,
            i === 0 && "-top-5 -right-4",
            i === 1 && "top-1/2 -right-12",
            i === 2 && "-bottom-4 right-4",
          )}
          style={{ pointerEvents: "none" }}
        >
          <span className="text-[10px] font-mono opacity-60">{m.label}</span>
          <span className="text-sm font-bold font-mono">{m.value}</span>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "rounded-xl border border-border/50 overflow-hidden shadow-2xl shadow-primary/10",
          "bg-card/60 backdrop-blur-md"
        )}
      >
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/40 bg-muted/30">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-[10px] font-mono text-muted-foreground/50 tracking-wider">
            lucas.ts
          </span>
        </div>

        <div className="px-5 py-4 min-h-[220px]">
          <div className="flex gap-4">
            <div className="flex flex-col items-end gap-0 select-none">
              {CODE_BLOCKS.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "font-mono text-xs leading-5 w-4 text-right transition-colors duration-300",
                    visibleLines.includes(i) ? "text-muted-foreground/40" : "text-transparent"
                  )}
                >
                  {i + 1}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-0 overflow-hidden">
              {CODE_BLOCKS.map((tokens, i) => (
                <CodeLine key={i} tokens={tokens} visible={visibleLines.includes(i)} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-1.5 border-t border-border/30 bg-muted/20">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-mono text-muted-foreground/40">TypeScript</span>
          </div>
          <span className="text-[9px] font-mono text-muted-foreground/30">UTF-8</span>
        </div>
      </motion.div>

      <div
        className="absolute -inset-8 -z-10 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(272 61% 46% / 0.5) 0%, transparent 70%)" }}
      />
    </div>
  );
}
