import { useParams, Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Cpu,
  Shield,
  Zap,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/data/projects";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/* ─── animation presets ─────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

const CaseStudy = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center gap-6">
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary/40">404</span>
        <h1 className="text-5xl font-serif">Project not found</h1>
        <Link to="/" className="text-primary hover:underline font-bold text-sm tracking-widest uppercase">
          Return to Explorer
        </Link>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const process = project.process;
  const learnings = project.learnings;

  return (
    <div className="flex flex-col w-full min-h-screen bg-background pt-24">
      <Header />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-16 pb-28 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">

          {/* back link */}
          <Motion.div {...fadeUp(0)}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-text-secondary hover:text-primary transition-colors mb-14"
            >
              <ArrowLeft size={14} /> Back to Projects
            </Link>
          </Motion.div>

          {/* title row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-6">
            <Motion.div className="flex flex-col gap-3 max-w-4xl" {...fadeUp(0.08)}>
              {/* project number badge */}
              <span className="text-[10px] font-bold tracking-[0.35em] text-primary/40 uppercase">
                {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>

              <h1 className="text-7xl md:text-[10rem] font-serif tracking-tighter text-text-primary leading-[0.88]">
                {project.title}
              </h1>

              <p className="text-xl text-primary font-mono opacity-50 uppercase tracking-widest mt-2">
                {project.subtitle}
              </p>
            </Motion.div>

            {/* CTA buttons — only shown when links are available */}
            {(project.links?.github || project.links?.live) && (
              <Motion.div className="flex flex-wrap items-center gap-3 shrink-0" {...fadeUp(0.16)}>
                {project.links?.github && (
                  project.links.github.startsWith("http") ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View source on GitHub"
                      className="p-4 rounded-full bg-surface border border-border hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
                    >
                      <GithubIcon size={20} />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface border border-border/50 text-text-secondary/60 cursor-not-allowed select-none">
                      <GithubIcon size={18} />
                      <span className="text-sm font-bold tracking-wide">{project.links.github}</span>
                    </div>
                  )
                )}
                {project.links?.live && (
                  project.links.live.startsWith("http") ? (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full font-bold text-sm tracking-wide hover:shadow-xl hover:shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      LIVE DEMO <ExternalLink size={16} />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface border border-border/50 text-text-secondary/60 cursor-not-allowed select-none">
                      <ExternalLink size={16} />
                      <span className="text-sm font-bold tracking-wide">{project.links.live}</span>
                    </div>
                  )
                )}
              </Motion.div>
            )}
          </div>

          {/* ── Stats bar ── */}
          <Motion.div
            {...fadeUp(0.22)}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40 border-y border-border/40"
          >
            {project.stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 py-8 md:px-10 first:pl-0 last:pr-0">
                <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-text-secondary/40">
                  {stat.label}
                </span>
                <span className="text-3xl font-serif italic text-text-primary">{stat.value}</span>
              </div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* ── Overview + Challenge/Solution ─────────────────── */}
      <section className="py-24 bg-surface/30">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24 flex flex-col gap-28">

          {/* Overview */}
          <Motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-12 lg:gap-24 items-start"
          >
            <Motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} className="flex flex-col gap-3 lg:sticky lg:top-24">
              <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-primary/50">01 — Overview</span>
              <h2 className="text-4xl font-serif leading-tight">The Context</h2>
            </Motion.div>

            <div className="flex flex-col gap-8 w-full max-w-3xl">
              <Motion.p
                variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
                className="text-xl md:text-2xl text-text-secondary leading-relaxed"
              >
                {project.overview}
              </Motion.p>
              
              {project.notBuiltReason && (
                <Motion.div
                  variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}
                  className="p-6 bg-surface border border-accent/20 rounded-2xl flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold tracking-widest uppercase text-accent">Why I didn't build this (yet)</span>
                    <p className="text-sm text-text-secondary/90 leading-relaxed font-mono">{project.notBuiltReason}</p>
                  </div>
                </Motion.div>
              )}
            </div>
          </Motion.div>

          {/* Challenge & Solution cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="p-10 md:p-14 bg-surface rounded-[2.5rem] border border-border shadow-sm flex flex-col gap-7"
            >
              <div className="w-11 h-11 rounded-2xl bg-accent/15 flex items-center justify-center text-accent">
                <Shield size={22} />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-text-secondary/40">Challenge</span>
                <h3 className="text-3xl font-serif">The Problem</h3>
              </div>
              <p className="text-lg text-text-secondary leading-relaxed">{project.challenge}</p>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="p-10 md:p-14 bg-primary text-primary-foreground rounded-[2.5rem] shadow-2xl shadow-primary/20 flex flex-col gap-7"
            >
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
                <Zap size={22} className="text-accent" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-white/30">
                  {project.type === "concept" ? "Proposed Approach" : "Solution"}
                </span>
                <h3 className="text-3xl font-serif">
                  {project.type === "concept" ? "System Design" : "Technical Answer"}
                </h3>
              </div>
              <p className="text-lg opacity-75 leading-relaxed">
                {project.type === "concept" ? project.proposedApproach : project.solution}
              </p>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* ── Architecture ──────────────────────────────────── */}
      <section className="py-28 border-t border-border/30">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24 flex flex-col gap-16">

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-primary/50">02 — Systems Design</span>
            <h2 className="text-5xl md:text-6xl font-serif">Core Architecture</h2>
          </Motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-12 items-center">
            {/* architecture visual */}
            <Motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-video bg-[#111310] rounded-[2.5rem] overflow-hidden flex items-center justify-center group cursor-default"
            >
              {/* grid bg */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="border border-white/3 group-hover:border-white/[0.07] transition-colors duration-700" />
                ))}
              </div>

              {/* center icon */}
              <div className="relative flex flex-col items-center gap-5 z-10">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl animate-pulse" />
                  <div className="w-20 h-20 rounded-full border-2 border-accent/60 flex items-center justify-center relative">
                    <Cpu size={36} className="text-accent" />
                  </div>
                </div>
                <span className="text-accent font-mono text-xs tracking-[0.3em] uppercase">
                  {project.architecture.type}
                </span>
              </div>

              {/* decorative large text */}
              <span className="absolute bottom-8 right-8 text-[8rem] font-black text-white/4 leading-none tracking-tighter pointer-events-none select-none">
                SYS
              </span>
            </Motion.div>

            {/* right column */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="flex flex-col gap-10"
            >
              <p className="text-lg text-text-secondary leading-relaxed border-l-2 border-accent pl-7">
                {project.architecture.description}
              </p>

              {/* tech stack */}
              <div className="flex flex-col gap-4">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-text-secondary/40">Stack</span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-surface border border-border rounded-full text-xs font-bold tracking-widest text-text-secondary hover:border-primary hover:text-primary transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* ── Process timeline ──────────────────────────────── */}
      <section className="py-24 bg-surface/30 border-t border-border/30">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24 flex flex-col gap-16">

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-primary/50">03 — Process</span>
            <h2 className="text-5xl font-serif">How It Was Built</h2>
          </Motion.div>

          <Motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {process.map((step, i) => (
              <Motion.div
                key={i}
                variants={{ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
                className="relative p-8 rounded-3xl border border-border/60 bg-background hover:border-primary/30 transition-colors group"
              >
                <span className="absolute -top-4 left-8 text-[10px] font-bold tracking-[0.3em] uppercase bg-background px-3 text-primary/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-xl font-serif mb-3 mt-1 group-hover:text-primary transition-colors">{step.phase}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>

      {/* ── Key Learnings ─────────────────────────────────── */}
      <section className="py-24 border-t border-border/30">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-16 items-start">

            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-3 lg:sticky lg:top-24"
            >
              <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-primary/50">04 — Reflection</span>
              <h2 className="text-4xl font-serif leading-tight">Key Learnings</h2>
              <div className="w-10 h-10 rounded-2xl bg-accent/15 flex items-center justify-center text-accent mt-4">
                <Lightbulb size={20} />
              </div>
            </Motion.div>

            <Motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-col gap-5"
            >
              {learnings.map((item, i) => (
                <Motion.div
                  key={i}
                  variants={{ initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                  className="flex items-start gap-5 p-8 rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-surface/50 transition-all group"
                >
                  <CheckCircle2 size={20} className="text-primary/40 group-hover:text-primary transition-colors mt-0.5 shrink-0" />
                  <p className="text-lg text-text-secondary leading-relaxed">{item}</p>
                </Motion.div>
              ))}
            </Motion.div>
          </div>
        </div>
      </section>

      {/* ── Next Project ──────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to={`/case/${nextProject.id}`}
              className="group flex flex-col md:flex-row items-center justify-between gap-12 p-14 md:p-20 bg-surface rounded-[4rem] border border-border hover:bg-primary transition-all duration-700 overflow-hidden relative"
            >
              {/* background decoration */}
              <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-accent/10 group-hover:bg-accent/5 transition-colors duration-700 pointer-events-none" />

              <div className="flex flex-col gap-4 text-center md:text-left relative z-10">
                <span className="text-[9px] font-bold tracking-[0.35em] uppercase opacity-40 group-hover:text-accent group-hover:opacity-100 transition-all">
                  Next Case Study
                </span>
                <h2 className="text-5xl md:text-7xl font-serif text-text-primary group-hover:text-primary-foreground transition-colors leading-none">
                  {nextProject.title}
                </h2>
                <p className="text-sm text-text-secondary group-hover:text-primary-foreground/60 transition-colors font-mono uppercase tracking-widest mt-1">
                  {nextProject.subtitle}
                </p>
              </div>

              <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground group-hover:bg-accent group-hover:text-primary flex items-center justify-center transition-all duration-500 group-hover:translate-x-3 shrink-0 relative z-10">
                <ArrowRight size={28} />
              </div>
            </Link>
          </Motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudy;