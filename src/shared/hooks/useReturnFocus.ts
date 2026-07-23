import { useLayoutEffect, useRef } from 'react';

export function useReturnFocus(enabled: boolean) {
  const returnTarget = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!enabled) return;
    returnTarget.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    return () => {
      const target = returnTarget.current;
      window.requestAnimationFrame(() => {
        if (target?.isConnected) target.focus();
      });
    };
  }, [enabled]);
}
