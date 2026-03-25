import { motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ 
  title, 
  description, 
  visualContent,
  caseStudyLink = "/",
  isReversed = false 
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <Motion.div 
      variants={itemVariants}
      className={`grid grid-cols-1 lg:grid-cols-[1.2fr,2fr] bg-[#1a1c18] rounded-[2.5rem] overflow-hidden min-h-[600px] shadow-2xl mb-12 border border-white/5 ${isReversed ? 'lg:grid-cols-[2fr,1.2fr]' : ''}`}
    >
      {/* Content Side */}
      <div className={`flex flex-col justify-between p-12 lg:p-16 text-white ${isReversed ? 'lg:order-last' : ''}`}>
        <div className="flex flex-col gap-12">
          <h3 className="text-6xl md:text-7xl font-serif tracking-tight text-[#e2e3d9]">
            {title}
          </h3>
          <div className="flex flex-col gap-6">
            <span className="text-xs font-medium tracking-[0.2em] text-[#919288] uppercase">
              From the Case Study
            </span>
            <p className="text-lg text-[#919288] leading-relaxed max-w-sm">
              {description}
            </p>
          </div>
        </div>
        
        <Link 
          to={caseStudyLink}
          className="flex items-center gap-2 text-sm font-medium bg-[#f1f1e6] text-[#1a1c18] px-8 py-4 rounded-full self-start hover:gap-4 transition-all"
        >
          READ CASE STUDY <ArrowRight size={18} />
        </Link>
      </div>

      {/* Visual Side */}
      <div className="bg-surface p-4 lg:p-8 flex items-center justify-center relative overflow-hidden group">
        <div className="w-full h-full rounded-4xl bg-surface shadow-sm flex items-center justify-center overflow-hidden">
          {visualContent}
        </div>
      </div>
    </Motion.div>
  );
};

export default ProjectCard;
