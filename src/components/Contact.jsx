import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { useInView } from "../hooks/useScrollAnimation";
import { personal } from "../data/portfolio";
import SectionLabel from "./SectionLabel";
import SectionHeading from "./SectionHeading";

const EASE = [0.16, 1, 0.3, 1];

const SOCIALS = [
  {
    Icon: FaGithub,
    title: "GitHub",
    subtitle: "Projects & experiments",
    href: personal.github,
  },
  {
    Icon: FaLinkedin,
    title: "LinkedIn",
    subtitle: "Professional profile",
    href: personal.linkedin,
  },
  {
    Icon: FaXTwitter,
    title: "Twitter / X",
    subtitle: "Thoughts & updates",
    href: personal.twitter,
  },
];

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.08 });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 sm:py-32"
      style={{ background: "var(--canvas-alt)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <SectionLabel>Contact</SectionLabel>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.05,
              ease: EASE,
            }}
          >
            <SectionHeading>
              Interested in working together
              <span style={{ color: "var(--purple)" }}>?</span>
            </SectionHeading>

            <p
              className="max-w-xl mt-6 text-[15px] sm:text-[16px] leading-8"
              style={{ color: "var(--muted)" }}
            >
              I'm currently looking for frontend, full-stack, and MERN
              opportunities where I can contribute, learn, and grow
              alongside experienced teams. If you have a role, project,
              or idea in mind, I'd love to hear from you.
            </p>

            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 mt-10 px-6 py-4 rounded-full font-medium"
              style={{
                background: "var(--purple)",
                color: "#fff",
              }}
            >
              <Mail size={17} />

              Let's Talk

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </motion.a>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.15,
              ease: EASE,
            }}
          >
            <div
              style={{
                borderTop: "1px solid var(--border)",
              }}
            >
              {SOCIALS.map(({ Icon, title, subtitle, href }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-6 transition-colors"
                  style={{
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background:
                          "color-mix(in srgb, var(--purple) 8%, var(--canvas))",
                        border:
                          "1px solid color-mix(in srgb,var(--purple) 18%, transparent)",
                      }}
                    >
                      <Icon
                        size={16}
                        style={{
                          color: "var(--purple)",
                        }}
                      />
                    </div>

                    <div>
                      <p
                        className="font-display font-medium text-[15px]"
                        style={{
                          color: "var(--ink)",
                        }}
                      >
                        {title}
                      </p>

                      <p
                        className="font-mono text-[11px]"
                        style={{
                          color: "var(--muted)",
                        }}
                      >
                        {subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{
                      color: "var(--muted)",
                    }}
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}