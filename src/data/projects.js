export const projects = [
  {
    id: "vlynk",
    type: "real",
    title: "Vlynk App",
    subtitle: "Active Context Engine",
    description: "A task manager where state changes propagate automatically. When a PR merges or a dependency resolves, Vlynk acts — no manual updates, no Slack messages, no lost context.",
    overview: "The problem Vlynk solves is simple: context in dev teams breaks constantly. A PR merges, someone forgets to update the task. A blocker resolves, no one notifies the right person. I built Vlynk to make those consequences automatic — not through rules you configure, but through the structure of the work itself. Tasks know what they depend on, and when something changes, the system propagates that forward.",
    challenge: "The core challenge was building a propagation engine that stays correct as the dependency graph changes — without making it slow or hard to reason about. On top of that, GitHub Webhooks needed to trigger state changes with enough reliability to be trusted, not just logged.",
    solution: "I built a dependency graph on top of PostgreSQL where each task tracks its blockers and dependents. When a task changes state — whether from a user action or a GitHub event — the engine traverses the graph and executes the consequences: unlocking downstream tasks, notifying the right people, and updating the timeline. GitHub is just one source of events; the engine works the same way without it.",
    technologies: ["Node.js", "Express", "PostgreSQL", "Redis", "Socket.io", "GitHub Webhooks", "Railway"],
    stats: [
      { label: "Tests Passing", value: "506 / 506" },
      { label: "Version", value: "v0.9.2-beta" },
      { label: "Target", value: "3–15 person teams" }
    ],
    architecture: {
      type: "Dependency Graph + Event Engine",
      description: "Tasks are nodes in a PostgreSQL-backed dependency graph. State changes — from GitHub Webhooks or direct user actions — trigger a traversal that propagates consequences automatically to all dependent tasks."
    },
    process: [
      { phase: "Problem", description: "Mapped out exactly where context breaks in a dev team's workflow and decided the fix had to be structural, not another notification system." },
      { phase: "Data Model", description: "Designed the Space → Folder → List → Task hierarchy and the dependency graph schema before writing any application code." },
      { phase: "Engine", description: "Built the propagation logic, integrated GitHub Webhooks as an event source, and covered the core behavior with 506 integration tests." },
      { phase: "Deploy", description: "Shipped to Railway at v0.9.2-beta and started testing with real workflows to find edge cases in the graph traversal." }
    ],
    learnings: [
      "Getting the data model right before building the API saved me from major rewrites — the hierarchy and dependency graph needed to be solid foundations.",
      "GitHub Webhooks feel simple until you have to make them reliable. Payload validation, retry handling, and idempotency matter a lot.",
      "A passing test suite (506/506) gave me genuine confidence to refactor the propagation engine mid-project without breaking existing behavior."
    ],
    links: {
      github: "Private Repository",
      live: "In Development"
    }
  },

  {
    id: "webhook-forge",
    type: "real",
    title: "Webhook Forge",
    subtitle: "Webhook Inspector & Replay Engine",
    description: "An open-source dev tool for receiving, inspecting, and replaying webhooks locally. Has a real-time dashboard, HMAC validation for major providers, and a CLI called `wf` to manage everything from the terminal.",
    overview: "I built Webhook Forge because testing webhooks in local development is painful — you need a public URL, you lose events if the server is down, and debugging payload issues is slow. I wanted a self-hosted tool that captures everything, shows it clearly, and lets you replay any event without triggering it again from the provider.",
    challenge: "The hardest part was coordinating three separate packages — the server, the React dashboard, and the CLI — so they work together seamlessly. The server needs to receive webhooks, validate HMAC signatures, forward to the local app, and broadcast to the dashboard in real time, all at once.",
    solution: "I structured it as a monorepo with three packages: the ingestion server (Express + WebSockets), a brutalist React dashboard for real-time inspection, and a `wf` CLI to control everything from the terminal. PostgreSQL handles persistence with automatic cleanup. Signature validation is built in for GitHub, Stripe, Shopify, and Vercel.",
    technologies: ["Node.js", "Express", "React 19", "PostgreSQL", "WebSocket", "Tailwind v4", "Zustand", "TanStack Query"],
    stats: [
      { label: "Version", value: "0.1.0-beta.1" },
      { label: "License", value: "MIT" },
      { label: "Providers", value: "GitHub, Stripe, Shopify, Vercel" }
    ],
    architecture: {
      type: "Monorepo — Server / Dashboard / CLI",
      description: "The Express server receives webhooks, validates HMAC signatures, forwards to the local app, and pushes events to the React dashboard via WebSocket. The `wf` CLI controls and queries the server from the terminal."
    },
    process: [
      { phase: "Problem", description: "Identified the core pain: webhooks are hard to test locally — events get lost, payloads are opaque, and you always need a tunnel you don't control." },
      { phase: "Design", description: "Split the tool into three packages (server, client, CLI) and defined how they communicate before writing any feature code." },
      { phase: "Build", description: "Built the ingestion server first, then the dashboard with real-time WebSocket updates, then the CLI to wire everything together. Added HMAC validation for four major providers." },
      { phase: "Release", description: "Published as open source at v0.1.0-beta.1 with a full README, CLI reference, and provider security docs." }
    ],
    learnings: [
      "Monorepos are worth the initial setup cost — having the server, dashboard, and CLI in one repo made it much easier to iterate across all three at once.",
      "HMAC signature validation isn't hard, but it needs to be correct. Each provider formats their signature slightly differently and those details matter.",
      "Building a CLI tool changed how I think about UX — the terminal has no room for ambiguity, so every command and its output needs to be explicit."
    ],
    links: {
      github: "https://github.com/Vlynk-Studios/webhook-forge",
      live: "CLI Tool"
    }
  },

  {
    id: "kairo-email",
    type: "real",
    title: "Kairo Email Service",
    subtitle: "Email Delivery Microservice",
    description: "A Node.js microservice that handles transactional emails — verification codes, password recovery, workspace invitations, task assignments, and more. Built to be dropped into any project via API.",
    overview: "I built Kairo because I kept copying and pasting email logic between projects. I wanted one service I could call from anywhere with an API key and get reliable email delivery. It handles SMTP configuration, HTML templates, audit logging to PostgreSQL, and health checks — all the boring infrastructure so the main app doesn't have to.",
    challenge: "Making it actually reusable across different projects meant thinking carefully about the API design, authentication, and how to handle errors gracefully without crashing the calling service. Supporting multiple SMTP providers without rewriting the core logic was also tricky.",
    solution: "I used Nodemailer with a swappable config so you can point it at Gmail, SendGrid, or any SMTP provider. API key auth guards every endpoint. PostgreSQL logs every sent email for auditing. There's a test mode using Ethereal so you can develop without a real email account.",
    technologies: ["Node.js", "Express", "Nodemailer", "PostgreSQL", "Jest", "Supertest", "Docker"],
    stats: [
      { label: "Templates", value: "7 built-in" },
      { label: "License", value: "MIT" },
      { label: "Status", value: "Beta" }
    ],
    architecture: {
      type: "REST Microservice",
      description: "An Express API secured with API key auth. Each endpoint accepts a payload, renders an HTML template, sends via Nodemailer, and logs the result to PostgreSQL. Health check endpoint exposes DB and SMTP status."
    },
    process: [
      { phase: "Problem", description: "Identified repetitive email setup across projects and decided to extract it into a standalone service with a clean API." },
      { phase: "Design", description: "Defined the endpoint structure, template system, and auth model before writing any code. Kept the API intentionally simple." },
      { phase: "Build", description: "Built the Express server, Nodemailer integration, 7 HTML templates, PostgreSQL audit logging, and a full integration test suite with Jest and Supertest." },
      { phase: "Package", description: "Added Docker support and a test mode with Ethereal so the service is easy to run locally without any real credentials." }
    ],
    learnings: [
      "Extracting shared logic into a microservice is only worth it if the API is clean enough to not become a maintenance burden itself.",
      "A test mode with Ethereal was essential — being able to develop email flows without a real SMTP account saved a lot of friction.",
      "Health check endpoints are small to build but incredibly useful when debugging why something isn't working in a composed system."
    ],
    links: {
      github: "https://github.com/Keiver-Dev/kairo-mail-service",
      live: "Backend API"
    }
  },

  {
    id: "beacon",
    type: "concept",
    title: "Beacon",
    subtitle: "Privacy-First Analytics",
    description: "A self-hosted analytics tool for developers who want to understand their traffic without giving data to Google. Drop in a script tag, get pageviews, sessions, and referrers — no cookies, no GDPR headaches.",
    overview: "Most analytics tools are either overkill (GA4), expensive (Fathom, Plausible), or a privacy liability. The idea behind Beacon is simple: a lightweight server you run yourself, a 2KB script tag you drop in any site, and a clean dashboard showing the numbers you actually care about. Nothing stored that you wouldn't want a user to see.",
    challenge: "The hard part isn't collecting the data — it's fingerprinting sessions without cookies in a way that's privacy-respecting and accurate enough to be useful. Also building a dashboard that doesn't look like it's from 2012.",
    proposedApproach: "The approach would be to track sessions via a short-lived hash of IP + User-Agent + timestamp, stored ephemerally. No persistent identifiers, no cross-site tracking. The backend would likely be built as a Node.js service using PostgreSQL for aggregation and a minimal React dashboard for visualization.",
    technologies: ["Node.js", "Express", "PostgreSQL", "React", "TimescaleDB"],
    stats: [
      { label: "Type", value: "Concept" },
      { label: "Script Size", value: "< 2KB" },
      { label: "Self-hosted", value: "Yes" }
    ],
    architecture: {
      type: "Ingest Server + Dashboard",
      description: "A tiny JS snippet would send pageview events to a Node.js ingest endpoint. The server aggregates into PostgreSQL. A React dashboard would read from the DB and render metrics."
    },
    process: [
      { phase: "Problem", description: "Every analytics option forces a trade-off between privacy, cost, and data ownership. I want one I'd actually trust for my own projects." },
      { phase: "Design", description: "Define what data to collect (and explicitly what not to), design the ingest API, and figure out sessionization without cookies." },
      { phase: "Build", description: "Would require building the ingest endpoint, the aggregation queries, the script snippet, and the dashboard." },
      { phase: "Ship", description: "Plan to package it as a Docker image with a one-command setup, prioritizing extremely simple self-hosted docs." }
    ],
    learnings: [
      "Privacy-preserving analytics is mostly a data model problem — if you never store identifiable data, you can't leak it.",
      "TimescaleDB's continuous aggregates make time-series dashboards fast without building a custom rollup system.",
      "A 2KB script budget forces you to think hard about what's actually necessary."
    ],
    notBuiltReason: "Not built yet — prioritizing core infrastructure projects like Vlynk and Webhook Forge.",
    links: {
      github: "Concept",
      live: "Unbuilt"
    }
  },

  {
    id: "relay",
    type: "concept",
    title: "Relay",
    subtitle: "Job Queue for Node.js",
    description: "A lightweight background job queue for Node.js apps backed by PostgreSQL. For projects that already have a database and don't want to add Redis just to run a few async tasks.",
    overview: "BullMQ is great but it requires Redis. Most small Node.js projects already have PostgreSQL — so why add another dependency just to run jobs in the background? Relay is a job queue that runs entirely on PostgreSQL, with a simple API, retry logic, scheduled jobs, and a minimal dashboard to see what's running.",
    challenge: "PostgreSQL isn't Redis — you have to be careful about polling frequency, locking rows so two workers don't pick up the same job, and not hammering the database with constant queries when the queue is empty.",
    proposedApproach: "The design relies on PostgreSQL's `SELECT ... FOR UPDATE SKIP LOCKED` to safely claim jobs without conflicts. It would use exponential backoff for retries, and a worker process polling at configurable intervals to run jobs in a pool of async workers.",
    technologies: ["Node.js", "PostgreSQL", "Express"],
    stats: [
      { label: "Type", value: "Concept" },
      { label: "Dependencies", value: "PostgreSQL only" },
      { label: "Use case", value: "Background jobs" }
    ],
    architecture: {
      type: "PostgreSQL-backed Queue",
      description: "Jobs would be rows in a PostgreSQL table. Workers poll with `SELECT FOR UPDATE SKIP LOCKED` to claim jobs safely. Retries, delays, and priorities stored as columns. Entirely Redis-free."
    },
    process: [
      { phase: "Problem", description: "I keep adding Redis to small projects just for background jobs. 90% of the time that's overkill." },
      { phase: "Design", description: "Figure out the minimum schema for a reliable job queue in PostgreSQL and design the worker polling loop." },
      { phase: "Build", description: "Would need to carefully implement job enqueue, worker polling, retry logic with exponential backoff, and a simple status dashboard." },
      { phase: "Ship", description: "Could be packaged as an npm module with a clean API — `relay.add(jobName, payload)` and `relay.process(jobName, handler)`." }
    ],
    learnings: [
      "`SELECT FOR UPDATE SKIP LOCKED` is the trick that makes PostgreSQL-backed queues actually work — without it you get race conditions.",
      "Exponential backoff for retries is easy to implement but needs a cap, otherwise a stuck job backs off forever.",
      "A minimal UI to see pending/running/failed jobs is worth building early — debugging a queue without visibility is painful."
    ],
    notBuiltReason: "Not built yet — prioritizing core infrastructure projects like Vlynk and Webhook Forge.",
    links: {
      github: "Concept",
      live: "Unbuilt"
    }
  },

  {
    id: "vault",
    type: "concept",
    title: "Vault CLI",
    subtitle: "Encrypted .env Sync",
    description: "A CLI tool for encrypting and syncing .env files across machines using a shared master key. No SaaS, no cloud account — just a file, a key, and a command.",
    overview: "Sharing environment variables in a team is always awkward. There are great heavy-duty tools like Doppler, 1Password CLI, and dotenv-vault, but sometimes you just want a minimal alternative without creating another SaaS account. Vault CLI would encrypt your .env with a master key and sync the encrypted file anywhere — Git, S3, a shared drive — so anyone with the key can decrypt it.",
    challenge: "The encryption needs to be impenetrable but the UX must be simple enough that developers actually use it instead of just DMing secrets over Slack. Key management is the hard part — if the key is lost, the secrets are gone.",
    proposedApproach: "100% local AES-256-GCM encryption with a 32-character master key you store yourself. The encrypted file would be safe to commit to Git or share publicly. The CLI logic would handle encrypt, decrypt, push, and pull operations.",
    technologies: ["Node.js", "CLI", "AES-256-GCM", "S3 / Git"],
    stats: [
      { label: "Type", value: "Concept" },
      { label: "Encryption", value: "AES-256-GCM" },
      { label: "Storage", value: "Bring your own" }
    ],
    architecture: {
      type: "CLI + Encrypted File",
      description: "The CLI reads your .env, encrypts it with AES-256-GCM using the master key, and writes a `.env.enc` file. That file can be synced directly via Git. Anyone with the key runs `vault pull` to decrypt."
    },
    process: [
      { phase: "Problem", description: "Every team I've seen has a bad solution for sharing secrets — usually Slack or a shared .env that somehow ends up in Git." },
      { phase: "Design", description: "Choose the encryption scheme, define the CLI commands (encrypt, decrypt, push, pull), and decide what storage backends to support first." },
      { phase: "Build", description: "Would implement AES-256-GCM encryption/decryption, robust CLI argument parsing, and Git as the first sync backend." },
      { phase: "Ship", description: "Publish to npm. Crucially, the README would need to position this properly as a minimal, self-hosted alternative to Doppler/dotenv-vault." }
    ],
    learnings: [
      "AES-256-GCM is the right choice for this use case — it's authenticated encryption, so you detect tampering, not just decrypt garbage.",
      "CLI tools live and die by their error messages. A confusing error when the key is wrong will make people abandon the tool immediately.",
      "Bring-your-own-storage is a feature, not a gap — it means the tool works with whatever the team already uses."
    ],
    notBuiltReason: "Not built yet — prioritizing core infrastructure projects like Vlynk and Webhook Forge.",
    links: {
      github: "Concept",
      live: "Unbuilt"
    }
  },

];

