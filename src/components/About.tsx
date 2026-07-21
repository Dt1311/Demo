import { motion } from 'framer-motion'
import { Brain, Check, Eye, History } from 'lucide-react'
import { ABOUT_METRICS, ABOUT_PILLARS } from '../data/content'
import { AnimatedGrid, NoiseOverlay } from './shared/Background'
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
    <div ref={ref} className="flex flex-col">
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
      <NoiseOverlay opacity={0.03} />
      <BlurCircle color="rgba(59, 130, 246, 0.1)" size={500} className="right-[-10%] top-[20%]" duration={18} />
      <BlurCircle color="rgba(20, 217, 255, 0.08)" size={420} className="left-[-8%] bottom-[10%]" duration={22} delay={2} />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="About UpSolve"
            title="Built for teams who decide under pressure"
            description="We compress the distance between signal and action. Every layer of UpSolve is engineered to remove guesswork — so your team moves from data to decision in one calm, auditable motion."
          />
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-8 rounded-3xl glass p-8 sm:grid-cols-4 sm:gap-6 lg:p-12">
          {ABOUT_METRICS.map((m) => (
            <MetricCounter key={m.label} metric={m} />
          ))}
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.12}>
          {ABOUT_PILLARS.map((pillar, i) => {
            const Icon = icons[i]
            return (
              <StaggerItem key={pillar.title}>
                <GlowCard className="h-full p-7" glowColor={i === 0 ? 'rgba(20,217,255,0.25)' : i === 1 ? 'rgba(59,130,246,0.25)' : 'rgba(124,109,255,0.25)'}>
                  <div className="flex h-full flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-[#14d9ff]">
                        <Icon className="h-5 w-5" />
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
