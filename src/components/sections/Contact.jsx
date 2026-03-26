import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Copy, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("santyluna14@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden" id="contact">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
        <div className="flex flex-col gap-24">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <Motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6 max-w-4xl"
            >
              <h2 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-tighter leading-[0.9]">
                Let's build <br />
                <em className="italic text-accent">extraordinary.</em>
              </h2>
            </Motion.div>

            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3 text-primary-foreground/60 font-mono text-[10px] tracking-widest uppercase lg:pb-4"
            >
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Available for opportunities
              </span>
              <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' })} LOCAL TIME</span>
            </Motion.div>
          </div>

          <Motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full h-px bg-primary-foreground/10"
          />

          {/* Interactive Email Block */}
          <Motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 items-start"
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary-foreground/40 pl-2">
              Drop me a line
            </span>
            
            <a 
              href="mailto:santyluna14@gmail.com"
              onClick={handleCopy}
              className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between w-full rounded-3xl sm:rounded-full bg-primary-foreground/5 hover:bg-primary-foreground/10 border border-primary-foreground/10 hover:border-accent/40 p-8 sm:p-10 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Background fill animation */}
              <div className="absolute inset-0 bg-accent/5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              
              <div className="relative z-10">
                <span className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-primary-foreground group-hover:text-accent transition-colors duration-500">
                  santyluna14@gmail.com
                </span>
              </div>
              
              <div className="relative z-10 mt-6 sm:mt-0 flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em]">
                {copied ? (
                  <span className="text-green-400 font-bold transition-all duration-300">Copied!</span>
                ) : (
                  <span className="text-primary-foreground/30 group-hover:text-primary-foreground/70 transition-colors duration-300">
                    Click to copy
                  </span>
                )}
                
                <div className={`flex items-center justify-center w-14 h-14 rounded-full border transition-all duration-500 ${copied ? 'border-green-400 bg-green-400/10' : 'border-primary-foreground/20 group-hover:border-accent group-hover:bg-accent/10'}`}>
                  {copied ? (
                    <CheckCircle2 size={24} className="text-green-400" />
                  ) : (
                    <Copy size={20} className="text-primary-foreground/60 group-hover:text-accent transition-colors duration-500" />
                  )}
                </div>
              </div>
            </a>
          </Motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
