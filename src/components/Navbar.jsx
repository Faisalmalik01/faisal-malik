import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Download } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { personal } from "../data/portfolio";
import { scrollToSection } from "../utils/scroll";

const LINKS = [
  { id: "hero",      label: "Home"      },
  { id: "about",     label: "About"     },
  { id: "skills",    label: "Skills"    },
  { id: "projects",  label: "Projects"  },
  { id: "education", label: "Education" },
  { id: "contact",   label: "Contact"   },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [active, setActive]         = useState("hero");
  const [visible, setVisible]       = useState(true);
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  // Shared scroll-lock — replaces the inline body.style.cssText block
  useLockBodyScroll(mobileOpen);

  // Hide/show navbar on scroll direction
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const obs = LINKS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o?.disconnect());
  }, []);

  const go = (id) => {
    setMobileOpen(false);
    requestAnimationFrame(() =>
      setTimeout(() => scrollToSection(id), 20)
    );
  };

  return (
    <>
      {/* Fixed pill navbar */}
      <motion.header
        role="banner"
        animate={{ y: visible ? 0 : -88, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 38 }}
        className="fixed z-50 inset-x-0 top-0 flex justify-center pt-3 sm:pt-4 px-4 pointer-events-none"
      >
        <div
          className="pointer-events-auto flex items-center h-14 rounded-full px-2 gap-0.5 smooth"
          style={{
            background: scrolled
              ? "color-mix(in srgb, var(--canvas) 70%, transparent)"
              : "color-mix(in srgb, var(--canvas) 55%, transparent)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid color-mix(in srgb, var(--border) 70%, transparent)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.03)"
              : "0 2px 12px rgba(0,0,0,0.03)",
          }}
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() => go("hero")}
            className="px-4 py-1.5 rounded-full font-display font-semibold text-[14px] tracking-tight
                       transition-colors duration-200
                       text-[color:var(--ink)] hover:text-[color:var(--purple)]"
            style={{ letterSpacing: "-0.03em" }}
          >
            {personal.logo}
          </button>

          <div className="w-px h-4 mx-0.5 hidden sm:block" style={{ background: "var(--border)" }} />

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden sm:flex items-center">
            {LINKS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                aria-current={active === id ? "page" : undefined}
                className="relative px-3.5 py-2 rounded-full text-[12.5px] font-medium smooth
                           transition-colors duration-200"
                style={{ color: active === id ? "var(--ink)" : "var(--muted)" }}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "color-mix(in srgb, var(--purple) 8%, var(--panel))" }}
                    transition={{ type: "spring", stiffness: 500, damping: 42 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </nav>

          <div className="w-px h-4 mx-0.5 hidden sm:block" style={{ background: "var(--border)" }} />

          <div className="flex items-center gap-0.5">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="w-9 h-9 rounded-full flex items-center justify-center max-w-fit smooth ml-2
                         transition-colors duration-200
                         text-[color:var(--muted)] hover:text-[color:var(--purple)]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex"
                >
                  {theme === "dark"
                    ? <Sun size={14} strokeWidth={1.8} aria-hidden="true" />
                    : <Moon size={14} strokeWidth={1.8} aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Resume download */}
            <a
              href={personal.resume}
              download
              className="hidden md:inline-flex items-center gap-1.5
                         ml-2 px-4 py-2 rounded-full
                         text-[10px] font-semibold
                         border transition-colors duration-300
                         text-[color:var(--ink)] border-[color:var(--border)]
                         hover:text-[color:var(--purple)] hover:border-[color:var(--purple)]"
              style={{ background: "var(--panel)" }}
            >
              <Download size={12} strokeWidth={2} aria-hidden="true" /> Resume
            </a>

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="sm:hidden w-9 h-9 rounded-full flex flex-col justify-center items-center gap-[5px] ml-4"
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6.5 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                className="block h-[1.5px] rounded-full"
                style={{ background: "var(--ink)", width: 18 }}
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                transition={{ duration: 0.15 }}
                className="block h-[1.5px] rounded-full"
                style={{ background: "var(--ink)", width: 12 }}
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6.5 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                className="block h-[1.5px] rounded-full"
                style={{ background: "var(--ink)", width: 18 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="dim"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 sm:hidden"
              style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)" }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 38 }}
              className="fixed z-50 sm:hidden"
              style={{
                top: 72, left: 16, right: 16,
                background: "var(--canvas)",
                border: "1px solid var(--border)",
                borderRadius: 22,
                boxShadow: "0 24px 64px rgba(0,0,0,0.14)",
              }}
            >
              <nav aria-label="Mobile navigation" className="p-2.5">
                {LINKS.map(({ id, label }, i) => (
                  <motion.button
                    key={id}
                    type="button"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => go(id)}
                    aria-current={active === id ? "page" : undefined}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-[15px] font-medium smooth text-left"
                    style={{
                      color: active === id ? "var(--purple)" : "var(--ink-soft)",
                      background: active === id ? "var(--panel)" : "transparent",
                    }}
                  >
                    {label}
                    {active === id && (
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--purple)" }} />
                    )}
                  </motion.button>
                ))}
              </nav>

              <div
                className="px-2.5 pb-2.5 pt-1.5 flex justify-center"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <a
                  href={personal.resume}
                  download
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5
                             px-4 py-2 rounded-full
                             text-[14px] font-semibold
                             border transition-colors duration-300
                             text-[color:var(--ink)] border-[color:var(--border)]
                             hover:text-[color:var(--purple)] hover:border-[color:var(--purple)]"
                  style={{ background: "var(--panel)" }}
                >
                  <Download size={14} strokeWidth={2} aria-hidden="true" />
                  Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
