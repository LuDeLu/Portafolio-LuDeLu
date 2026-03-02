"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "@/lib/lenis";

interface LenisProps {
  children: React.ReactNode;
  isInsideModal?: boolean;
}

function SmoothScroll({ children, isInsideModal = false }: LenisProps) {
  const lenis = useLenis(() => {
    // scroll callback intentionally left empty
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleLoad = () => {
      lenis?.stop();
      setTimeout(() => {
        lenis?.start();
      }, 100);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [lenis]);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => {
          // Custom easing for smooth, buttery transitions
          return 1 - Math.pow(1 - t, 3);
        },
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
        prevent: (node) => {
          if (isInsideModal) return true;
          const modalOpen = node.classList.contains("modall");
          const isInput = node.tagName === 'INPUT' || node.tagName === 'TEXTAREA';
          const isSelect = node.tagName === 'SELECT';
          return modalOpen || isInput || isSelect;
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;
