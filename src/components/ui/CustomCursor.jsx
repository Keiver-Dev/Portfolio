import { useEffect, useState } from "react";
import { motion as Motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [variant, setVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringX = useSpring(dotX, { damping: 25, stiffness: 180 });
  const ringY = useSpring(dotY, { damping: 25, stiffness: 180 });

  useEffect(() => {
    const moveCursor = (e) => {
      // El cursor siempre sigue EXACTAMENTE al mouse sin desviarse
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Detectar sobre qué elemento estamos para hacer el cambio visual (ring más grande, etc)
      const el = e.target.closest(
        "a, button, [role='button'], .cursor-pointer"
      );

      if (el) {
        setVariant("hover");
      } else if (e.target.closest("p, span, h1, h2, h3")) {
        setVariant("text");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [isVisible, dotX, dotY]);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <>
      {/* DOT */}
      <Motion.div
        style={{ translateX: dotX, translateY: dotY, left: -4, top: -4 }}
        className={`fixed pointer-events-none z-9999 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <Motion.div
          animate={{
            scale: variant === "hover" ? 0 : 1,
            backgroundColor: "var(--color-accent)",
          }}
          transition={{ duration: 0.12 }}
          className="w-2 h-2 rounded-full"
        />
      </Motion.div>

      {/* RING */}
      <Motion.div
        style={{ translateX: ringX, translateY: ringY, left: -16, top: -16 }}
        className={`fixed pointer-events-none z-9998 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        <Motion.div
          animate={{
            scale:
              variant === "hover"
                ? 1.5
                : variant === "text"
                  ? 1.2
                  : 1,

            borderColor:
              variant === "hover"
                ? "var(--color-accent)"
                : "color-mix(in srgb, var(--color-accent) 40%, transparent)",

            backgroundColor:
              variant === "hover"
                ? "color-mix(in srgb, var(--color-accent) 15%, transparent)"
                : "transparent",

            borderWidth: variant === "text" ? "1px" : "2px",
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="w-8 h-8 rounded-full"
        />
      </Motion.div>
    </>
  );
};

export default CustomCursor;