import { useState, useEffect } from "react";
import { motion as Motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [variant, setVariant] = useState("default");
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const opacity = useMotionValue(0);

  const ringX = useSpring(dotX, { damping: 25, stiffness: 180 });
  const ringY = useSpring(dotY, { damping: 25, stiffness: 180 });

  useEffect(() => {
    const moveCursor = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (opacity.get() === 0) opacity.set(1);

      const target = e.target;
      const isSelectable = target.closest("a, button, [role='button'], .cursor-pointer");
      const isText = target.closest("p, span, h1, h2, h3, li");

      if (isSelectable) {
        setVariant("hover");
      } else if (isText) {
        setVariant("text");
      } else {
        setVariant("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [dotX, dotY, opacity]);

  const variants = {
    default: {
      dot: { scale: 1 },
      ring: { 
        scale: 1, 
        borderWidth: "2px", 
        borderColor: "color-mix(in srgb, var(--color-accent) 40%, transparent)",
        backgroundColor: "transparent"
      }
    },
    hover: {
      dot: { scale: 0 },
      ring: { 
        scale: 1.5, 
        borderWidth: "2px", 
        borderColor: "var(--color-accent)",
        backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)"
      }
    },
    text: {
      dot: { scale: 1 },
      ring: { 
        scale: 1.25, 
        borderWidth: "1px", 
        borderColor: "color-mix(in srgb, var(--color-accent) 30%, transparent)",
        backgroundColor: "transparent"
      }
    }
  };

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <Motion.div
        style={{ translateX: dotX, translateY: dotY, opacity, left: -4, top: -4 }}
        className="fixed pointer-events-none z-9999"
      >
        <Motion.div
          animate={variants[variant].dot}
          className="w-2 h-2 rounded-full bg-accent"
        />
      </Motion.div>

      <Motion.div
        style={{ translateX: ringX, translateY: ringY, opacity, left: -16, top: -16 }}
        className="fixed pointer-events-none z-9998"
      >
        <Motion.div
          animate={variants[variant].ring}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="w-8 h-8 rounded-full border border-solid transition-colors"
        />
      </Motion.div>
    </>
  );
};

export default CustomCursor;