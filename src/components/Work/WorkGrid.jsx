import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";

const projects = [
  { id: 1, title: "kairo-mail-service", link: "/case/vlynk", color: "bg-surface", tags: ["Node.js", "Email"], span: "col-span-1 md:col-span-2 row-span-1" },
  { id: 2, title: "Vlynk Landing Page", link: "/case/vlynk", color: "bg-accent/30 text-accent", tags: ["GSAP", "Brutalism"], span: "col-span-1 md:col-span-2 row-span-1" },
  { id: 3, title: "Open Source", link: "/case/webhook-forge", color: "bg-primary/10", tags: ["Community"], span: "col-span-1 row-span-2" },
  { id: 4, title: "Vlynk SaaS", link: "/case/vlynk", color: "bg-accent/30", tags: ["Engine", "V0.9 Beta"], span: "col-span-1 md:col-span-2 row-span-2" },
  { id: 5, title: "Railway", link: "/case/vlynk", color: "bg-primary/20", tags: ["Deploy"], span: "col-span-1 row-span-1" },
  { id: 6, title: "hookpipe", link: "/case/webhook-forge", color: "bg-surface", tags: ["CLI"], span: "col-span-1 row-span-1" },
  { id: 7, title: "Distributed Systems", link: "/case/vlynk", color: "bg-primary/5", tags: ["Event-Driven"], span: "col-span-1 md:col-span-4 row-span-1" },
];

const WorkGrid = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
        <div className="flex flex-col gap-4 mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">All work</span>
          <h2 className="text-4xl md:text-5xl font-serif text-text-primary">Bento Grid View</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
          {projects.map((project, index) => (
            <Motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
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
              className={`${project.span} ${project.color} rounded-3xl p-8 flex flex-col justify-between group cursor-pointer border border-border/5 hover:border-accent/30 transition-colors shadow-sm relative overflow-hidden`}
            >
              <Link to={project.link} className="w-full h-full flex flex-col justify-between z-10 relative">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-serif font-medium group-hover:translate-x-1 transition-transform">
                    {project.title}
                  </h4>
                  <div className="flex gap-2">
                    {project.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[9px] uppercase tracking-widest text-text-secondary font-bold opacity-80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;
