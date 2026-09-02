"use client";

import { useEffect } from "react";
import { useLenis } from "@/lib/lenis";

// Refcounted so that two overlays open at once (e.g. the mobile menu and a
// project sheet) can't clear each other's lock when the first one closes.
let lockCount = 0;
let previousBodyOverflow = "";

/**
 * Freezes the page behind an overlay. Locking the body alone is not enough:
 * Lenis drives the scroll itself, so it has to be stopped too.
 */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked) return;

    if (lockCount === 0) {
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;
    lenis?.stop();

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = previousBodyOverflow;
        lenis?.start();
      }
    };
  }, [locked, lenis]);
}

export default useScrollLock;
