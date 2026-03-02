"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function EnhancedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const setCanvasSize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setCanvasSize, 200);
    };
    window.addEventListener("resize", onResize);

    const isDark = theme === "dark";

    const PARTICLE_COUNT = 35;
    const CONNECTION_DIST = 150;
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
    const particleColors = isDark
      ? ["#6F2DBD", "#A663CC", "#FBFBFB"]
      : ["#6F2DBD", "#A663CC", "#171123"];

    type Particle = {
      x: number; y: number;
      size: number;
      vx: number; vy: number;
      opacity: number;
      color: string;
    };

    const makeParticle = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 3 + 1,
      vx: Math.random() * 0.5 - 0.25,
      vy: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.2,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
    });

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, makeParticle);

    type GridLine = { y: number; speed: number; opacity: number };
    const gridLines: GridLine[] = Array.from({ length: 8 }, () => ({
      y: Math.random() * h,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.15 + 0.05,
    }));

    type Wave = { amplitude: number; frequency: number; phase: number; speed: number; y: number; color: string; opacity: number };
    const waveColors = ["#6F2DBD", "#A663CC"];
    const waves: Wave[] = [0, 1, 2].map((i) => ({
      amplitude: Math.random() * 30 + 20,
      frequency: Math.random() * 0.01 + 0.005,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
      y: (h / 4) * (i + 1),
      color: waveColors[i % waveColors.length],
      opacity: Math.random() * 0.1 + 0.05,
    }));

    let bgGradient: CanvasGradient;
    let glowGradient: CanvasGradient;
    const buildGradients = () => {
      bgGradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
      if (isDark) {
        bgGradient.addColorStop(0, "#171123");
        bgGradient.addColorStop(0.5, "#1a0d2e");
        bgGradient.addColorStop(1, "#0d0716");
      } else {
        bgGradient.addColorStop(0, "#FBFBFB");
        bgGradient.addColorStop(0.5, "#f5f5f5");
        bgGradient.addColorStop(1, "#e8e8e8");
      }
      glowGradient = ctx.createRadialGradient(w / 2, h / 3, 0, w / 2, h / 3, w / 3);
      glowGradient.addColorStop(0, "rgba(111,45,189,0.1)");
      glowGradient.addColorStop(0.5, "rgba(166,99,204,0.05)");
      glowGradient.addColorStop(1, "rgba(111,45,189,0)");
    };
    buildGradients();

    const origResize = onResize;
    const onResizeWithGradients = () => {
      origResize();
      setTimeout(buildGradients, 210);
    };
    window.removeEventListener("resize", onResize);
    window.addEventListener("resize", onResizeWithGradients);

    const gridColor = isDark ? "#6F2DBD" : "#A663CC";
    const connectionColor = isDark ? "#6F2DBD" : "#A663CC";

    let animationFrameId: number;
    let lastTime = 0;
    const FRAME_MS = 1000 / 30;

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (now - lastTime < FRAME_MS) return;
      lastTime = now;

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (const line of gridLines) {
        line.y += line.speed;
        if (line.y > h) line.y = 0;
        ctx.globalAlpha = line.opacity;
        ctx.beginPath();
        ctx.moveTo(0, line.y);
        ctx.lineTo(w, line.y);
        ctx.stroke();
      }

      for (const wave of waves) {
        wave.phase += wave.speed;
        ctx.strokeStyle = wave.color;
        ctx.globalAlpha = wave.opacity;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x > w) p.x = 0;
        else if (p.x < 0) p.x = w;
        if (p.y > h) p.y = 0;
        else if (p.y < 0) p.y = h;
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = connectionColor;
      ctx.lineWidth = 1;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DIST_SQ) {
            ctx.globalAlpha = (1 - Math.sqrt(distSq) / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, w, h);

      ctx.globalAlpha = 1;
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResizeWithGradients);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{
        background: theme === "dark"
          ? "linear-gradient(135deg, #171123 0%, #1a0d2e 50%, #0d0716 100%)"
          : "linear-gradient(135deg, #FBFBFB 0%, #f5f5f5 50%, #e8e8e8 100%)",
      }}
    />
  );
}
