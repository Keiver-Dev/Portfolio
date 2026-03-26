import { motion as Motion } from "framer-motion";
import { Mail, Briefcase } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";

const ease = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const Hero = () => {
  const links = [
    { label: "Send me an email", href: "mailto:contact@keiverluna.com", icon: <Mail size={18} /> },
    { label: "Browse my work history", href: "#work", icon: <Briefcase size={18} /> },
    { label: "Explore my Github", href: "https://github.com/Keiver-Dev", icon: <GithubIcon size={18} /> },
    { label: "Connect on LinkedIn", href: "https://www.linkedin.com/in/keiver-luna/", icon: <LinkedInIcon size={18} /> },
  ];

  return (
    <Motion.section
      className="flex flex-col justify-center min-h-[calc(100vh-9rem)] w-full py-16 lg:py-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-24 items-end w-full">

        {/* ── Left Column: Massive Serif Name & Bio ── */}
        <div className="flex flex-col gap-12 lg:gap-20">

          <Motion.h1
            variants={itemVariants}
            className="text-[5rem] md:text-[8rem] lg:text-[11rem] font-serif tracking-tighter leading-[0.85] text-text-primary"
          >
            Keiver<br />
            <span className="text-secondary font-serif">Luna</span>
          </Motion.h1>

          <Motion.div variants={itemVariants} className="flex flex-col gap-8 max-w-xl">
            <p className="text-2xl md:text-[1.75rem] font-serif text-text-secondary leading-snug">
              <span className="text-accent">Full-stack developer. </span>Frontend roots, backend obsession. I build APIs, real-time systems, and the infrastructure that keeps products running.
            </p>
          </Motion.div>
        </div>

        {/* ── Right Column: Start Links List ── */}
        <div className="flex justify-start lg:justify-end pb-4 lg:pb-12">
          <Motion.div
            variants={itemVariants}
            className="flex flex-col gap-8 w-full max-w-sm"
          >
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-text-secondary/60">
              Where you can start
            </span>

            <div className="flex flex-col gap-5">
              {links.map((link, idx) => (
                <Motion.a
                  key={idx}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : "_self"}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
                  className="group flex items-center gap-5"
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <div className="w-12 h-12 shrink-0 rounded-[0.8rem] border border-border flex items-center justify-center text-text-secondary group-hover:bg-surface group-hover:border-primary/20 group-hover:text-primary transition-colors">
                    {link.icon}
                  </div>
                  <span className="font-serif italic text-xl md:text-2xl text-text-secondary group-hover:text-primary transition-colors">
                    {link.label}
                  </span>
                </Motion.a>
              ))}
            </div>
          </Motion.div>
        </div>

      </div>
    </Motion.section>
  );
};

export default Hero;
