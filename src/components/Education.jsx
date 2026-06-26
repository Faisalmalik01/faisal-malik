import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import {
  BookOpen,
  FlaskConical,
  Code2,
  Search,
  ArrowUpRight,
} from "lucide-react";

import { education } from "../data/portfolio";
import { useInView } from "../hooks/useScrollAnimation";
import SectionLabel from "./SectionLabel";
import SectionHeading from "./SectionHeading";

const ICON_MAP = {
  book: BookOpen,
  flask: FlaskConical,
  code: Code2,
  research: Search,
};

const EASE = [0.16, 1, 0.3, 1];

export default function Education() {
  const [ref, inView] = useInView({ threshold: 0.08 });

  return (
    <section
      id="education"
      ref={ref}
      className="py-24 sm:py-32"
      style={{ background: "var(--canvas)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <SectionLabel>Education</SectionLabel>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.65,
            delay: 0.05,
            ease: EASE,
          }}
        >
          <SectionHeading>
            Academic background
            <span style={{ color: "var(--purple)" }}>.</span>
          </SectionHeading>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div
            className="absolute left-[13px] top-0 bottom-0 hidden sm:block"
            style={{
              width: "1px",
              background: "var(--border)",
            }}
          />

          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.article
                key={edu.institution}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: EASE,
                }}
                whileHover={{ y: -2 }}
                className="relative"
              >
                {/* Timeline dot */}
{/* Timeline icon */}
<div
  className="hidden sm:flex absolute left-0 top-7 w-8 h-8 rounded-full items-center justify-center"
  style={{
    background: "var(--canvas)",
    border: "1px solid var(--border)",
  }}
>
  <GraduationCap
    size={14}
    strokeWidth={1.8}
    style={{ color: "var(--purple)" }}
  />
</div>

                {/* Card */}
                <div
                  className="sm:ml-14 overflow-hidden"
                  style={{
                    borderRadius: 24,
                    background: "var(--canvas-alt)",
                    border: "1px solid var(--border)",
                    transition:
                      "border-color .3s ease, box-shadow .3s ease",
                  }}
                >
                  <div className="p-6 sm:p-8">
                    {/* Top Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div>
                        {/* <div
                          className="inline-flex items-center px-3 py-1 rounded-full font-mono text-[10px] font-medium mb-4"
                          style={{
                            color: "var(--purple)",
                            background:
                              "color-mix(in srgb,var(--purple) 8%, var(--canvas))",
                            border:
                              "1px solid color-mix(in srgb,var(--purple) 18%, transparent)",
                          }}
                        >
                          {edu.grade}
                        </div> */}

                        <h3
                          className="font-semibold leading-tight"
                          style={{
                            color: "var(--ink)",
                            fontSize:
                              "clamp(1.2rem,2.4vw,1.7rem)",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {edu.institution}
                        </h3>

                        <p
                          className="mt-2 text-sm"
                          style={{
                            color: "var(--muted)",
                          }}
                        >
                          {edu.field}
                        </p>
                      </div>

                      <div
                        className="px-4 py-2 rounded-full font-mono text-[11px] self-start"
                        style={{
                          background: "var(--panel)",
                          border: "1px solid var(--border)",
                          color: "var(--ink-soft)",
                        }}
                      >
                        {edu.period}
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      className="mb-6"
                      style={{
                        height: "1px",
                        background: "var(--border)",
                      }}
                    />

                    {/* Highlights */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {edu.highlights.map((item) => {
                        const Icon =
                          ICON_MAP[item.icon] ?? BookOpen;

                        return (
                          <div
                            key={item.text}
                            className="flex gap-3"
                          >
                            <div
                              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{
                                background:
                                  "color-mix(in srgb,var(--purple) 8%, var(--canvas))",
                                border:
                                  "1px solid color-mix(in srgb,var(--purple) 15%, transparent)",
                              }}
                            >
                              <Icon
                                size={14}
                                style={{
                                  color: "var(--purple)",
                                }}
                              />
                            </div>

                            <p
                              className="text-[13px] leading-[1.75]"
                              style={{
                                color: "var(--muted)",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}