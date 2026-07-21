import { motion } from 'framer-motion'
import { TECH_STACK } from '../data/content'
import { AnimatedGrid, NoiseOverlay } from './shared/Background'
import { BlurCircle } from './shared/BlurCircle'
import { Container, Section, SectionHeading } from './shared/Section'
import { Reveal } from './shared/Reveal'

const groupColors: Record<string, string> = {
  Frontend: '#14d9ff',
  Language: '#3b82f6',
  '3D': '#7c6dff',
  Motion: '#14d9ff',
  Styling: '#3b82f6',
  Tooling: '#7c6dff',
  Backend: '#14d9ff',
  Data: '#3b82f6',
  Infra: '#7c6dff',
  AI: '#14d9ff',
}

const positions = [
  { x: 50, y: 8 },   // top center
  { x: 82, y: 22 },  // top right
  { x: 88, y: 55 },  // right
  { x: 78, y: 85 },  // bottom right
  { x: 50, y: 92 },  // bottom center
  { x: 22, y: 85 },  // bottom left
  { x: 12, y: 55 },  // left
  { x: 18, y: 22 },  // top left
  { x: 50, y: 38 },  // center upper
  { x: 68, y: 62 },  // center right lower
  { x: 32, y: 62 },  // center left lower
  { x: 50, y: 68 },  // center lower
]

const connections: [number, number][] = [
  [0, 8], [8, 9], [9, 4], [8, 10], [10, 5], [8, 11], [11, 6],
  [1, 2], [2, 3], [3, 4], [0, 1], [7, 0], [6, 7], [5, 6],
]

function TechNode({ tech, pos, index }: { tech: typeof TECH_STACK[number]; pos: { x: number; y: number }; index: number }) {
  const color = groupColors[tech.group] || '#14d9ff'
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4 + (index % 4), repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
        whileHover={{ scale: 1.12 }}
        className="group relative flex flex-col items-center gap-2"
      >
        <div
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl glass-strong"
          style={{ boxShadow: `0 0 28px -8px ${color}` }}
        >
          <div className="absolute inset-0 rounded-2xl opacity-25" style={{ background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 70%)` }} />
          <span className="font-display text-sm font-bold" style={{ color }}>
            {tech.name.slice(0, 2).toUpperCase()}
          </span>
          <span className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        </div>
        <span className="whitespace-nowrap rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/70 backdrop-blur-sm">
          {tech.name}
        </span>
      </motion.div>
    </motion.div>
  )
}

export function TechStack() {
  return (
    <Section id="tech">
      <AnimatedGrid />
      <NoiseOverlay opacity={0.03} />
      <BlurCircle color="rgba(124, 109, 255, 0.1)" size={500} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" duration={16} />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Tech Stack"
            title="Built on a modern, typed foundation"
            description="Every piece of UpSolve is engineered with production-grade tooling — from the 3D canvas to the edge runtime. No legacy debt, no surprise dependencies."
          />
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#14d9ff]/50 to-transparent" />

            <div className="relative h-[380px] w-full sm:h-[480px]">
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                {connections.map(([from, to], i) => {
                  const a = positions[from]
                  const b = positions[to]
                  return (
                    <motion.line
                      key={i}
                      x1={`${a.x}%`}
                      y1={`${a.y}%`}
                      x2={`${b.x}%`}
                      y2={`${b.y}%`}
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                    />
                  )
                })}
              </svg>
              {TECH_STACK.map((tech, i) => (
                <TechNode key={tech.name} tech={tech} pos={positions[i]} index={i} />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 border-t border-white/5 pt-6">
              {Object.keys(groupColors).map((g) => (
                <span key={g} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#94a3b8]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: groupColors[g], boxShadow: `0 0 6px ${groupColors[g]}` }} />
                  {g}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
