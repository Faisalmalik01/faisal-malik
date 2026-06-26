import { ThemeContext, useThemeState } from "./hooks/useTheme";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const themeState = useThemeState();
  return (
    <ThemeContext.Provider value={themeState}>
      {/* Background set on body via index.css — no redundant inline style needed */}
      <div className="min-h-screen">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
