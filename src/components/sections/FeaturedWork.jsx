import { motion as Motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectCard from "@/components/ui/ProjectCard";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Scenarios ────────────────────────────────────────────────────────────────
const VLYNK_SCENARIOS = [
  {
    id: "pr-merged",
    header: "event · pull_request.merged",
    lines: [
      { t: 0, text: "webhook received", tag: "github", type: "info" },
      { t: 600, text: "validating HMAC signature", tag: "engine", type: "muted" },
      { t: 1100, text: "signature ok", tag: "engine", type: "ok" },
      { t: 1500, text: "resolving dependency graph", tag: "engine", type: "muted" },
      { t: 2000, text: "task:auth-service → unblocked", tag: "context", type: "ok" },
      { t: 2400, text: "task:deploy-script → unblocked", tag: "context", type: "ok" },
      { t: 2800, text: "traversing downstream nodes", tag: "bfs", type: "muted" },
      { t: 3200, text: "task:e2e-tests → unblocked", tag: "context", type: "ok" },
      { t: 4000, text: "4 tasks updated · 0 manual actions", tag: "done", type: "done" },
    ],
  },
  {
    id: "webhook-event",
    header: "event · context.pulse",
    lines: [
      { t: 0, text: "engine:init", tag: "system", type: "info" },
      { t: 500, text: "loading dependency map", tag: "engine", type: "muted" },
      { t: 900, text: "space:vlynk · 12 tasks active", tag: "engine", type: "muted" },
      { t: 1300, text: "dep:resolve PR#48 closed", tag: "context", type: "ok" },
      { t: 1700, text: "is_blocked → false propagated", tag: "bfs", type: "ok" },
      { t: 2100, text: "notifying assigned members", tag: "notify", type: "muted" },
      { t: 2900, text: "state:sync complete", tag: "system", type: "ok" },
      { t: 3300, text: "idle · waiting for event", tag: "engine", type: "done" },
    ],
  },
];

const FORGE_SCENARIOS = [
  {
    id: "ssrf-audit",
    header: "audit · security.scanner",
    lines: [
      { t: 0, text: "starting SSRF audit", tag: "scanner", type: "info" },
      { t: 600, text: "testing internal loopback", tag: "audit", type: "muted" },
      { t: 1100, text: "127.0.0.1 blocked", tag: "firewall", type: "ok" },
      { t: 1500, text: "testing cloud metadata", tag: "audit", type: "muted" },
      { t: 2000, text: "169.254.169.254 blocked", tag: "firewall", type: "ok" },
      { t: 2500, text: "audit complete: 0 vulnerabilities", tag: "done", type: "done" },
    ],
  },
  {
    id: "tunnel-active",
    header: "pipe · hookpipe.tunnel",
    lines: [
      { t: 0, text: "hookpipe listen --port 3000", tag: "cli", type: "info" },
      { t: 500, text: "connecting to forge.io", tag: "tunnel", type: "muted" },
      { t: 1000, text: "tunnel: keiver.forge.io", tag: "tunnel", type: "ok" },
      { t: 1500, text: "POST /webhooks [200]", tag: "pipe", type: "ok" },
      { t: 2000, text: "forwarding -> localhost:3000", tag: "pipe", type: "muted" },
      { t: 2500, text: "state: active", tag: "system", type: "done" },
    ],
  }
];

const TAG_STYLES = {
  github: { color: "var(--accent, #facc15)", bg: "rgba(250,204,21,0.08)" },
  scanner: { color: "#f87171", bg: "rgba(248,113,113,0.08)" },
  audit: { color: "#a3a3a3", bg: "rgba(163,163,163,0.06)" },
  firewall: { color: "var(--accent, #facc15)", bg: "rgba(250,204,21,0.08)" },
  cli: { color: "#60a5fa", bg: "rgba(96,165,250,0.08)" },
  tunnel: { color: "var(--accent, #facc15)", bg: "rgba(250,204,21,0.08)" },
  pipe: { color: "#34d399", bg: "rgba(52,211,153,0.08)" },
  engine: { color: "#a3a3a3", bg: "rgba(163,163,163,0.06)" },
  context: { color: "#60a5fa", bg: "rgba(96,165,250,0.08)" },
  bfs: { color: "#c084fc", bg: "rgba(192,132,252,0.08)" },
  notify: { color: "#fb923c", bg: "rgba(251,146,60,0.08)" },
  ws: { color: "#34d399", bg: "rgba(52,211,153,0.08)" },
  system: { color: "#a3a3a3", bg: "rgba(163,163,163,0.06)" },
  done: { color: "#accent", bg: "rgba(250,204,21,0.08)" },
};

const TYPE_OPACITY = { info: 1, ok: 1, muted: 0.55, done: 1 };

const ProjectConsole = ({ scenarios, title }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);
  const [running, setRunning] = useState(false);
  const timeouts = useRef([]);

  const clearAll = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const runScenario = useCallback((idx) => {
    clearAll();
    setVisibleLines([]);
    setRunning(true);
    const scenario = scenarios[idx];

    scenario.lines.forEach((line) => {
      const id = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.t);
      timeouts.current.push(id);
    });

    const last = scenario.lines[scenario.lines.length - 1];
    const nextId = setTimeout(() => {
      setRunning(false);
      const next = (idx + 1) % scenarios.length;
      const pauseId = setTimeout(() => {
        setScenarioIdx(next);
      }, 2000);
      timeouts.current.push(pauseId);
    }, last.t + 1500);
    timeouts.current.push(nextId);
  }, [scenarios]);

  useEffect(() => {
    let timer;
    // Wrap entire side effect in a micro-task to avoid React "cascading render" warnings
    timer = setTimeout(() => {
      if (isInView) {
        runScenario(scenarioIdx);
      } else {
        clearAll();
        setVisibleLines([]);
        setRunning(false);
      }
    }, 0);
    
    return () => {
      clearAll();
      if (timer) clearTimeout(timer);
    };
  }, [isInView, scenarioIdx, runScenario]);

  const scenario = scenarios[scenarioIdx];

  return (
    <div
      ref={ref}
      className="w-full h-full flex flex-col font-mono"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
           <Motion.div
            animate={{ opacity: running ? [1, 0.3, 1] : 0.2 }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className={`w-1.5 h-1.5 rounded-full ${running ? 'bg-accent' : 'bg-white/20'}`}
          />
          <span className="text-[10px] text-text-secondary/40 font-black uppercase tracking-widest">
            {title}
          </span>
        </div>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      <Motion.div
        key={scenario.id + "-header"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[9px] text-accent/60 uppercase tracking-[0.2em] mb-4"
      >
        [{scenario.header}]
      </Motion.div>

      <div className="flex-1 overflow-hidden flex flex-col gap-2 justify-end">
        <div className="flex flex-col gap-2">
          {visibleLines.map((line, i) => {
            const tag = TAG_STYLES[line.tag] || TAG_STYLES.system;
            return (
              <Motion.div
                key={`${scenario.id}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: TYPE_OPACITY[line.type] ?? 1, x: 0 }}
                className="flex items-center gap-4 text-[10px]"
              >
                <span className="text-[8px] font-black uppercase tracking-tighter opacity-40 min-w-[60px]" style={{ color: tag.color }}>
                  {line.tag}
                </span>
                <span className="text-text-secondary/80 truncate font-medium">{line.text}</span>
                {line.type === "ok" && <span className="text-accent ml-auto text-[8px] opacity-50">●</span>}
              </Motion.div>
            );
          })}
        </div>
        <Motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.7, ease: "steps(1)" }}
          className="w-1.5 h-3.5 bg-accent/40 mt-2"
        />
      </div>
    </div>
  );
};

const FeaturedWork = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const projects = [
    {
      title: "Vlynk App",
      type: "real",
      description: "SaaS 'Active Context Engine' for dev teams. Deterministic context propagation engine, event-driven by GitHub. v0.9.2-beta, 506/506 tests passing.",
      caseStudyLink: "/case/vlynk",
      visualContent: (
        <div className="w-full h-full">
          <ProjectConsole title="vlynk · context-engine" scenarios={VLYNK_SCENARIOS} />
        </div>
      ),
    },
    {
      title: "webhook-forge",
      type: "real",
      description: "Open source webhook inspection platform. Includes hookpipe (CLI tunnel). Audited for security (SSRF, WebSocket Auth, SQL Injection).",
      caseStudyLink: "/case/webhook-forge",
      isReversed: true,
      visualContent: (
        <div className="w-full h-full">
          <ProjectConsole title="hookpipe · audit-pipeline" scenarios={FORGE_SCENARIOS} />
        </div>
      ),
    }
  ];

  return (
    <section className="py-24 flex flex-col gap-16 max-w-screen-2xl mx-auto w-full px-6 md:px-12 lg:px-24">
      <Motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center justify-between border-b border-border pb-8"
      >
        <span className="text-xs font-medium tracking-[0.3em] uppercase opacity-60">Featured Work</span>
        <span className="text-xs font-medium tracking-[0.3em] uppercase opacity-40">Selected Systems</span>
      </Motion.div>

      <Motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col"
      >
        {projects.map((project, index) => (
          <Motion.div key={index} variants={fadeUp}>
            <ProjectCard {...project} index={index} />
          </Motion.div>
        ))}
      </Motion.div>

      <Motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex justify-center mt-12"
      >
        <Link 
          to="/works" 
          className="group relative px-10 py-5 bg-text-primary text-background overflow-hidden rounded-full flex items-center gap-4 transition-all duration-500 hover:scale-105"
        >
          <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          <span className="relative z-10 font-black text-xs tracking-[0.2em] uppercase">Archive Explorer</span>
          <div className="relative z-10 w-8 h-8 rounded-full bg-background/10 flex items-center justify-center group-hover:bg-text-primary/20 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </Link>
      </Motion.div>
    </section>
  );
};

export default FeaturedWork;
