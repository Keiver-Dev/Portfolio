import { motion as Motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const FeaturedWork = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const projects = [
    {
      title: "Vlynk App",
      description: "SaaS 'Active Context Engine' for dev teams. Deterministic context propagation engine, event-driven by GitHub. v0.9.2-beta, 506/506 tests passing.",
      caseStudyLink: "/case/vlynk",
      visualContent: (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-12 bg-background overflow-hidden group">
          <div className="flex flex-col gap-6 w-full max-w-md z-10">
            <div className="h-4 w-32 bg-white/20 rounded-full group-hover:bg-accent/40 transition-colors" />
            <div className="h-32 w-full bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-50" />
              <div className="w-12 h-12 rounded-full border-4 border-accent animate-pulse shadow-[0_0_20px_rgba(247,181,56,0.5)]" />
            </div>
            <div className="space-y-3 opacity-60">
              <div className="h-2 w-full bg-white/10 rounded-full" />
              <div className="h-2 w-3/4 bg-white/10 rounded-full" />
            </div>
            <div className="flex gap-3">
              {["SPACE", "FOLDER", "LIST", "TASK"].map((t) => (
                <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-mono text-white/40 border border-white/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute top-10 right-10 text-[6rem] font-serif italic text-white/5 pointer-events-none">v0.9.2</div>
        </div>
      ),
    },
    {
      title: "webhook-forge",
      description: "Open source webhook inspection platform. Includes hookpipe (CLI tunnel). Audited for security (SSRF, WebSocket Auth, SQL Injection).",
      caseStudyLink: "/case/webhook-forge",
      isReversed: true,
      visualContent: (
        <div className="relative w-full h-full bg-[#1a1c18] p-8 lg:p-12 flex flex-col gap-6 text-white font-mono text-xs group">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-4 opacity-40">hookpipe --tunnel</span>
          </div>
          <div className="space-y-3 opacity-90 relative z-10">
            <p className="text-accent">$ hookpipe listen --port 3000</p>
            <p className="flex items-center gap-2">
              <span className="text-[#27c93f] tracking-tighter">[OK]</span>
              <span className="opacity-60">Checking local server...</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#27c93f] tracking-tighter">[OK]</span>
              <span className="opacity-60">Establishing tunnel...</span>
            </p>
            <div className="p-3 bg-white/5 rounded border border-white/5 mt-4">
              <p className="text-accent underline">https://forge.io/t/keiver</p>
            </div>
            <div className="pt-4 flex items-center gap-3 text-white/30 group-hover:text-[#27c93f]/40 transition-colors">
              <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>Intercepting POST /webhooks/stripe</span>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-5 text-[10rem] font-black opacity-[0.03] pointer-events-none tracking-tighter group-hover:translate-x-10 transition-transform duration-1000">
            FORGE
          </div>
          <div className="absolute inset-0 bg-linear-to-tr from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      ),
    }
  ];

  return (
    <section className="py-24 flex flex-col gap-16 max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
      <Motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center justify-between border-b border-border pb-8"
      >
        <span className="text-xs font-medium tracking-[0.3em] uppercase opacity-60">Featured Work</span>
        <span className="text-xs font-medium tracking-[0.3em] uppercase opacity-40">Selected Systems</span>
      </Motion.div>

      <Motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col"
      >
        {projects.map((project, index) => (
          <Motion.div key={index} variants={fadeUp}>
            <ProjectCard {...project} />
          </Motion.div>
        ))}
      </Motion.div>
    </section>
  );
};

export default FeaturedWork;
