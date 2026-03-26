import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-surface border border-border flex items-center px-1 group cursor-pointer overflow-hidden transition-colors hover:border-accent/40"
      aria-label="Toggle Theme"
    >
      <Motion.div
        layout
        className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground z-10"
        animate={{
          x: theme === "dark" ? 28 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <AnimatePresence mode="wait">
          {theme === "light" ? (
            <Motion.div
              key="sun"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={12} />
            </Motion.div>
          ) : (
            <Motion.div
              key="moon"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={12} />
            </Motion.div>
          )}
        </AnimatePresence>
      </Motion.div>
      
      {/* Background Labels */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
        <Sun size={10} className={theme === 'light' ? 'invisible' : 'visible'} />
        <Moon size={10} className={theme === 'dark' ? 'invisible' : 'visible'} />
      </div>
    </button>
  );
};

export default ThemeToggle;
