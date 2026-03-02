"use client";
import { useEffect, useRef, useState } from "react";

interface MouseOptions {
    allowPage?: boolean;
    /** Throttle interval in ms (default: 32 ~30fps). Pass 0 for no throttle. */
    throttleMs?: number;
}

export function useMouse(options?: MouseOptions) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const lastFired = useRef(0);
    const throttleMs = options?.throttleMs ?? 32;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (throttleMs > 0) {
                const now = performance.now();
                if (now - lastFired.current < throttleMs) return;
                lastFired.current = now;
            }
            setPosition({
                x: options?.allowPage ? e.pageX : e.clientX,
                y: options?.allowPage ? e.pageY : e.clientY,
            });
        };
        window.addEventListener("mousemove", handler, { passive: true });
        return () => window.removeEventListener("mousemove", handler);
    }, [options?.allowPage, throttleMs]);

    return position;
}
