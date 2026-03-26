import { projects } from "@/data/projects";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";

const AllWorksGrid = () => {
  const renderProjectCard = (project, index) => (
    <Motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      whileHover={{ scale: 0.98 }}
      className={`rounded-3xl p-8 flex flex-col justify-between group cursor-pointer border border-border/10 hover:border-accent/30 transition-colors shadow-sm relative overflow-hidden bg-surface`}
    >
      <Link to={`/case/${project.id}`} className="w-full h-full flex flex-col justify-between z-10 relative">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-full bg-text-primary/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>
          {/* Type badge */}
          {project.type === "real" ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-[9px] uppercase tracking-widest text-accent font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Real
            </div>
          ) : (
            <div className="px-3 py-1 rounded-full border border-border/20 text-[9px] uppercase tracking-widest text-text-secondary/50 font-bold">
              Concept
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-2xl font-serif font-medium group-hover:translate-x-2 transition-transform duration-300 text-text-primary">
            {project.title}
          </h4>
          <p className="text-xs text-text-secondary line-clamp-2 pr-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.technologies?.slice(0, 3).map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-text-primary/5 hover:bg-text-primary/10 rounded font-mono text-[9px] uppercase tracking-widest text-text-primary/60 hover:text-text-primary cursor-default hover:-translate-y-0.5 transition-all duration-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </Motion.div>
  );

  const renderConceptCard = (project, index) => (
    <Motion.div
      key={project.id}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex flex-col md:flex-row md:items-start gap-4 p-6 border-b border-border/30 hover:bg-surface/30 transition-colors"
    >
      <div className="flex-1 flex flex-col gap-2">
        <Link to={`/case/${project.id}`} className="text-xl font-serif text-text-primary hover:text-accent transition-colors flex items-center gap-2">
          {project.title}
          <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
        </Link>
        <p className="text-sm text-text-secondary/70 max-w-2xl leading-relaxed">{project.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:justify-end shrink-0 md:w-1/3 pt-1 md:pt-0">
        <span className="px-2 py-1 rounded border border-border/30 text-[9px] uppercase tracking-widest text-text-secondary/50 font-bold bg-background">
          Idea
        </span>
        {project.technologies?.slice(0, 3).map((tech, i) => (
          <span key={i} className="text-[10px] uppercase tracking-widest text-text-primary/40">
            {tech}{i < 2 && project.technologies.length > 1 ? ',' : ''}
          </span>
        ))}
      </div>
    </Motion.div>
  );

  return (
    <section className="py-24 bg-background min-h-screen">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24 flex flex-col gap-24">
        
        {/* Built Systems */}
        <div className="flex flex-col gap-10 border-t border-border/40 pt-10 mt-10">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl md:text-5xl font-serif">Built Systems</h2>
            <p className="text-text-secondary text-base">Production-ready applications and technical tools.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] gap-6">
            {projects.filter(p => p.type === "real").map((project, index) => renderProjectCard(project, index))}
          </div>
        </div>

        {/* Concept Explorations */}
        <div className="flex flex-col gap-10 border-t border-border/40 pt-16">
          <div className="flex flex-col gap-3 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-serif text-text-primary/80">Thinking Out Loud</h2>
            <p className="text-text-secondary/60 text-sm leading-relaxed text-balance">
              Architectural drafts, unbuilt ideas, and system designs I iterate on.
              Not everything needs to be code immediately—some problems are solved on paper first.
            </p>
          </div>
          <div className="flex flex-col opacity-90">
            {projects.filter(p => p.type === "concept").map((project, index) => renderConceptCard(project, index))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AllWorksGrid;
