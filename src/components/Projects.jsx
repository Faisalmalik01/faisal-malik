import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import { projects, personal } from "../data/portfolio";
import { useInView } from "../hooks/useScrollAnimation";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import SectionLabel from "./SectionLabel";
import SectionHeading from "./SectionHeading";

const ACCENTS = {
  purple: {
    text: "var(--purple)",
    glow: "rgba(94, 92, 230, 0.14)",
    border: "rgba(94, 92, 230, 0.22)",
    tag: "rgba(94, 92, 230, 0.08)",
  },
  green: {
    text: "var(--green)",
    glow: "rgba(48, 176, 87, 0.14)",
    border: "rgba(48, 176, 87, 0.22)",
    tag: "rgba(48, 176, 87, 0.08)",
  },
  blue: {
    text: "var(--sky)",
    glow: "rgba(10, 132, 255, 0.14)",
    border: "rgba(10, 132, 255, 0.22)",
    tag: "rgba(10, 132, 255, 0.08)",
  },
  red: {
    text: "var(--coral)",
    glow: "rgba(255, 69, 58, 0.14)",
    border: "rgba(255, 69, 58, 0.22)",
    tag: "rgba(255, 69, 58, 0.08)",
  },
};

const EASE = [0.16, 1, 0.3, 1];

