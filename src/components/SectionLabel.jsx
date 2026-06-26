/**
 * Consistent section label (purple mono uppercase tag) used across all sections.
 * Fixes: spacing was mb-14 / mb-12 / mb-6 inconsistently across components.
 */
export default function SectionLabel({ children }) {
  return (
    <p
      className="font-mono text-[11px] uppercase tracking-[0.13em] mb-12"
      style={{ color: "var(--purple)" }}
    >
      {children}
    </p>
  );
}
