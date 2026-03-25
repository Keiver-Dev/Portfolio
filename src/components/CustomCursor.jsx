import { useEffect, useState } from "react";
import { motion as Motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Fast dot — tracks cursor precisely
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Slow ring — lags behind for the premium effect
  const ringX = useSpring(dotX, { damping: 30, stiffness: 200 });
  const ringY = useSpring(dotY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const moveCursor = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], .cursor-pointer');
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, dotX, dotY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Precise dot */}
      <Motion.div
        style={{ translateX: dotX, translateY: dotY, left: -4, top: -4 }}
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <Motion.div
          animate={{
            scale: isHovered ? 0 : 1,
            backgroundColor: "rgba(247, 181, 56, 1)",
          }}
          transition={{ duration: 0.15 }}
          className="w-2 h-2 rounded-full"
        />
      </Motion.div>

      {/* Lagging outer ring */}
      <Motion.div
        style={{ translateX: ringX, translateY: ringY, left: -22, top: -22 }}
        className={`fixed pointer-events-none z-[9998] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <Motion.div
          animate={{
            scale: isHovered ? 1.8 : 1,
            borderColor: isHovered ? "rgba(247,181,56,0.8)" : "rgba(247,181,56,0.4)",
            backgroundColor: isHovered ? "rgba(247,181,56,0.08)" : "transparent",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="w-11 h-11 rounded-full border-2"
        />

      </Motion.div>
    </>
  );
};

export default CustomCursor;
