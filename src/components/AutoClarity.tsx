import { motion } from 'framer-motion'
import { Activity, ArrowDownRight, ArrowUpRight, Cpu, Gauge, Zap } from 'lucide-react'
import { AnimatedGrid, NoiseOverlay, Vignette } from './shared/Background'
import { BlurCircle } from './shared/BlurCircle'
import { Container, Section, SectionHeading } from './shared/Section'
import { Reveal, Stagger, StaggerItem } from './shared/Reveal'
import { GlowCard } from './shared/GlowBorder'
import { useCounter, useInView } from '../hooks'

const metrics = [
  { icon: Activity, label: 'Active signals', value: 1284, suffix: '', change: '+12.4%', up: true, color: '#14d9ff' },
  { icon: Zap, label: 'Inference p99', value: 38, suffix: 'ms', change: '-8ms', up: false, color: '#3b82f6' },
  { icon: Cpu, label: 'Model load', value: 64, suffix: '%', change: '+3%', up: true, color: '#7c6dff' },
  { icon: Gauge, label: 'Throughput', value: 9.2, suffix: 'k/s', change: '+1.1k', up: true, color: '#14d9ff' },
]

const activity = [
  { label: 'Anomaly resolved', source: 'AutoClarity', time: '2m ago', color: '#14d9ff' },
  { label: 'Flow branch shipped', source: 'DecisionLab', time: '7m ago', color: '#3b82f6' },
  { label: 'Model retrained', source: 'Model Mesh', time: '14m ago', color: '#7c6dff' },
  { label: 'Connector synced', source: 'Signal Engine', time: '21m ago', color: '#14d9ff' },
  { label: 'Audit exported', source: 'Audit Vault', time: '33m ago', color: '#3b82f6' },
]

function MetricCard({ m }: { m: typeof metrics[number] }) {
  const Icon = m.icon
  const { ref, inView } = useInView<HTMLDivElement>()
  const value = useCounter(m.value, inView, 1500)
  const display = m.value % 1 !== 0 ? value.toFixed(1) : Math.round(value).toLocaleString()
  return (
    <div ref={ref}>
      <GlowCard className="p-5" glowColor={`${m.color}33`}>
        <div className="flex items-start justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5" style={{ color: m.color, boxShadow: `0 0 16px -4px ${m.color}` }}>
            <Icon className="h-5 w-5" />
          </span>
          <span className={`flex items-center gap-1 text-xs font-medium ${m.up ? 'text-emerald-400' : 'text-rose-400'}`}>
            {m.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {m.change}
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <span className="font-display text-2xl font-semibold text-white">
            {display}
            <span className="text-base text-[#94a3b8]">{m.suffix}</span>
          </span>
          <span className="text-sm text-[#94a3b8]">{m.label}</span>
        </div>
      </GlowCard>
    </div>
  )
}

function ProgressRing({ value, label, color }: { value: number; label: string; color: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const v = useCounter(value, inView, 1600)
  const circumference = 2 * Math.PI * 42
  const offset = circumference - (v / 100) * circumference
  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative h-28 w-28">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.3 }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl font-semibold text-white">{Math.round(v)}%</span>
        </div>
      </div>
      <span className="text-sm text-[#94a3b8]">{label}</span>
    </div>
  )
}

const sparkData = [32, 45, 38, 52, 48, 61, 55, 68, 72, 65, 78, 82, 75, 88, 92]

function Sparkline() {
  const max = Math.max(...sparkData)
  const min = Math.min(...sparkData)
  const points = sparkData.map((v, i) => {
    const x = (i / (sparkData.length - 1)) * 100
    const y = 100 - ((v - min) / (max - min)) * 100
    return `${x},${y}`
  }).join(' ')
  const areaPoints = `0,100 ${points} 100,100`
  return (
    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14d9ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#14d9ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#spark)" />
      <motion.polyline
        points={points} fill="none" stroke="#14d9ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 0 6px #14d9ff)' }}
      />
    </svg>
  )
}

export function AutoClarity() {
  return (
    <Section id="autoclarity">
      <AnimatedGrid />
      <NoiseOverlay opacity={0.035} />
      <Vignette opacity={0.35} />
      <BlurCircle color="rgba(20, 217, 255, 0.1)" size={500} className="left-[-8%] top-[12%]" duration={18} />
      <BlurCircle color="rgba(124, 109, 255, 0.08)" size={440} className="right-[-10%] bottom-[18%]" duration={20} delay={3} />
      <BlurCircle color="rgba(59, 130, 246, 0.06)" size={360} className="left-[45%] top-[60%]" duration={14} delay={5} />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="AutoClarity"
            title="Your telemetry, explained"
            description="An enterprise analytics surface that surfaces only what matters. Metric cards, live activity, progress rings, and a real-time signal graph — all in one calm dashboard."
          />
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px glow-line opacity-60" />
            <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(20,217,255,0.12), transparent 50%)' }} />
            <div className="relative flex items-center justify-between border-b border-white/5 pb-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="font-display text-base font-semibold text-white">Live dashboard</span>
              </div>
              <span className="text-xs text-[#94a3b8]">Updated 3s ago</span>
            </div>

            <Stagger className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
              {metrics.map((m) => (
                <StaggerItem key={m.label}>
                  <MetricCard m={m} />
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
              <GlowCard className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Signal throughput</span>
                  <span className="text-xs text-[#14d9ff]">+18% vs last hour</span>
                </div>
                <div className="h-40 w-full">
                  <Sparkline />
                </div>
              </GlowCard>

              <GlowCard className="p-6" glowColor="rgba(124,109,255,0.2)">
                <span className="mb-5 block text-sm font-medium text-white">Model health</span>
                <div className="flex items-center justify-around">
                  <ProgressRing value={94} label="Accuracy" color="#14d9ff" />
                  <ProgressRing value={78} label="Coverage" color="#7c6dff" />
                </div>
              </GlowCard>
            </div>

            <GlowCard className="mt-5 p-6">
              <span className="mb-4 block text-sm font-medium text-white">Activity feed</span>
              <div className="flex flex-col gap-2.5">
                {activity.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex items-center justify-between rounded-xl bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full" style={{ background: a.color, boxShadow: `0 0 8px ${a.color}` }} />
                      <span className="text-sm text-white">{a.label}</span>
                      <span className="hidden text-xs text-[#94a3b8] sm:inline">· {a.source}</span>
                    </div>
                    <span className="text-xs text-[#94a3b8]">{a.time}</span>
                  </motion.div>
                ))}
              </div>
            </GlowCard>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
