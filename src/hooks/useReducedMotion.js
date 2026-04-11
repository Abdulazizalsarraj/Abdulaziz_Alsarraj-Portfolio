'use client';
import { useState, useEffect } from 'react';

/**
 * Returns true if the user has requested reduced motion via OS/browser settings.
 * Use this to disable or simplify animations for accessibility & performance.
 */
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false); // SSR-safe default

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
};

export default useReducedMotion;
