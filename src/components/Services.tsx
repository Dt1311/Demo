import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { SERVICES } from '../data/content'
import { AnimatedGrid, NoiseOverlay, Vignette } from './shared/Background'
import { BlurCircle } from './shared/BlurCircle'
import { Container, Section, SectionHeading } from './shared/Section'
import { Reveal, Stagger, StaggerItem } from './shared/Reveal'

function ServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  const colors = ['#14d9ff', '#3b82f6', '#7c6dff', '#14d9ff', '#3b82f6', '#7c6dff']
  const color = colors[index % colors.length]

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <StaggerItem>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="group relative h-full overflow-hidden rounded-3xl glass p-7"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-30 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(60% 60% at 50% 0%, ${color}30 0%, transparent 70%)` }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.08), 0 0 48px -12px ${color}50` }}
        />

        <div style={{ transform: 'translateZ(40px)' }} className="relative flex h-full flex-col gap-5">
          <div className="flex items-center justify-between">
            <span
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5"
              style={{ color, boxShadow: `0 0 28px -8px ${color}` }}
            >
              <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-30 blur-md" style={{ background: `radial-gradient(circle, ${color}40, transparent)` }} />
              <span className="relative flex h-6 w-6 items-center justify-center">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
              </span>
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#94a3b8]">
              {service.tag}
            </span>
          </div>

          <h3 className="font-display text-xl font-semibold text-white">{service.title}</h3>
          <p className="text-[15px] leading-[1.75] text-[#94a3b8]">{service.description}</p>

          <ul className="mt-auto flex flex-col gap-2.5">
            {service.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-white/80">
                <Check className="h-4 w-4" style={{ color }} />
                {p}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-[#14d9ff]"
          >
            Learn more
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </StaggerItem>
  )
}

export function Services() {
  return (
    <Section id="services">
      <AnimatedGrid />
      <NoiseOverlay opacity={0.035} />
      <Vignette opacity={0.35} />
      <BlurCircle color="rgba(20, 217, 255, 0.08)" size={480} className="left-[-8%] top-[8%]" duration={18} />
      <BlurCircle color="rgba(124, 109, 255, 0.08)" size={440} className="right-[-10%] bottom-[12%]" duration={20} delay={3} />
      <BlurCircle color="rgba(59, 130, 246, 0.06)" size={360} className="left-[50%] top-[50%]" duration={14} delay={5} />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="One platform, six surfaces"
            description="From ingestion to governance, UpSolve covers the full decision lifecycle. Each surface is independently powerful — and they compound when used together."
          />
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
