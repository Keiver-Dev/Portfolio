import { useEffect, useRef, useState } from "react";
import { motion as Motion, useInView } from "framer-motion";

// ─── Scenarios ────────────────────────────────────────────────────────────────
const SCENARIOS = [
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
            { t: 3600, text: "task:integration → unblocked", tag: "context", type: "ok" },
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
            { t: 2500, text: "socket:broadcast · 3 clients", tag: "ws", type: "info" },
            { t: 2900, text: "state:sync complete", tag: "system", type: "ok" },
            { t: 3300, text: "idle · waiting for next event", tag: "engine", type: "done" },
        ],
    },
];

// ─── Tag colors (using CSS vars from the portfolio) ───────────────────────────
const TAG_STYLES = {
    github: { color: "var(--color-accent, #84cc16)", bg: "rgba(132,204,22,0.08)" },
    engine: { color: "var(--color-primary, #a3a3a3)", bg: "rgba(163,163,163,0.06)" },
    context: { color: "#60a5fa", bg: "rgba(96,165,250,0.08)" },
    bfs: { color: "#c084fc", bg: "rgba(192,132,252,0.08)" },
    notify: { color: "#fb923c", bg: "rgba(251,146,60,0.08)" },
    ws: { color: "#34d399", bg: "rgba(52,211,153,0.08)" },
    system: { color: "var(--color-primary, #a3a3a3)", bg: "rgba(163,163,163,0.06)" },
    done: { color: "#84cc16", bg: "rgba(132,204,22,0.08)" },
};

const TYPE_OPACITY = { info: 1, ok: 1, muted: 0.55, done: 1 };

// ─── Single console line ──────────────────────────────────────────────────────
const ConsoleLine = ({ line }) => {
    const tag = TAG_STYLES[line.tag] || TAG_STYLES.system;
    return (
        <Motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: TYPE_OPACITY[line.type] ?? 1, x: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                lineHeight: "1.6",
                userSelect: "none",
            }}
        >
            {/* Tag pill */}
            <span style={{
                padding: "1px 6px",
                borderRadius: "4px",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                color: tag.color,
                background: tag.bg,
                flexShrink: 0,
                minWidth: "52px",
                textAlign: "center",
            }}>
                {line.tag}
            </span>
            {/* Text */}
            <span style={{ color: "var(--color-text-secondary, #a3a3a3)" }}>
                {line.text}
            </span>
            {/* OK dot */}
            {line.type === "ok" && (
                <span style={{ color: "#84cc16", fontSize: "8px", marginLeft: "auto", flexShrink: 0 }}>●</span>
            )}
        </Motion.div>
    );
};

// ─── Main component ───────────────────────────────────────────────────────────
const VlynkConsole = () => {
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

    const runScenario = (idx) => {
        clearAll();
        setVisibleLines([]);
        setRunning(true);
        const scenario = SCENARIOS[idx];

        scenario.lines.forEach((line) => {
            const id = setTimeout(() => {
                setVisibleLines((prev) => [...prev, line]);
            }, line.t);
            timeouts.current.push(id);
        });

        // Last line delay + pause before next scenario
        const last = scenario.lines[scenario.lines.length - 1];
        const nextId = setTimeout(() => {
            setRunning(false);
            const next = (idx + 1) % SCENARIOS.length;
            // pause between scenarios
            const pauseId = setTimeout(() => {
                setScenarioIdx(next);
            }, 1800);
            timeouts.current.push(pauseId);
        }, last.t + 1200);
        timeouts.current.push(nextId);
    };

    // Start when in view
    useEffect(() => {
        if (isInView) {
            runScenario(scenarioIdx);
        } else {
            clearAll();
            setVisibleLines([]);
            setRunning(false);
        }
        return clearAll;
    }, [isInView, scenarioIdx]);

    const scenario = SCENARIOS[scenarioIdx];

    return (
        <div
            ref={ref}
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                overflow: "hidden",
                fontFamily: "var(--font-mono, monospace)",
            }}
        >
            {/* Terminal chrome bar */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 14px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.02)",
                flexShrink: 0,
            }}>
                {/* Traffic lights */}
                {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                    <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.7 }} />
                ))}
                <span style={{
                    marginLeft: "10px",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.25)",
                    letterSpacing: "0.08em",
                    flex: 1,
                }}>
                    vlynk · context-engine
                </span>
                {/* Live indicator */}
                <Motion.div
                    animate={{ opacity: running ? [1, 0.3, 1] : 0.2 }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: running ? "#84cc16" : "rgba(255,255,255,0.2)",
                    }}
                />
                <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>
                    {running ? "running" : "idle"}
                </span>
            </div>

            {/* Event header */}
            <Motion.div
                key={scenario.id + "-header"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    padding: "8px 14px 4px",
                    fontSize: "9px",
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    flexShrink: 0,
                }}
            >
                {scenario.header}
            </Motion.div>

            {/* Lines output */}
            <div style={{
                flex: 1,
                overflowY: "hidden",
                padding: "6px 14px 12px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                justifyContent: "flex-end",
            }}>
                <Motion.div
                    key={scenario.id}
                    style={{ display: "flex", flexDirection: "column", gap: "4px" }}
                >
                    {visibleLines.map((line, i) => (
                        <ConsoleLine key={`${scenario.id}-${i}`} line={line} />
                    ))}
                </Motion.div>

                {/* Blinking cursor */}
                <Motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: "steps(1)" }}
                    style={{
                        width: 7,
                        height: 12,
                        background: "var(--color-accent, #84cc16)",
                        borderRadius: "1px",
                        marginTop: "4px",
                        opacity: 0.7,
                    }}
                />
            </div>
        </div>
    );
};

export default VlynkConsole;