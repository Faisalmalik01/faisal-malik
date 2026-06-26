import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { scrollToSection } from "../utils/scroll";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--canvas)" }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(99,84,214,0.08), transparent 65%)",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        {/* Status badge — removed animate-pulse (was visually distracting) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10 flex justify-center"
        >
          <span
            className="font-mono uppercase tracking-[0.18em] text-[10px] px-4 py-2 rounded-full border"
            style={{
              color: "var(--purple)",
              borderColor: "var(--border)",
            }}
          >
            MERN STACK · OPEN TO OPPORTUNITIES
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-display font-semibold text-center leading-[0.95] tracking-[-0.04em]"
          style={{
            color: "var(--ink)",
            fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
          }}
        >
          Faisal Malik <span style={{ color: "var(--purple)" }}>.</span>
          <br />
          Building <span style={{ color: "var(--purple)" }}>products</span>
          <br />
          for the web.
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="h-[2px] mx-auto mt-5 rounded-full"
          style={{ background: "var(--purple)" }}
        />

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto text-center mt-10 max-w-xl"
          style={{
            color: "var(--muted)",
            fontSize: "clamp(1rem,1.5vw,1.15rem)",
            lineHeight: "1.9",
          }}
        >
          Exploring artificial intelligence, machine learning,
          and data-driven technologies through research and
          real-world projects.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex justify-center mt-12"
        >
          <button
            type="button"
            onClick={() => scrollToSection("projects")}
            aria-label="View my projects"
            className="group flex items-center gap-2 px-6 py-3 rounded-full border
                       transition-colors duration-300
                       text-[color:var(--ink)] border-[color:var(--border)]
                       hover:text-[color:var(--purple)] hover:border-[color:var(--purple)]"
          >
            View Projects
            <ArrowDownRight
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
            />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <button
        type="button"
        onClick={() => scrollToSection("about")}
        aria-label="Scroll down to About section"
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <span
          className="font-mono uppercase tracking-[0.18em] text-[10px]"
          style={{ color: "var(--muted)" }}
        >
          Scroll to explore
        </span>
      </button>
    </section>
  );
}
