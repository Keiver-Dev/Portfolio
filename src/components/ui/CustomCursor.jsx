import { useEffect } from "react";
import { motion as Motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const CustomCursor = () => {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  
  // Use a MotionValue for variant index: 0=default, 1=hover, 2=text
  const variantIndex = useMotionValue(0);
  const opacity = useMotionValue(0);

  const ringX = useSpring(dotX, { damping: 25, stiffness: 180 });
  const ringY = useSpring(dotY, { damping: 25, stiffness: 180 });

  // Transform variantIndex to visual properties
  const dotScale = useTransform(variantIndex, [0, 1, 2], [1, 0, 1]);
  const ringScale = useTransform(variantIndex, [0, 1, 2], [1, 1.5, 1.2]);
  const ringBorderWidth = useTransform(variantIndex, [0, 1, 2], ["2px", "2px", "1px"]);
  
  const ringBorderColor = useTransform(variantIndex, [0, 1, 2], [
    "color-mix(in srgb, var(--color-accent) 40%, transparent)",
    "var(--color-accent)",
    "color-mix(in srgb, var(--color-accent) 40%, transparent)"
  ]);
  
  const ringBg = useTransform(variantIndex, [0, 1, 2], [
    "transparent",
    "color-mix(in srgb, var(--color-accent) 15%, transparent)",
    "transparent"
  ]);

  useEffect(() => {
    const moveCursor = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      
      if (opacity.get() === 0) opacity.set(1);

      const el = e.target.closest("a, button, [role='button'], .cursor-pointer");
      if (el) {
        if (variantIndex.get() !== 1) variantIndex.set(1);
      } else if (e.target.closest("p, span, h1, h2, h3")) {
        if (variantIndex.get() !== 2) variantIndex.set(2);
      } else {
        if (variantIndex.get() !== 0) variantIndex.set(0);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [dotX, dotY, opacity, variantIndex]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* DOT */}
      <Motion.div
        style={{ translateX: dotX, translateY: dotY, opacity, left: -4, top: -4 }}
        className="fixed pointer-events-none z-9999"
      >
        <Motion.div
          style={{ scale: dotScale }}
          className="w-2 h-2 rounded-full bg-accent"
        />
      </Motion.div>

      {/* RING */}
      <Motion.div
        style={{ translateX: ringX, translateY: ringY, opacity, left: -16, top: -16 }}
        className="fixed pointer-events-none z-9998"
      >
        <Motion.div
          style={{ 
            scale: ringScale, 
            borderWidth: ringBorderWidth,
            borderColor: ringBorderColor,
            backgroundColor: ringBg
          }}
          className="w-8 h-8 rounded-full border border-solid transition-colors duration-200"
        />
      </Motion.div>
    </>
  );
};

export default CustomCursor;