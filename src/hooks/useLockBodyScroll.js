import { useEffect } from "react";

/**
 * iOS-safe scroll lock. Shared by Navbar (mobile menu) and Lightbox.
 * Fixes: Navbar used position:fixed trick; Lightbox used overflow:hidden — two
 * conflicting implementations that break when both are active at once.
 */
export function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return;
    const y = window.scrollY;
    document.body.style.cssText = `position:fixed;top:-${y}px;left:0;right:0;overflow-y:scroll`;
    return () => {
      document.body.style.cssText = "";
      window.scrollTo(0, y);
    };
  }, [active]);
}
