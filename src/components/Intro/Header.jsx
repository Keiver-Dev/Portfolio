import { useState, useEffect } from "react";
import { motion as Motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Menu } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", path: "/#work" },
    { name: "Story", path: "/about" },
    { name: "Stack", path: "/#stack" },
  ];

  return (
    <>
      <Motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm"
            : "py-8 bg-transparent"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group flex flex-col" onClick={() => setMobileOpen(false)}>
              <h1 className="font-normal text-xl md:text-2xl tracking-tighter leading-none">
                Exploring Digital Future.
              </h1>
              <em className="font-serif italic text-primary group-hover:text-accent transition-colors text-sm md:text-base">
                Together.
              </em>
            </Link>

            {/* Desktop Nav */}
            <div className="flex items-center gap-6 md:gap-12">
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-[10px] font-bold tracking-[0.3em] uppercase text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-4 md:gap-8 border-l border-border/40 pl-4 md:pl-8">
                <ThemeToggle />
                <span className="text-xl md:text-2xl font-serif text-primary hidden sm:block">keiver.</span>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMobileOpen((prev) => !prev)}
                  className="md:hidden p-2 rounded-full border border-border hover:bg-surface transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Scroll Progress Bar */}
        <Motion.div
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent origin-left"
          style={{ scaleX }}
        />
      </Motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full h-screen z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map((link, i) => (
              <Motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-4xl font-serif italic text-text-primary hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              </Motion.div>
            ))}

            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-12 text-[10px] font-bold tracking-[0.3em] uppercase text-text-secondary/40"
            >
              keiver. — Exploring Digital Future.
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
