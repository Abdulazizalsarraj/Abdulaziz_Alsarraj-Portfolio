import { useState, useEffect } from 'react';

/**
 * Returns true if the user has requested reduced motion via OS/browser settings.
 * Use this to disable or simplify animations for accessibility & performance.
 */
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
};

export default useReducedMotion;
