import { cn } from "@/lib/utils";

/**
 * LuDeLu mark — two L's in 180° rotational symmetry, echoing the repeated "Lu"
 * of the name. The 4px channel between them is deliberate: it keeps both
 * counters open at favicon sizes and lets the mark survive in a single colour.
 */
export const LuDeLuMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    className={cn("h-6 w-6", className)}
    role="img"
    aria-label="LuDeLu"
  >
    <path d="M4,4 h12 v22 h14 v12 H4 Z" className="fill-foreground" />
    <path
      d="M60,60 h-12 v-22 h-14 v-12 H60 Z"
      className="fill-primary dark:fill-secondary"
    />
  </svg>
);

/** Mark + wordmark. The violet "De" sits on the mark's axis of symmetry. */
export const LuDeLuLockup = ({ className }: { className?: string }) => (
  <span className={cn("flex items-center gap-2", className)}>
    <LuDeLuMark className="h-[22px] w-[22px] md:h-6 md:w-6 flex-shrink-0" />
    <span className="font-display font-bold text-sm md:text-base tracking-tight leading-none">
      Lu<span className="text-primary dark:text-secondary">De</span>Lu
    </span>
  </span>
);

export default LuDeLuMark;