/* ── Lightbox ──────────────────────────────────────────────────── */
function Lightbox({ project, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const images = project.images || [];
  const reduceMotion = useReducedMotion();
  const closeRef = useRef(null);

  // Shared scroll lock — same mechanism as Navbar mobile menu
  useLockBodyScroll(true);

  // Keyboard navigation + focus management
  useState(() => {
    closeRef.current?.focus();
  });

  const handleKey = (e) => {
    if (e.key === "Escape") onClose();
    if (images.length > 1) {
      if (e.key === "ArrowRight") setIndex((p) => (p + 1) % images.length);
      if (e.key === "ArrowLeft")  setIndex((p) => (p - 1 + images.length) % images.length);
    }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} images`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(6,6,8,0.82)", backdropFilter: "blur(30px)" }}
      onClick={onClose}
      onKeyDown={handleKey}
    >
      {/* Close */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full smooth
                   transition-colors duration-200"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
        }}
      >
        <X size={18} aria-hidden="true" />
      </button>

      {/* Project name + counter */}
      <div className="absolute top-6 left-6 z-20">
        <p className="font-display font-semibold text-[14px] tracking-tight text-white/90">
          {project.title}
        </p>
        {images.length > 1 && (
          <p className="font-mono text-[11px] mt-0.5 text-white/40">
            {index + 1} / {images.length}
          </p>
        )}
      </div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); setIndex((p) => (p - 1 + images.length) % images.length); }}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full smooth transition-colors duration-200"
            style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); setIndex((p) => (p + 1) % images.length); }}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full smooth transition-colors duration-200"
            style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </>
      )}

      {/* Image */}
      <motion.img
        key={index}
        src={images[index]}
        alt={`${project.title} — screenshot ${index + 1} of ${images.length}`}
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
        className="max-h-[85vh] max-w-full rounded-[24px] object-contain"
        style={{ boxShadow: "0 30px 120px rgba(0,0,0,0.5)" }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={(e) => { e.stopPropagation(); setIndex(i); }}
              className="rounded-full smooth"
              style={{
                width: i === index ? 20 : 6, height: 6,
                background: i === index ? "white" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ── ProjectViewer — main image + filmstrip ────────────────────── */
function ProjectViewer({ project, onOpen }) {
  const [active, setActive] = useState(0);
  const [error, setError] = useState({});
  const images = project.images || [];
  const accent = ACCENTS[project.color] ?? ACCENTS.purple;
  const hasMultiple = images.length > 1;

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Main frame */}
      <motion.div
        className="group relative overflow-hidden cursor-pointer flex-1"
        style={{ aspectRatio: "16/10", borderRadius: 20, background: "var(--panel)", minHeight: 0 }}
        onClick={() => onOpen(active)}
        whileHover={{ scale: 1.012 }}
        transition={{ duration: 0.4, ease: EASE }}
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.title} screenshot ${active + 1} in lightbox`}
        onKeyDown={(e) => e.key === "Enter" && onOpen(active)}
      >
        <AnimatePresence mode="wait">
          {images[active] && !error[active] ? (
            <motion.img
              key={active}
              src={images[active]}
              alt={`${project.title} — screenshot ${active + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onError={() => setError((p) => ({ ...p, [active]: true }))}
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 25% 30%, ${accent.glow}, transparent 60%), var(--panel)`,
              }}
            >
              <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                {project.domain}
              </span>
            </div>
          )}
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)" }}
          aria-hidden="true"
        />
        <div className="absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-250"
          style={{ background: "rgba(0,0,0,0.42)", backdropFilter: "blur(10px)" }}
          aria-hidden="true"
        >
          <Maximize2 size={14} color="white" />
        </div>
      </motion.div>

      {/* Filmstrip */}
      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar flex-shrink-0" role="list" aria-label="Project screenshots">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              role="listitem"
              onClick={() => setActive(i)}
              aria-label={`View screenshot ${i + 1}`}
              aria-pressed={i === active}
              className="flex-shrink-0 overflow-hidden transition-all duration-200"
              style={{
                width: 56, height: 38, borderRadius: 8,
                border: i === active ? `2px solid ${accent.text}` : "1.5px solid var(--border)",
                opacity: i === active ? 1 : 0.5,
                transform: i === active ? "scale(1)" : "scale(0.94)",
                background: "var(--panel)",
              }}
            >
              {src && !error[`t${i}`] && (
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover object-top"
                  onError={() => setError((p) => ({ ...p, [`t${i}`]: true }))}
                  loading="lazy"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── ProjectCard ───────────────────────────────────────────────── */
function ProjectCard({ project, index, onOpenLightbox }) {
  const ref = useRef(null);
  const reverse = index % 2 !== 0;
  const accent = ACCENTS[project.color] ?? ACCENTS.purple;
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.55"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 40, 0]);

  return (
    <motion.article ref={ref} style={{ opacity, y }} aria-label={project.title}>
      <div
        className={`overflow-hidden lg:flex ${reverse ? "lg:flex-row-reverse" : ""}`}
        style={{
          borderRadius: 28,
          border: "1px solid var(--border)",
          background: "var(--canvas-alt)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)",
          transition: "border-color 0.3s ease, box-shadow 0.35s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = accent.border;
          e.currentTarget.style.boxShadow = `0 20px 56px rgba(0,0,0,0.10), 0 0 0 1px ${accent.border}`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)";
        }}
      >
        <div className="lg:w-[55%] p-3 lg:p-4">
          <ProjectViewer project={project} onOpen={(idx) => onOpenLightbox(project, idx)} />
        </div>

        <div className="flex flex-col justify-center px-7 py-8 lg:px-9 lg:py-10 flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.13em]" style={{ color: accent.text }}>
              {project.domain}
            </span>
            <span className="w-[3px] h-[3px] rounded-full" aria-hidden="true" style={{ background: "var(--muted)" }} />
            <span className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>{project.year}</span>
          </div>

          <h3
            className="font-display font-semibold leading-[1.1] tracking-tight mb-4"
            style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.95rem)", color: "var(--ink)", letterSpacing: "-0.03em" }}
          >
            {project.title}
          </h3>

          {project.description && (
            <p className="text-[14px] leading-[1.78] mb-6 max-w-[46ch]" style={{ color: "var(--muted)" }}>
              {project.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-7">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1.5 font-mono text-[11px] font-medium"
                style={{ background: accent.tag, border: `1px solid ${accent.border}`, color: accent.text }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mb-6" style={{ height: 1, background: "var(--border)" }} aria-hidden="true" />

          <div className="flex flex-wrap items-center gap-6">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[12px] font-semibold group/lnk"
                style={{ color: accent.text }}
              >
                <span className="underline underline-offset-4 decoration-transparent group-hover/lnk:decoration-current transition-all duration-200">
                  Live Demo
                </span>
                <ArrowUpRight size={13} aria-hidden="true" className="transition-transform duration-200 group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5" />
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[12px] group/lnk smooth
                         transition-colors duration-200
                         text-[color:var(--muted)] hover:text-[color:var(--ink)]"
            >
              <span className="underline underline-offset-4 decoration-transparent group-hover/lnk:decoration-current transition-all duration-200">
                View on GitHub
              </span>
              <ArrowUpRight size={13} aria-hidden="true" className="transition-transform duration-200 group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Section ───────────────────────────────────────────────────── */
export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05 });
  const [lightbox, setLightbox] = useState(null);

  return (
    <section
      id="projects"
      className="py-24 sm:py-32"
      style={{
        background: `radial-gradient(circle at top right, rgba(94,92,230,0.05), transparent 35%), var(--canvas-alt)`,
      }}
    >
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <SectionLabel>Projects</SectionLabel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-16 flex items-center justify-between gap-4 sm:mb-20"
        >
          <SectionHeading className="flex-1 mb-0">
            Things I have built<span style={{ color: "var(--purple)" }}>.</span>
          </SectionHeading>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full px-5 py-2.5 font-mono text-[12px] smooth
                       transition-colors duration-200
                       text-[color:var(--ink-soft)] hover:text-[color:var(--purple)]
                       border border-[color:var(--border)] hover:border-[color:var(--purple)]"
            style={{ background: "var(--panel)" }}
          >
            All on GitHub <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </motion.div>

        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenLightbox={(p, idx) => setLightbox({ project: p, startIndex: idx })}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            project={lightbox.project}
            startIndex={lightbox.startIndex}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
