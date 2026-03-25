import { motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GithubIcon, LinkedInIcon, XIcon } from "@/components/Icons";

// Shared easing — same bezier used everywhere in the project
const ease = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const Hero = () => {
  return (
    <Motion.section
      className="flex flex-col justify-center h-full w-full pt-4 pb-24"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Section label — consistent with About, Stack, FeaturedWork */}
      <Motion.div variants={itemVariants} className="flex items-center gap-4 mb-10">
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary/60">
          Introduction
        </span>
        <div className="h-px w-20 bg-border" />
      </Motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ── Left Column ── */}
        <div className="flex flex-col gap-10">
          {/* Name + Role */}
          <div className="flex flex-col gap-4">
            <Motion.h1
              variants={itemVariants}
              className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none"
            >
              Keiver{" "}
              <span className="text-secondary tracking-normal">Luna</span>
            </Motion.h1>

            <Motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-text-secondary text-balance"
            >
              Full Stack{" "}
              <em className="font-serif italic text-accent not-italic">Developer</em>
            </Motion.h2>
          </div>

          {/* Bio */}
          <Motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-text-secondary leading-relaxed text-balance max-w-xl"
          >
            Backend-focused full-stack developer. I build the engines, APIs, and
            infrastructure that power products — from distributed event queues
            and webhook systems to real-time sockets and airtight database schemas.
          </Motion.p>

          {/* CTAs */}
          <Motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a
              href="mailto:contact@keiverluna.com"
              className="group flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium transition-all hover:gap-4 hover:pr-6 active:scale-95 shadow-lg shadow-primary/20"
            >
              Let's Talk
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              className="px-8 py-4 rounded-full font-medium border border-border hover:bg-surface transition-colors active:scale-95"
            >
              View Work
            </a>
          </Motion.div>

          {/* Social Links — Motion-animated, consistent with rest of project */}
          <Motion.div variants={itemVariants} className="flex items-center gap-6 pt-2">
            {[
              { href: "https://github.com/keiverluna", icon: <GithubIcon size={24} /> },
              { href: "https://linkedin.com/in/keiverluna", icon: <LinkedInIcon size={24} /> },
              { href: "https://x.com/keiverluna", icon: <XIcon size={24} /> },
            ].map(({ href, icon }) => (
              <Motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary"
                whileHover={{ y: -4, color: "var(--primary)" }}
                transition={{ duration: 0.2, ease }}
              >
                {icon}
              </Motion.a>
            ))}
          </Motion.div>
        </div>

        {/* ── Right Column: Visual Card ── */}
        <Motion.div
          variants={itemVariants}
          className="hidden lg:flex justify-end relative"
        >
          <div className="relative w-full aspect-square max-w-md group">
            {/* Decorative layers */}
            <div className="absolute inset-0 bg-primary/5 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0 border border-primary/20 rounded-3xl -rotate-3 group-hover:-rotate-6 transition-transform duration-500" />

            {/* Main image */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-surface border border-border shadow-2xl">
              <img
                src="/Avatar.jpg"
                alt="Keiver Luna"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
            </div>

            {/* Status card — same glassmorphism tokens used in Header */}
            <div className="absolute inset-x-8 -bottom-8 bg-surface/90 backdrop-blur-md border border-border p-6 rounded-2xl shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">
                    Currently Building
                  </span>
                  <span className="font-bold text-sm">Vlynk: Frontend Phase</span>
                  <span className="text-xs text-text-secondary font-serif italic">
                    "Visibility First" · v0.9.2 Beta
                  </span>
                </div>
                {/* Live indicator */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[9px] font-bold tracking-widest uppercase text-text-secondary/60">
                    Live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </Motion.section>
  );
};

export default Hero;
