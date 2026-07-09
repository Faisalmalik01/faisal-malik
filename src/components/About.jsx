import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useInView } from "../hooks/useScrollAnimation";
import { personal } from "../data/portfolio";
import SectionLabel from "./SectionLabel";
import SectionHeading from "./SectionHeading";

const DOMAINS = [
  {
    label: "MERN Stack",
    color: "var(--purple)",
    bg: "color-mix(in srgb, var(--purple) 8%, var(--canvas))",
  },
  {
    label: "AI / ML",
    color: "var(--green)",
    bg: "color-mix(in srgb, var(--green) 8%, var(--canvas))",
  },
  {
    label: "Data Science",
    color: "var(--sky)",
    bg: "color-mix(in srgb, var(--sky) 8%, var(--canvas))",
  },
];

const TRAITS = [
  {
    n: "01",
    title: "Research Experience",
    body: "Completed an undergraduate research project on Explainable AI for retinal disease classification, gaining experience in applying machine learning to real-world healthcare problems.",
  },
  {
    n: "02",
    title: "MERN Development",
    body: "Building responsive web applications with React while strengthening backend development using Node.js, Express.js, MongoDB, REST APIs, and authentication.",
  },
  {
    n: "03",
    title: "Always Learning",
    body: "Continuously improving backend development, software engineering fundamentals, and building production-ready MERN applications.",
  },
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.06 });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 sm:py-32"
      style={{ background: "var(--canvas-alt)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>About Me</SectionLabel>
        </motion.div>

        {/* Fix: "i'm" → "I'm" */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading>
            Hey, I'm Faisal<span style={{ color: "var(--purple)" }}>.</span>
          </SectionHeading>
        </motion.div>

        <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-16 lg:gap-24">
          {/* LEFT — bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              {personal.bio.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[15px] sm:text-[16px] leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Domain chips + location */}
            <div
              className="mt-10 pt-8"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div className="flex flex-wrap gap-2 mb-5">
                {DOMAINS.map(({ label, color, bg }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{
                      background: bg,
                      border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
                    }}
                  >
                    <span
                      className="w-[3px] h-4 rounded-full"
                      aria-hidden="true"
                      style={{ background: color }}
                    />
                    <span
                      className="font-display text-[12px] font-semibold"
                      style={{ color }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="mt-10 flex items-center gap-2"
                style={{ color: "var(--muted)" }}
              >
                <MapPin size={14} aria-hidden="true" style={{ color: "var(--purple)" }} />
                <span className="font-body text-[14px]">{personal.location}</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — numbered traits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div
              className="absolute left-[3px] top-0 bottom-0 w-px hidden lg:block"
              aria-hidden="true"
              style={{ background: "var(--border)" }}
            />

            <div className="space-y-10">
              {TRAITS.map(({ n, title, body }) => (
                <div key={n} className="relative pl-8">
                  <span
                    className="absolute left-0 top-[7px] w-2 h-2 rounded-full"
                    aria-hidden="true"
                    style={{ background: "var(--purple)" }}
                  />
                  <span className="font-mono text-[10px]" style={{ color: "var(--purple)" }}>
                    {n}
                  </span>
                  <h3
                    className="font-display font-semibold text-[18px] mt-2 mb-3"
                    style={{ color: "var(--ink)" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.8]"
                    style={{ color: "var(--muted)" }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
