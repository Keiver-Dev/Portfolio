import { useState, useEffect } from "react";
import { motion as Motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Menu } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const ease = [0.22, 1, 0.36, 1];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { name: "About",  path: "/About" },
    { name: "Work", path: "/works" },
    { name: "Stack", path: "/#stack" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <div 
          className={`w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled
              ? "py-4 bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-sm"
              : "py-6 md:py-8 bg-transparent border-b border-transparent"
          }`}
        >
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
            <nav className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="group flex flex-col" onClick={() => setMobileOpen(false)}>
              <Motion.h1
                className="font-normal text-xl md:text-2xl tracking-tighter leading-none"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                Frontend ships.
              </Motion.h1>
              <Motion.em
                className="font-serif italic text-primary group-hover:text-accent transition-colors duration-300 text-sm md:text-base"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease }}
              >
                Backend holds.
              </Motion.em>
            </Link>

            {/* Desktop Nav */}
            <div className="flex items-center gap-6 md:gap-12">
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link, i) => (
                  <Motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease }}
                  >
                    <Link
                      to={link.path}
                      className="text-[10px] font-bold tracking-[0.3em] uppercase text-text-secondary/60 hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </Motion.div>
                ))}
              </div>

              <Motion.div
                className="flex items-center gap-4 md:gap-8 border-l border-border/40 pl-4 md:pl-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
              >
                <ThemeToggle />
                <span className="text-xl md:text-2xl font-serif text-primary hidden sm:block">
                  keiver.
                </span>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMobileOpen((prev) => !prev)}
                  className="md:hidden p-2 rounded-full border border-border hover:bg-surface transition-colors"
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <Motion.span
                      key={mobileOpen ? "close" : "open"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15, ease }}
                      className="flex"
                    >
                      {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </Motion.span>
                  </AnimatePresence>
                </button>
              </Motion.div>
            </div>

          </nav>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <Motion.div
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent origin-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          style={{ scaleX }}
        />
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            className="fixed inset-0 z-40 bg-background/97 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map((link, i) => (
              <Motion.div
                key={link.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease }}
              >
                <Link
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-4xl font-serif italic text-text-primary hover:text-accent transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </Motion.div>
            ))}

            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.32 }}
              className="absolute bottom-10 text-[9px] font-bold tracking-[0.35em] uppercase text-text-secondary/30"
            >
              keiver. — Frontend ships. Backend holds.
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;