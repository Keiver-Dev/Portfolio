import { motion as Motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const projects = [
  { id: 1, title: "ellicheck", color: "bg-surface", tags: ["Node.js", "Dev"] },
  { id: 2, title: "New Story", color: "bg-primary/5", tags: ["Creative"] },
  { id: 3, title: "Aggregate Singularity", color: "bg-primary/10", tags: ["Web", "3D"] },
  { id: 4, title: "Overflow", color: "bg-accent", tags: ["Node.js", "WebSocket", "Development", "3D"] },
  { id: 5, title: "TED", color: "bg-primary/20", tags: ["Innovation", "Talks"] },
  { id: 6, title: "aro", color: "bg-surface", tags: ["Retail", "App"] },
  { id: 7, title: "allwhere", color: "bg-primary/5", tags: ["Platform", "API"] },
];

const CarouselItem = ({ project, isActive }) => {
  return (
    <Motion.div
      className="flex flex-col items-center gap-8 min-w-[280px] md:min-w-[360px] snap-center"
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.4,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={`w-full aspect-3/4 rounded-[3rem] shadow-2xl relative overflow-hidden ${project.color} group cursor-pointer`}>
        <Motion.div 
          className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/10" />
      </div>
      
      <div className="flex flex-col items-center gap-4 text-center h-24">
        <h4 className={`text-2xl font-bold tracking-tight transition-all duration-500 ${isActive ? 'text-text-primary translate-y-0' : 'text-text-secondary translate-y-2'}`}>
          {project.title}
        </h4>
        
        <AnimatePresence>
          {isActive && (
            <Motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex flex-wrap justify-center gap-2 max-w-[280px]"
            >
              {project.tags.map((tag, i) => (
                <span key={i} className="text-[9px] uppercase font-bold tracking-[0.2em] bg-white/40 backdrop-blur-md border border-black/5 px-2.5 py-1 rounded-full text-[#616259]">
                  {tag}
                </span>
              ))}
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </Motion.div>
  );
};

const WorkCarousel = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(3);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    
    // Calculate progress for bar
    const progress = scrollLeft / (scrollWidth - clientWidth);
    setScrollProgress(progress);

    // Calculate active index based on scroll position
    const items = containerRef.current.children;
    let closestIndex = 0;
    let minDistance = Infinity;
    const centerX = scrollLeft + clientWidth / 2;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(centerX - itemCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const scrollToIndex = (index) => {
    if (!containerRef.current) return;
    const items = containerRef.current.children;
    if (items[index]) {
      const item = items[index];
      const scrollPos = item.offsetLeft - (containerRef.current.clientWidth / 2) + (item.offsetWidth / 2);
      containerRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Initial centering of active index
    scrollToIndex(3);
  }, []);

  return (
    <section className="py-32 flex flex-col gap-24 overflow-hidden bg-surface/40">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-8xl md:text-9xl font-serif tracking-tight flex items-start gap-4 text-text-primary">
          All work <span className="text-2xl font-sans mt-6 opacity-30 font-light">16</span>
        </h2>
      </div>

      <div className="relative w-full">
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="flex gap-12 overflow-x-auto no-scrollbar snap-x snap-mandatory px-[20vw] md:px-[35vw] pb-20 pt-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <CarouselItem key={project.id} project={project} isActive={index === activeIndex} />
          ))}
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <button 
          onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
          className="group flex items-center gap-3 text-[10px] font-black tracking-[0.2em] bg-background border border-border px-8 py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> BACK
        </button>
        
        <div className="flex-1 max-w-xl h-px bg-border mx-16 relative">
          <Motion.div 
            className="absolute top-[-0.5px] left-0 h-[2px] bg-primary" 
            animate={{ width: `${scrollProgress * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>

        <button 
          onClick={() => scrollToIndex(Math.min(projects.length - 1, activeIndex + 1))}
          className="group flex items-center gap-3 text-[10px] font-black tracking-[0.2em] bg-background border border-border px-8 py-4 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
        >
          NEXT <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default WorkCarousel;
