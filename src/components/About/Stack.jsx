import { motion as Motion } from "framer-motion";
import { ArrowRight, Book, Pencil } from "lucide-react";

const Stack = () => {
  const stackCategories = [
    {
      name: "Backend & Systems",
      items: ["Node.js", "Express", "PostgreSQL", "Redis", "Socket.io", "REST APIs"]
    },
    {
      name: "Frontend & Integration",
      items: ["React 19", "Next.js", "Tailwind CSS v4", "GSAP", "Framer Motion", "Type Safety"]
    },
    {
      name: "Infrastructure & Tools",
      items: ["Railway", "Vercel", "Cloudflare R2", "GitHub Actions", "Docker", "CI/CD"]
    }
  ];

  return (
    <section className="py-40 bg-surface/30 relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,2fr] gap-20 lg:gap-40">
          
          {/* Left Column: Tech List */}
          <div className="flex flex-col gap-20">
            <div className="flex items-start gap-4">
              <h2 className="text-8xl md:text-9xl font-serif tracking-tighter text-text-primary leading-none">
                Stack
              </h2>
              <div className="mt-8 p-1.5 rounded-lg bg-surface border border-border">
                <Book size={14} className="opacity-40" />
              </div>
            </div>

            <div className="flex flex-col gap-16">
              {stackCategories.map((cat, idx) => (
                <div key={idx} className="flex flex-col gap-8">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 border-b border-border pb-4 w-fit">
                    {cat.name}
                  </span>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-y-4 gap-x-12">
                    {cat.items.map((item, i) => (
                      <Motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (idx * 0.1) + (i * 0.05) }}
                        className="flex items-center gap-4 group cursor-pointer"
                      >
                        <div className="w-1 h-1 rounded-full bg-primary/20 group-hover:bg-accent group-hover:scale-150 transition-all" />
                        <span className="text-lg md:text-xl text-text-secondary group-hover:text-text-primary transition-colors font-serif italic">
                          {item}
                        </span>
                      </Motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Editorial */}
          <div className="flex flex-col gap-16 pt-4">
            <div className="flex flex-col gap-8">
              <h3 className="text-4xl md:text-7xl font-serif font-medium leading-[1.05] text-text-primary max-w-2xl">
                Engineering <em className="italic text-accent">Reliability</em> at scale.
              </h3>
              <div className="flex items-center gap-6">
                 <span className="text-xs font-mono text-primary/60 uppercase tracking-[0.3em] font-bold">
                  v0.9.2-beta focus
                </span>
                <div className="h-px w-24 bg-border" />
              </div>
            </div>

            <div className="flex flex-col gap-12 max-w-2xl border-l border-border pl-12 py-4">
              <p className="text-3xl font-serif italic text-text-secondary leading-snug opacity-90">
                "No AI, no manual rules — pure deterministic logic."
              </p>
              
              <div className="flex flex-col gap-8">
                <p className="text-xl text-text-secondary leading-relaxed">
                  I specialize in building complex asynchronous systems like the Vlynk Context Engine. 
                  My focus is on strict data hierarchies and high-reliability backend services 
                  that scale beyond just the surface level.
                </p>
                <p className="text-xl text-text-secondary leading-relaxed">
                  Whether it's auditing webhook security for Webhook-forge or crafting 
                  "technical brutalist" landing pages, I bridge the gap between 
                  hardcore system logic and high-end visual execution.
                </p>
              </div>
            </div>

            <button className="group flex items-center gap-4 bg-transparent text-primary hover:text-accent font-bold self-start transition-all tracking-widest text-xs">
              EXPLORE THE CORE LOGIC <ArrowRight size={16} className="group-hover:translate-x-4 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stack;
