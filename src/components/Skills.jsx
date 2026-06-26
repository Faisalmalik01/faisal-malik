import { motion } from "framer-motion";
import { useInView } from "../hooks/useScrollAnimation";
import SectionLabel from "./SectionLabel";
import SectionHeading from "./SectionHeading";

/**
 * Inline SVG tech icons.
 * All icons are wrapped with aria-hidden in the Chip component since the
 * text label already provides the accessible name.
 */
const TECH_ICONS = {
  React: () => (
    <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  ),
  "Node.js": () => <svg viewBox="0 0 24 24" width="15" height="15" fill="#68A063"><path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.2l7 4v8l-7 4-7-4v-8l7-4z"/></svg>,
  Express: () => <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M3 7h18M3 12h12M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  MongoDB: () => <svg viewBox="0 0 24 24" width="15" height="15" fill="#47A248"><path d="M12 2C9 2 7 5.5 7 9.5c0 3 1.5 5.5 3.5 7l.5 3.5h2l.5-3.5C15.5 15 17 12.5 17 9.5 17 5.5 15 2 12 2z"/></svg>,
  JavaScript: () => (
    <svg viewBox="0 0 24 24" width="15" height="15">
      <rect width="24" height="24" rx="2" fill="#F7DF1E"/>
      <path d="M7 17.5c.5 1 1.2 1.5 2.2 1.5 1.1 0 1.8-.5 1.8-1.5 0-1.1-.7-1.5-1.9-2.1l-.7-.3C6.8 14.3 6 13.3 6 11.7 6 9.8 7.4 8.5 9.5 8.5c1.4 0 2.4.5 3.1 1.8l-1.7 1.1c-.4-.7-.8-1-1.4-1-.7 0-1.1.4-1.1 1 0 .7.4 1 1.6 1.5l.7.3C12.4 13.9 13 14.9 13 16.5c0 2.1-1.6 3.5-3.8 3.5-2.1 0-3.5-1-4.2-2.3L7 17.5zm8-8.8h2v6.8c0 2.2-1.1 3.5-2.9 3.5-1.5 0-2.4-.8-2.9-1.8l1.7-1c.3.6.7 1 1.3 1 .6 0 .8-.4.8-1.3V8.7z" fill="#000"/>
    </svg>
  ),
  HTML5: () => <svg viewBox="0 0 24 24" width="15" height="15" fill="#E34F26"><path d="M4 2l1.5 17L12 21l6.5-2L20 2H4zm13 3.5l-.3 3.5H9l.2 2h7.3l-.8 8L12 20l-3.7-1-.2-2.5h2l.1 1.2L12 18l1.8-.4.2-2.1H8.5l-.5-6H15l.2-2H7.7L7.5 5.5H17z"/></svg>,
  CSS3: () => <svg viewBox="0 0 24 24" width="15" height="15" fill="#1572B6"><path d="M4 2l1.5 17L12 21l6.5-2L20 2H4zm13 3.5l-.2 2.5H9.8l.2 2h6.7l-.5 5.5L12 16.5l-4.2-1L7.5 13h2l.2 1.2L12 15l2.3-.5.3-3H7.5L7 5.5h10z"/></svg>,
  Tailwind: () => <svg viewBox="0 0 24 24" width="15" height="15" fill="#06B6D4"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.09 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.51 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C7.38 17.85 8.49 19 11 19c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.51 12 7 12z"/></svg>,
  Python: () => (
    <svg viewBox="0 0 24 24" width="15" height="15">
      <path d="M12 2C9 2 7 3.5 7 6v2h5v1H6C4 9 2 10.5 2 13v3c0 2.5 2 4 4 4h1v-3c0-2 1.5-3 3-3h4c1.5 0 3-1.5 3-3V6c0-2.5-2-4-5-4zm-1 2.5a1 1 0 110 2 1 1 0 010-2z" fill="#3776AB"/>
      <path d="M12 22c3 0 5-1.5 5-4v-2h-5v-1h6c2 0 4-1.5 4-4v-3c0-2.5-2-4-4-4h-1v3c0 2-1.5 3-3 3H10c-1.5 0-3 1.5-3 3v4c0 2.5 2 4 5 4zm1-2.5a1 1 0 110-2 1 1 0 010 2z" fill="#FFD43B"/>
    </svg>
  ),
  CNN: () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="6" width="4" height="4" rx="1"/><rect x="10" y="4" width="4" height="4" rx="1"/>
      <rect x="10" y="10" width="4" height="4" rx="1"/><rect x="18" y="7" width="4" height="4" rx="1"/>
      <path d="M6 8h4M14 6l4 2M14 12l4-1" strokeLinecap="round"/>
    </svg>
  ),
  Pandas: () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
      <rect x="4" y="3" width="4" height="18" rx="1.5" fill="#150458"/>
      <rect x="10" y="3" width="4" height="18" rx="1.5" fill="#E70488"/>
      <rect x="16" y="3" width="4" height="18" rx="1.5" fill="#150458"/>
    </svg>
  ),
  NumPy: () => <svg viewBox="0 0 24 24" width="15" height="15" fill="#013243"><path d="M12 2L3 7v5l9-5 9 5V7L12 2zM3 12v5l9 5 9-5v-5l-9 5-9-5z"/></svg>,
  Git: () => <svg viewBox="0 0 24 24" width="15" height="15" fill="#F05032"><path d="M23.5 11.5l-11-11a1.7 1.7 0 00-2.4 0L7.7 3l3 3a2 2 0 002.6 2.6l2.9 2.9a2 2 0 102.6 2.6l-2.9-2.9a2 2 0 00-2.6-2.6L10.5 6l3 3v.4a2 2 0 102 2 2 2 0 00-2-2h-.4L11 7.5.5 18a1.7 1.7 0 000 2.4l2.6 2.6a1.7 1.7 0 002.4 0L23.5 14a1.7 1.7 0 000-2.5z"/></svg>,
  GitHub: () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.1.8-.26.8-.58v-2.23c-3.34.73-4.03-1.4-4.03-1.4-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.2.69.8.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  Postman: () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="#FF6C37">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 12h8M12 8l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "REST API": () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7h18M3 12h12M3 17h8" strokeLinecap="round"/>
    </svg>
  ),
  Redux: () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
      <path d="M15.8 8.4c1.3-.8 2.8-.9 3.8-.3.9.5 1.4 1.4 1.4 2.5 0 2.2-2 4.3-5.1 5.8" stroke="#764ABC" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M8.2 15.6c-1.3.8-2.8.9-3.8.3C3.5 15.4 3 14.5 3 13.4c0-2.2 2-4.3 5.1-5.8" stroke="#764ABC" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M8.2 8.4c0-1.6.5-3 1.5-3.6.9-.5 2-.5 3 0 1.9 1.1 3.1 3.7 3.1 7.2" stroke="#764ABC" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="1.7" fill="#764ABC"/>
      <circle cx="18.3" cy="8.6" r="1.2" fill="#764ABC"/>
      <circle cx="5.7" cy="15.4" r="1.2" fill="#764ABC"/>
    </svg>
  ),
  TensorFlow: () => (
    <svg viewBox="0 0 24 24" width="15" height="15">
      <path fill="#FF6F00" d="M12 2L4 6.5v11L8 20V10l4-2.2V22l4-2.3V7.8L20 10V6.5L12 2z"/>
    </svg>
  ),
  Keras: () => (
    <svg viewBox="0 0 24 24" width="15" height="15">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="#D00000"/>
      <path d="M7 7v10h2.5v-3.5L13 17h3l-4.2-4.8L15.8 7h-3L9.5 10.8V7H7z" fill="white"/>
    </svg>
  ),
  "Explainable AI": () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
      <circle cx="12" cy="12" r="8" stroke="#22C55E" strokeWidth="1.5"/>
      <path d="M12 8v4l3 2" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="1.5" fill="#22C55E"/>
    </svg>
  ),
  Matplotlib: () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
      <path d="M4 19V5M4 19H20" stroke="#11557C" strokeWidth="1.5"/>
      <path d="M6 16L10 11L13 13L18 7" stroke="#11557C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  SQL: () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
      <ellipse cx="12" cy="6" rx="6" ry="3" fill="#336791"/>
      <path d="M6 6v8c0 1.7 2.7 3 6 3s6-1.3 6-3V6" fill="#336791"/>
      <ellipse cx="12" cy="14" rx="6" ry="3" fill="#295C7A"/>
    </svg>
  ),
};

