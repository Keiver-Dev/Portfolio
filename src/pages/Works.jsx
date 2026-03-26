import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AllWorksGrid from "@/components/sections/AllWorksGrid";
import { motion as Motion } from "framer-motion";

const Works = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 md:pt-32 bg-background">
      <Header />
      
      {/* Works Hero */}
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24 mb-12">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40 text-text-primary">Archive</span>
            <div className="h-px w-12 bg-border"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-text-primary tracking-tight">
            All Works<span className="text-accent">.</span>
          </h1>
          <p className="max-w-xl text-sm md:text-base text-text-secondary leading-relaxed text-balance">
            A comprehensive index of engineering systems, open-source tooling, and conceptual design prototypes I&apos;ve built over the years.
          </p>
        </Motion.div>
      </div>

      <div className="border-t border-border/40">
        <AllWorksGrid />
      </div>
      
      <Footer />
    </div>
  );
};

export default Works;
