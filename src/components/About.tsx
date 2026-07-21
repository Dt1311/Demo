import { motion } from 'framer-motion'
import { Brain, Check, Eye, History } from 'lucide-react'
import { ABOUT_METRICS, ABOUT_PILLARS } from '../data/content'
import { AnimatedGrid, NoiseOverlay, Vignette, LightBeams } from './shared/Background'
import { BlurCircle } from './shared/BlurCircle'
import { Container, Section, SectionHeading } from './shared/Section'
import { Reveal, Stagger, StaggerItem } from './shared/Reveal'
import { GlowCard } from './shared/GlowBorder'
import { useCounter, useInView } from '../hooks'

const icons = [Brain, Eye, History]

function MetricCounter({ metric }: { metric: typeof ABOUT_METRICS[number] }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const value = useCounter(metric.value, inView)
  const display = metric.decimals > 0 ? value.toFixed(metric.decimals) : Math.round(value).toLocaleString()
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold text-white">
        {display}
        <span className="text-[#14d9ff]">{metric.suffix}</span>
      </span>
      <span className="text-sm text-[#94a3b8]">{metric.label}</span>
    </div>
  )
}

export function About() {
  return (
    <Section id="about">
      <AnimatedGrid />
      <NoiseOverlay opacity={0.035} />
      <Vignette opacity={0.35} />
      <BlurCircle color="rgba(59, 130, 246, 0.1)" size={520} className="right-[-12%] top-[15%]" duration={18} />
      <BlurCircle color="rgba(20, 217, 255, 0.08)" size={440} className="left-[-10%] bottom-[8%]" duration={22} delay={2} />
      <BlurCircle color="rgba(124, 109, 255, 0.06)" size={380} className="left-[40%] top-[50%]" duration={16} delay={4} />
      <LightBeams />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="About UpSolve"
            title="Built for teams who decide under pressure"
            description="We compress the distance between signal and action. Every layer of UpSolve is engineered to remove guesswork — so your team moves from data to decision in one calm, auditable motion."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="relative grid grid-cols-2 gap-8 rounded-3xl glass p-8 sm:grid-cols-4 sm:gap-6 lg:p-12">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px glow-line opacity-50" />
            <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-20" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(20,217,255,0.1), transparent 60%)' }} />
            {ABOUT_METRICS.map((m) => (
              <MetricCounter key={m.label} metric={m} />
            ))}
          </div>
        </Reveal>

        <Stagger className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.12}>
          {ABOUT_PILLARS.map((pillar, i) => {
            const Icon = icons[i]
            const glowColor = i === 0 ? 'rgba(20,217,255,0.25)' : i === 1 ? 'rgba(59,130,246,0.25)' : 'rgba(124,109,255,0.25)'
            return (
              <StaggerItem key={pillar.title}>
                <GlowCard className="h-full p-7" glowColor={glowColor}>
                  <div className="flex h-full flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-[#14d9ff]">
                        <div className="absolute -inset-1 rounded-2xl opacity-30 blur-md" style={{ background: `radial-gradient(circle, ${glowColor}, transparent)` }} />
                        <Icon className="relative h-5 w-5" />
                      </span>
                      <h3 className="font-display text-xl font-semibold text-white">{pillar.title}</h3>
                    </div>
                    <p className="text-[15px] leading-[1.75] text-[#94a3b8]">{pillar.description}</p>
                    <ul className="mt-auto flex flex-col gap-2.5">
                      {pillar.points.map((p) => (
                        <li key={p} className="flex items-center gap-2.5 text-sm text-white/80">
                          <Check className="h-4 w-4 text-[#14d9ff]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>
              </StaggerItem>
            )
          })}
        </Stagger>
      </Container>
    </Section>
  )
}
