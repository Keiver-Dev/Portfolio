export const projects = [
  {
    id: "vlynk",
    title: "Vlynk App",
    subtitle: "Active Context Engine",
    description: "A deterministic, event-driven context propagation engine designed for architectural reliability and strict data hierarchies.",
    overview: "Vlynk was built to solve the fragmentation of context in distributed development teams. It uses a hierarchy of Space → Folder → List → Task to ensure that every collaborator has a single, verifiable source of truth, triggered automatically by GitHub events.",
    challenge: "Traditional task managers rely on manual updates and prone-to-error rules. The challenge was to build an engine that propagates context without AI or manual intervention, ensuring 100% deterministic behavior even in complex, multi-repo environments.",
    solution: "We implemented a custom event-bus architecture in Node.js that processes GitHub webhooks in real-time. This system validates every state change against a strict schema and propagates context down the hierarchy, ensuring that no task is ever out of sync with the actual repository state.",
    technologies: ["Node.js", "Express", "PostgreSQL", "Redis", "Socket.io", "GitHub Webhooks", "Railway"],
    stats: [
      { label: "Tests Passed", value: "506/506" },
      { label: "Status", value: "v0.9.2 Beta" },
      { label: "Architecture", value: "Event-Driven" }
    ],
    architecture: {
      type: "Event-Bus / BFS",
      description: "Uses a Breadth-First Search propagation engine to ensure all child nodes (Folders, Lists, Tasks) are updated in the correct order after a Space-level event."
    },
    links: {
      github: "https://github.com/vlynk",
      live: "https://vlynk.app"
    }
  },
  {
    id: "webhook-forge",
    title: "webhook-forge",
    subtitle: "Inspection & Tunneling Platform",
    description: "An open-source security-first platform for intercepting and inspecting webhooks, featuring a high-performance local tunneling CLI.",
    overview: "Webhook-forge is part of the Vlynk Studios ecosystem, designed to provide developers with a safe environment to debug webhooks. It handles everything from SSRF protection to secure WebSocket communication for local development.",
    challenge: "Building a tunneling service that is both performant and secure is difficult. We had to mitigate SSRF bypasses, ensure robust WebSocket authentication, and prevent value poisoning in the PostgreSQL database during three intensive security audit cycles.",
    solution: "The result was 'hookpipe', a standalone CLI that establishes a secure tunnel to the Webhook-forge cloud. We implemented strict input sanitization, JWT-based WebSocket handshakes, and a fail-fast database layer that passed security scores from 4.1 to 8.2.",
    technologies: ["Node.js", "PostgreSQL", "WebSocket", "CLI (hookpipe)", "Cloudflare R2"],
    stats: [
      { label: "Security Score", value: "8.2 / 10" },
      { label: "Open Source", value: "License: MIT" },
      { label: "Audit Cycles", value: "3 Full Reviews" }
    ],
    architecture: {
      type: "Reverse Proxy / Tunnel",
      description: "Employs a custom HTTP/WebSocket proxy layer that isolates untrusted incoming traffic before forwarding it to the developer's local environment hookpipe instance."
    },
    links: {
      github: "https://github.com/webhook-forge",
      live: "https://webhookforge.com"
    }
  }
];