function Chip({ name, color }) {
  const Icon = TECH_ICONS[name];
  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
      style={{ background: `${color}0e`, border: `1px solid ${color}20` }}
    >
      {/* aria-hidden: the text label already provides the accessible name */}
      {Icon && (
        <span aria-hidden="true" className="flex-shrink-0">
          <Icon />
        </span>
      )}
      <span className="font-mono text-[10.5px] font-medium" style={{ color: "var(--ink-soft)" }}>
        {name}
      </span>
    </div>
  );
}

const SERVICES = [
  {
    n: "01",
    title: "Full Stack (MERN)",
    color: "#6354D6",
    body: "Building modern web apps end-to-end — from REST APIs to responsive React UIs. My primary stack.",
    tools: [
      { n: "React" }, { n: "Redux" }, { n: "Node.js" }, { n: "Express" }, { n: "MongoDB" },
      { n: "JavaScript" }, { n: "HTML5" }, { n: "CSS3" }, { n: "Tailwind" }, { n: "REST API" },
    ],
  },
  {
    n: "02",
    title: "AI / Machine Learning",
    color: "#3C9A5F",
    body: "Computer vision, deep learning, transfer learning. Applying CNNs to real classification problems.",
    tools: [
      { n: "Python" }, { n: "TensorFlow" }, { n: "Keras" }, { n: "CNN" }, { n: "Explainable AI" },
    ],
  },
  {
    n: "03",
    title: "Data Science",
    color: "#4A7FC9",
    body: "Data analysis, visualisation, and machine learning fundamentals. Exploring patterns in real datasets.",
    tools: [
      { n: "Python" }, { n: "Pandas" }, { n: "NumPy" }, { n: "Matplotlib" }, { n: "SQL" },
    ],
  },
  {
    n: "04",
    title: "Tools & Workflow",
    color: "#7A6BC4",
    body: "The environment around the code — version control, API testing, and clean development workflows.",
    tools: [
      { n: "Git" }, { n: "GitHub" }, { n: "Postman" },
    ],
  },
];

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.04 });

  return (
    <section id="skills" className="py-24 sm:py-32" style={{ background: "var(--canvas)" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.45 }}
        >
          <SectionLabel>Skills</SectionLabel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading>
            What I work with<span style={{ color: "var(--purple)" }}>.</span>
          </SectionHeading>
        </motion.div>

        <div style={{ borderTop: "1px solid var(--border)" }}>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="py-7"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-[56px_1fr] gap-2 sm:gap-5 mb-4">
                <span className="font-mono text-[11px] pt-0.5" style={{ color: "var(--muted)" }}>{s.n}</span>
                <div>
                  <h3
                    className="font-display font-semibold text-[15px] mb-1.5 flex items-center gap-2"
                    style={{ color: "var(--ink)" }}
                  >
                    <span className="w-[3px] h-4 rounded-full" aria-hidden="true" style={{ background: s.color }} />
                    {s.title}
                  </h3>
                  <p className="font-body text-[13px] leading-[1.7]" style={{ color: "var(--muted)" }}>{s.body}</p>
                </div>
              </div>

              <div className="sm:pl-[76px] flex flex-wrap gap-2">
                {s.tools.map((t, j) => (
                  <motion.div
                    key={t.n}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.09 + j * 0.04 + 0.15, duration: 0.28 }}
                  >
                    <Chip name={t.n} color={s.color} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
