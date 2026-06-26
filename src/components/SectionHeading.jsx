/**
 * Consistent section h2 used across all sections.
 * Fixes: identical style block was duplicated in About, Skills, Projects, Education, Contact.
 */
export default function SectionHeading({ children, className = "" }) {
  return (
    <h2
      className={`font-display font-semibold leading-[1.12] tracking-tight mb-14 ${className}`}
      style={{
        fontSize: "clamp(1.7rem, 4vw, 2.5rem)",
        color: "var(--ink)",
        letterSpacing: "-0.02em",
      }}
    >
      {children}
    </h2>
  );
}
