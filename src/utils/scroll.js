/**
 * Smoothly scrolls to a section by its id.
 * Shared utility — used by Hero and Navbar to avoid duplicate logic.
 */
export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
