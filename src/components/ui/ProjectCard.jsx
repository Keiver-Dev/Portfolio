import { motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({
  title,
  description,
  visualContent,
  caseStudyLink = "/",
  isReversed = false,
  type = "real",
  index
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <Motion.div
      variants={itemVariants}
      className="group py-24 md:py-32 first:pt-0 border-b border-border/30 last:border-0"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center`}>
        
        {/* Content Side */}
        <div className={`flex flex-col gap-12 ${isReversed ? 'lg:order-last' : ''}`}>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-bold tracking-[0.4em] text-accent uppercase font-mono">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="h-px w-12 bg-border/60" />
              {type === "real" ? (
                <span className="text-[9px] font-bold tracking-[0.3em] text-text-secondary/50 uppercase">
                  Production Build
                </span>
              ) : (
                <span className="text-[9px] font-bold tracking-[0.3em] text-text-secondary/50 uppercase">
                  Technical Concept
                </span>
              )}
            </div>

            <h3 className="text-6xl md:text-8xl font-serif tracking-tighter text-text-primary leading-[0.9]">
              {title}
            </h3>
          </div>

          <div className="flex flex-col gap-8 max-w-md">
            <p className="text-lg text-text-secondary leading-relaxed">
              {description}
            </p>
            
            <Link
              to={caseStudyLink}
              className="group/btn relative inline-flex items-center gap-4 text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-300"
            >
              <span className="relative z-10 text-text-primary group-hover/btn:text-accent transition-colors">
                Explore The Case
              </span>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover/btn:border-accent group-hover/btn:bg-accent/5 transition-all">
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Visual Side */}
        <div className="relative aspect-video lg:aspect-square bg-surface/50 overflow-hidden group/visual">
          <Motion.div 
            className="w-full h-full flex items-center justify-center p-4 lg:p-6"
          >
            {visualContent}
          </Motion.div>
          {/* Glass Overlay for depth */}
          <div className="absolute inset-0 pointer-events-none border border-white/5" />
          <div className="absolute inset-0 bg-linear-to-tr from-accent/5 to-transparent opacity-0 group-hover/visual:opacity-100 transition-opacity duration-700" />
        </div>
      </div>
    </Motion.div>
  );
};

export default ProjectCard;
