import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { personal } from "../data/portfolio";

const SOCIALS = [
  {
    key: "github",
    label: "GitHub profile",
    href: personal.github,
    Icon: FaGithub,
  },
  {
    key: "linkedin",
    label: "LinkedIn profile",
    href: personal.linkedin,
    Icon: FaLinkedin,
  },
  {
    key: "twitter",
    label: "Twitter / X profile",
    href: personal.twitter,
    Icon: FaXTwitter,
  },
];

/**
 * @param {boolean} compact - renders smaller icons (used in Footer)
 */
export default function SocialIcons({ compact = false }) {
  const size = compact ? 14 : 15;

  return (
    <nav aria-label="Social media links" className="flex items-center gap-2">
      {SOCIALS.map(({ key, label, href, Icon }, i) => (
        <motion.a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="flex items-center justify-center rounded-full
                     transition-colors duration-200
                     text-[color:var(--muted)] hover:text-[color:var(--purple)]"
          style={{
            width: compact ? 32 : 36,
            height: compact ? 32 : 36,
            border: "1px solid var(--border)",
            background: "var(--panel)",
          }}
        >
          <Icon size={size} strokeWidth={1.7} aria-hidden="true" />
        </motion.a>
      ))}
    </nav>
  );
}
