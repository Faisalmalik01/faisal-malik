import { useEffect, useRef, useState } from "react";

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!options.repeat) observer.unobserve(el);
        } else if (options.repeat) {
          setInView(false);
        }
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? "0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.repeat]);

  return [ref, inView];
}

// Removed dead exports:
//   useScrollProgress — was never imported; ScrollProgress.jsx uses framer-motion useScroll directly
//   useActiveSection  — was never imported; Navbar.jsx has its own inline intersection observer
