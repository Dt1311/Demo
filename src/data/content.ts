export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'AutoClarity', href: '#autoclarity' },
  { label: 'DecisionLab', href: '#decisionlab' },
  { label: 'Services', href: '#services' },
  { label: 'Tech', href: '#tech' },
  { label: 'Contact', href: '#contact' },
] as const

export const HERO_STATS = [
  { label: 'Decisions accelerated', value: '12M+' },
  { label: 'Enterprise teams', value: '340+' },
  { label: 'Avg. time saved', value: '18h' },
  { label: 'Model accuracy', value: '99.4%' },
] as const

export const ABOUT_METRICS = [
  { label: 'Uptime', value: 99.99, suffix: '%', decimals: 2 },
  { label: 'Data processed', value: 4.2, suffix: 'B', decimals: 1 },
  { label: 'Latency', value: 38, suffix: 'ms', decimals: 0 },
  { label: 'Teams onboarded', value: 1280, suffix: '+', decimals: 0 },
] as const

export const ABOUT_PILLARS = [
  {
    title: 'Reasoning that compounds',
    description: 'Every decision feeds the next. UpSolve learns your domain, your tone, and your risk envelope — then sharpens with every cycle.',
    points: ['Recursive context memory', 'Domain-aware embeddings', 'Confidence-calibrated output'],
  },
  {
    title: 'Clarity without busywork',
    description: 'Dashboards that explain themselves. AutoClarity distills telemetry into the few signals that actually move the needle.',
    points: ['Anomaly surfacing', 'Natural-language queries', 'Auto-generated briefs'],
  },
  {
    title: 'Decisions you can audit',
    description: 'DecisionLab records every input, branch, and outcome so your team can trace any conclusion back to its source.',
    points: ['Full lineage tracking', 'Reproducible runs', 'One-click rollback'],
  },
] as const

export const SERVICES = [
  {
    title: 'AutoClarity',
    tag: 'Analytics',
    description: 'Turn raw telemetry into the three signals that matter. Live dashboards, anomaly surfacing, and natural-language queries — no SQL required.',
    points: ['Real-time metric cards', 'Anomaly detection', 'NL query layer'],
  },
  {
    title: 'DecisionLab',
    tag: 'Workflow',
    description: 'Compose multi-step decision flows with connected nodes. Branch, test, and ship — with full lineage and one-click rollback.',
    points: ['Visual flow builder', 'A/B branch testing', 'Reproducible runs'],
  },
  {
    title: 'Signal Engine',
    tag: 'Ingestion',
    description: 'Stream events from anywhere. Normalize, enrich, and route them to the models that need them in under 40ms.',
    points: ['40ms p99 ingest', 'Schema auto-detect', '200+ connectors'],
  },
  {
    title: 'Model Mesh',
    tag: 'Inference',
    description: 'Route each request to the right model — open or closed, local or cloud — based on cost, latency, and accuracy targets.',
    points: ['Smart routing', 'Cost guardrails', 'Fallback chains'],
  },
  {
    title: 'Audit Vault',
    tag: 'Governance',
    description: 'Every decision, input, and output is signed and stored. Exportable, reproducible, and ready for any review board.',
    points: ['Signed lineage', 'One-click export', 'SOC 2 ready'],
  },
  {
    title: 'Pulse API',
    tag: 'Developer',
    description: 'A typed SDK and REST API to embed UpSolve decisions inside your own product in an afternoon, not a quarter.',
    points: ['Typed SDK', 'REST + webhooks', '99.99% SLA'],
  },
] as const

export const TECH_STACK = [
  { name: 'React', group: 'Frontend' },
  { name: 'TypeScript', group: 'Language' },
  { name: 'Three.js', group: '3D' },
  { name: 'Framer Motion', group: 'Motion' },
  { name: 'GSAP', group: 'Motion' },
  { name: 'Tailwind', group: 'Styling' },
  { name: 'Vite', group: 'Tooling' },
  { name: 'Supabase', group: 'Backend' },
  { name: 'PostgreSQL', group: 'Data' },
  { name: 'Edge Runtime', group: 'Infra' },
  { name: 'OpenAI', group: 'AI' },
  { name: 'ONNX', group: 'AI' },
] as const

export const CONTACT_CHANNELS = [
  { label: 'Sales', value: 'sales@upsolve.ai', icon: 'mail' },
  { label: 'Support', value: 'support@upsolve.ai', icon: 'life-buoy' },
  { label: 'Press', value: 'press@upsolve.ai', icon: 'newspaper' },
] as const

export const SOCIALS = [
  { label: 'GitHub', href: '#', icon: 'github' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'X', href: '#', icon: 'twitter' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
] as const

export const FOOTER_NAV = [
  { title: 'Product', links: ['AutoClarity', 'DecisionLab', 'Signal Engine', 'Pulse API'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Resources', links: ['Docs', 'Changelog', 'Status', 'Security'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'SOC 2', 'DPA'] },
] as const
