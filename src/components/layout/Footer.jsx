import { motion as Motion } from "framer-motion";
import { GithubIcon, LinkedInIcon, XIcon } from "@/components/ui/Icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 border-t border-border bg-background">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-3xl font-serif text-primary tracking-tighter">keiver.</span>
            <p className="text-xs text-text-secondary uppercase tracking-[0.2em]">
              Frontend ships. Backend holds.
            </p>
          </div>

          {/* Copyright & Credits */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-text-secondary">
              © {currentYear} Keiver Luna. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-text-secondary/40 font-mono uppercase tracking-widest">
              Built with <span className="text-primary/60">React 19</span> & <span className="text-primary/60">Framer Motion</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/Keiver-Dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all transform hover:-translate-y-1 shadow-sm"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/keiver-luna/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all transform hover:-translate-y-1 shadow-sm"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
