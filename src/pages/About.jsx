import { motion as Motion } from "framer-motion";
import { ArrowRight, Terminal, Zap, Shield, BookOpen, Cpu, Coffee } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const About = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-24">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
          <Motion.div {...fadeUp} className="flex flex-col gap-12">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-primary/60">
                The Story
              </span>
              <div className="h-px w-20 bg-border" />
            </div>
            <h1 className="text-7xl md:text-[10rem] font-serif tracking-tighter text-text-primary leading-[0.9]">
              Backend <br />
              <em className="italic text-accent">Systems Engineer.</em>
            </h1>
            <p className="text-2xl md:text-3xl font-serif italic text-text-secondary max-w-3xl leading-snug">
              "I design interfaces. I engineer systems."
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

            <Motion.div
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-12 max-w-2xl"
            >
              <div className="flex flex-col gap-6 text-xl text-text-secondary leading-relaxed">
                <p>
                  Started in frontend — UI, components, interactions.
                </p>
                <p>
                  Then I moved deeper. My foundation was built through hands-on residencies at El Dorado and Trade Squad. Working alongside real product teams taught me what it means to ship under pressure.
                </p>
                <p>
                  <strong className="text-text-primary font-medium">Backend, APIs, real-time systems.</strong> Today I specialize in backend architecture with full stack capabilities — I build the systems that keep products running when things get complicated, and I can handle the frontend when needed. I build from Porto Alegre, fully remote.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border">
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">
                    Location
                  </span>
                  <span className="text-xl font-serif italic">Porto Alegre, RS</span>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">
                    Role
                  </span>
                  <span className="text-xl font-serif italic">Backend Systems Engineer</span>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">
                    Focus
                  </span>
                  <span className="text-xl font-serif italic">Node.js & React</span>
                </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
          <div className="flex flex-col gap-24">
            <Motion.div {...fadeUp} className="flex flex-col gap-8 max-w-4xl">
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-accent">
                Methodology
              </span>
              <h2 className="text-5xl md:text-7xl font-serif tracking-tight leading-none">
                Architecture <em className="italic">First.</em>
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl">
                I build systems on solid foundations — logic drives design, not the
                other way around. The interface is only as good as what's underneath it.
              </p>
            </Motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  title: "Deterministic Code",
                  desc: "Predictable, testable logic. Systems that behave exactly as engineered — no surprises under load.",
                  icon: <Terminal size={24} />,
                },
                {
                  title: "Performance Driven",
                  desc: "Every layer optimized — from database queries to frontend renders. Speed is a feature.",
                  icon: <Zap size={24} />,
                },
                {
                  title: "Security & Scale",
                  desc: "Best practices from day one. Data integrity protected, systems designed for horizontal growth.",
                  icon: <Shield size={24} />,
                },
              ].map((item, i) => (
                <Motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 md:p-12 bg-surface rounded-3xl border border-border hover:border-primary/20 transition-colors flex flex-col gap-8"
                >
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </Motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-32 bg-background relative z-10">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-20">
            <Motion.div {...fadeUp} className="flex flex-col gap-16">
              <div className="flex flex-col gap-6">
                <h2 className="text-4xl font-serif">Behind the Scenes</h2>
                <p className="text-xl text-text-secondary max-w-xl">
                  Outside of shipping code, a few things that keep the engine running.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: "Debugging Style",
                    value: "Logs > Guessing",
                    icon: <Terminal size={18} />,
                  },
                  {
                    label: "Philosophy",
                    value: "If it's not observable, it's broken",
                    icon: <Shield size={18} />,
                  },
                  {
                    label: "Currently Reading",
                    value: "Clean Architecture",
                    icon: <BookOpen size={18} />,
                  },
                  {
                    label: "Fuel",
                    value: "Black coffee & silence",
                    icon: <Coffee size={18} />,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 p-7 rounded-2xl border border-border/50 bg-surface/50"
                  >
                    <div className="text-primary/40 shrink-0">{item.icon}</div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold tracking-widest text-text-secondary opacity-50 uppercase">
                        {item.label}
                      </span>
                      <span className="text-lg font-serif italic">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Motion.div>

            <Motion.div
              {...fadeUp}
              transition={{ delay: 0.3 }}
              className="p-10 md:p-12 bg-primary text-primary-foreground rounded-3xl flex flex-col justify-between gap-12 group"
            >
              <div className="flex flex-col gap-8">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-accent">
                  <Coffee size={32} />
                </div>
                <h3 className="text-4xl font-serif leading-tight">
                  Let&apos;s build something <br />
                  <em className="italic text-accent">extraordinary.</em>
                </h3>
              </div>
              <a
                href="mailto:santyluna14@gmail.com"
                className="flex items-center gap-4 text-xs font-bold tracking-[0.4em] uppercase text-accent group-hover:gap-8 transition-all duration-300"
              >
                LET'S WORK ON SOMETHING REAL <ArrowRight size={18} />
              </a>
            </Motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;