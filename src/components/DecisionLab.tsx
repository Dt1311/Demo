import { motion } from 'framer-motion'
import { Database, Filter, GitBranch, Play, ShieldCheck, Workflow } from 'lucide-react'
import { AnimatedGrid, NoiseOverlay, Vignette } from './shared/Background'
import { BlurCircle } from './shared/BlurCircle'
import { Container, Section, SectionHeading } from './shared/Section'
import { Reveal } from './shared/Reveal'

type Node = {
  id: string
  label: string
  icon: typeof Database
  x: number
  y: number
  color: string
}

const nodes: Node[] = [
  { id: 'source', label: 'Signal Source', icon: Database, x: 8, y: 50, color: '#14d9ff' },
  { id: 'filter', label: 'Normalize', icon: Filter, x: 28, y: 22, color: '#3b82f6' },
  { id: 'enrich', label: 'Enrich', icon: Workflow, x: 28, y: 78, color: '#3b82f6' },
  { id: 'model', label: 'Model Mesh', icon: GitBranch, x: 52, y: 50, color: '#7c6dff' },
  { id: 'validate', label: 'Validate', icon: ShieldCheck, x: 74, y: 28, color: '#14d9ff' },
  { id: 'route', label: 'Route Output', icon: Play, x: 74, y: 72, color: '#14d9ff' },
  { id: 'action', label: 'Decision', icon: ShieldCheck, x: 92, y: 50, color: '#7c6dff' },
]

const edges: [string, string][] = [
  ['source', 'filter'],
  ['source', 'enrich'],
  ['filter', 'model'],
  ['enrich', 'model'],
  ['model', 'validate'],
  ['model', 'route'],
  ['validate', 'action'],
  ['route', 'action'],
]

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!
}

function WorkflowNode({ node }: { node: Node }) {
  const Icon = node.icon
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4 + (node.x % 5), repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.08 }}
        className="group relative flex flex-col items-center gap-2"
      >
        <div
          className="pointer-events-none absolute -inset-3 rounded-3xl opacity-40 blur-xl"
          style={{ background: `radial-gradient(circle at center, ${node.color}50 0%, transparent 70%)` }}
        />
        <div
          className="relative flex h-14 w-14 items-center justify-center rounded-2xl glass-strong"
          style={{ boxShadow: `0 0 28px -8px ${node.color}, inset 0 1px 0 0 rgba(255,255,255,0.06)` }}
        >
          <div className="absolute inset-0 rounded-2xl opacity-30" style={{ background: `radial-gradient(circle at 50% 50%, ${node.color} 0%, transparent 70%)` }} />
          <Icon className="relative h-5 w-5" style={{ color: node.color }} />
          <span className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        </div>
        <span className="whitespace-nowrap rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-sm">
          {node.label}
        </span>
      </motion.div>
    </motion.div>
  )
}

function WorkflowLine({ from, to, delay }: { from: Node; to: Node; delay: number }) {
  const x1 = from.x
  const y1 = from.y
  const x2 = to.x
  const y2 = to.y
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`line-${from.id}-${to.id}`} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={from.color} stopOpacity="0.6" />
          <stop offset="50%" stopColor={from.color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={to.color} stopOpacity="0.6" />
        </linearGradient>
        <filter id={`glow-${from.id}-${to.id}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.line
        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
        stroke={`url(#line-${from.id}-${to.id})`}
        strokeWidth="1.5"
        strokeDasharray="4 4"
        filter={`url(#glow-${from.id}-${to.id})`}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
      />
      <motion.circle r="3" fill={from.color} style={{ filter: `drop-shadow(0 0 4px ${from.color})` }}>
        <animateMotion dur={`${3 + delay}s`} repeatCount="indefinite" path={`M ${x1 * 10} ${y1 * 5} L ${x2 * 10} ${y2 * 5}`} />
      </motion.circle>
    </svg>
  )
}

export function DecisionLab() {
  return (
    <Section id="decisionlab">
      <AnimatedGrid />
      <NoiseOverlay opacity={0.035} />
      <Vignette opacity={0.35} />
      <BlurCircle color="rgba(59, 130, 246, 0.1)" size={520} className="left-[-10%] top-[20%]" duration={18} />
      <BlurCircle color="rgba(20, 217, 255, 0.08)" size={440} className="right-[-8%] bottom-[12%]" duration={20} delay={2} />
      <BlurCircle color="rgba(124, 109, 255, 0.06)" size={380} className="left-[45%] top-[55%]" duration={16} delay={4} />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="DecisionLab"
            title="Compose decisions, not just dashboards"
            description="A visual workflow builder for multi-step decisions. Connect nodes, branch paths, test outcomes, and ship — with full lineage and one-click rollback."
          />
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px glow-line opacity-60" />
            <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,109,255,0.1), transparent 60%)' }} />
            <div className="relative mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2 w-2 rounded-full bg-[#14d9ff] shadow-[0_0_8px_#14d9ff]" />
                <span className="font-display text-base font-semibold text-white">Workflow: churn-predict-v3</span>
              </div>
              <span className="hidden text-xs text-[#94a3b8] sm:block">7 nodes · 8 edges · running</span>
            </div>

            <div className="relative h-[340px] w-full sm:h-[420px]">
              {edges.map(([from, to], i) => (
                <WorkflowLine key={`${from}-${to}`} from={getNode(from)} to={getNode(to)} delay={i * 0.1} />
              ))}
              {nodes.map((node) => (
                <WorkflowNode key={node.id} node={node} />
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/5 pt-6 sm:grid-cols-4">
              {[
                { label: 'Avg. runtime', value: '1.2s' },
                { label: 'Branches', value: '3' },
                { label: 'Success rate', value: '99.1%' },
                { label: 'Last run', value: '4m ago' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-display text-lg font-semibold text-white">{s.value}</span>
                  <span className="text-xs text-[#94a3b8]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
