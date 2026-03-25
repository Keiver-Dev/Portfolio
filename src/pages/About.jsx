import { motion as Motion } from "framer-motion";
import { ArrowRight, Cpu, Shield, Zap, Globe, Terminal, BookOpen, Music, Coffee } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import Header from "@/components/Intro/Header";
import Footer from "@/components/Intro/Footer";

const About = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-24">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
          <Motion.div {...fadeUp} className="flex flex-col gap-12">
            <div className="flex items-center gap-4">
               <span className="text-xs font-bold tracking-[0.4em] uppercase text-primary/60">The Story</span>
               <div className="h-px w-20 bg-border" />
            </div>
            <h1 className="text-7xl md:text-[10rem] font-serif tracking-tighter text-text-primary leading-[0.9]">
              Engineering <br />
              <em className="italic text-accent">Digital Futures.</em>
            </h1>
            <p className="text-2xl md:text-3xl font-serif italic text-text-secondary max-w-3xl leading-snug">
              "Building the invisible systems that power the visible world."
            </p>
          </Motion.div>
        </div>
      </section>

      {/* The Trajectory */}
      <section className="py-32 bg-surface/30">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-20">
            <Motion.div {...fadeUp} className="flex flex-col gap-6">
               <h2 className="text-4xl font-serif">The Trajectory</h2>
               <div className="w-12 h-px bg-accent" />
            </Motion.div>
            
            <Motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex flex-col gap-12 max-w-2xl">
              <p className="text-xl text-text-secondary leading-relaxed serif-text">
                My journey is rooted in hardcore system design — building reliable,
                deterministic engines that solve complex coordination and data propagation problems.
                I don't just write code; I engineer systems built to last, scale, and remain
                provably correct under pressure.
              </p>
              <p className="text-xl text-text-secondary leading-relaxed">
                From developing the Vlynk Context Engine to auditing security for open-source 
                inspection platforms, my work is defined by a relentless focus on the "Core". 
                I believe that a beautiful interface is only as good as the deterministic logic 
                that powers it.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-border">
                 <div className="flex flex-col gap-4">
                    <span className="text-xs font-bold tracking-widest text-primary">LOCATION</span>
                    <span className="text-xl font-serif italic">Global / Remote</span>
                 </div>
                 <div className="flex flex-col gap-4">
                    <span className="text-xs font-bold tracking-widest text-primary">ROLE</span>
                    <span className="text-xl font-serif italic">Backend Engineer & Systems Architect</span>
                 </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Visibility First Methodology */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
           <div className="flex flex-col gap-24">
              <Motion.div {...fadeUp} className="flex flex-col gap-8 max-w-4xl">
                 <span className="text-xs font-bold tracking-[0.4em] uppercase text-accent">METHODOLOGY</span>
                 <h2 className="text-5xl md:text-7xl font-serif tracking-tight leading-none">
                    Visibility <em className="italic">First.</em>
                 </h2>
                 <p className="text-xl text-text-secondary max-w-2xl">
                    I advocate for a development philosophy where the system's state is always 
                    observable, verifiable, and triggered by truth—not assumptions.
                 </p>
              </Motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {[
                   { 
                     title: "Deterministic Logic", 
                     desc: "No manual rules. All context is propagated through strict hierarchies and GitHub-driven events.",
                     icon: <Terminal size={24} />
                   },
                   { 
                     title: "Active Context", 
                     desc: "Systems that react in real-time to changes in the repository, ensuring the UI is always a mirror of the source.",
                     icon: <Zap size={24} />
                   },
                   { 
                     title: "Security by Audit", 
                     desc: "Continuous security review cycles to mitigate SSRF, auth leaks, and value poisoning in every layer.",
                     icon: <Shield size={24} />
                   }
                 ].map((item, i) => (
                   <Motion.div 
                     key={i}
                     {...fadeUp}
                     transition={{ delay: i * 0.1 }}
                     className="p-12 bg-surface rounded-[3rem] border border-border hover:border-accent/40 transition-colors flex flex-col gap-8"
                   >
                      <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-serif">{item.title}</h3>
                      <p className="text-text-secondary leading-relaxed">
                        {item.desc}
                      </p>
                   </Motion.div>
                 ))}
              </div>
           </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* Behind the Scenes */}
      <section className="py-32 bg-background relative z-10">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
           <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-20">
              <Motion.div {...fadeUp} className="flex flex-col gap-16">
                 <div className="flex flex-col gap-6">
                    <h2 className="text-4xl font-serif">Behind the Scenes</h2>
                    <p className="text-xl text-text-secondary max-w-xl">
                      Beyond the terminal, I find inspiration in the meticulous craft of physical objects 
                      and the narrative depth of literature.
                    </p>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { label: "Currently Reading", value: "Architecture of Systems", icon: <BookOpen size={18} /> },
                      { label: "Listening to", value: "Minimalist Techno / Ambient", icon: <Music size={18} /> },
                      { label: "Setup", value: "HHKB / Brutalist Minimalist", icon: <Terminal size={18} /> },
                      { label: "Obsession", value: "Deterministic Logic", icon: <Cpu size={18} /> }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 p-8 rounded-3xl border border-border/50 bg-surface/50">
                         <div className="text-primary/40">{item.icon}</div>
                         <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold tracking-widest text-text-secondary opacity-50 uppercase">{item.label}</span>
                            <span className="text-lg font-serif italic">{item.value}</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </Motion.div>

              <Motion.div {...fadeUp} transition={{ delay: 0.3 }} className="p-12 bg-primary text-primary-foreground rounded-[3.5rem] flex flex-col justify-between gap-12 group">
                 <div className="flex flex-col gap-8">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-accent">
                       <Coffee size={32} />
                    </div>
                    <h3 className="text-4xl font-serif leading-tight"> Let's build something <br /><em className="italic text-accent">extraordinary.</em></h3>
                 </div>
                 <a 
                   href="mailto:contact@keiverluna.com"
                   className="flex items-center gap-4 text-xs font-bold tracking-[0.4em] uppercase text-accent group-hover:gap-8 transition-all"
                 >
                    GET IN TOUCH <ArrowRight size={18} />
                 </a>
              </Motion.div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
