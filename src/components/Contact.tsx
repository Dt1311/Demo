import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, LifeBuoy, Newspaper, Twitter, Youtube } from 'lucide-react'
import { CONTACT_CHANNELS, SOCIALS } from '../data/content'
import { AnimatedGrid, NoiseOverlay, Particles } from './shared/Background'
import { BlurCircle } from './shared/BlurCircle'
import { Container, Section, SectionHeading } from './shared/Section'
import { Reveal } from './shared/Reveal'
import { GlowCard } from './shared/GlowBorder'

const channelIcons: Record<string, typeof Mail> = {
  mail: Mail,
  'life-buoy': LifeBuoy,
  newspaper: Newspaper,
}

const socialIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <Section id="contact">
      <AnimatedGrid />
      <NoiseOverlay opacity={0.03} />
      <Particles count={14} />
      <BlurCircle color="rgba(20, 217, 255, 0.1)" size={500} className="left-[-8%] top-[20%]" duration={18} />
      <BlurCircle color="rgba(124, 109, 255, 0.08)" size={420} className="right-[-6%] bottom-[15%]" duration={20} delay={2} />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something decisive"
            description="Tell us what you're trying to decide. We'll show you how UpSolve compresses the path from signal to action — usually in a single 30-minute call."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <GlowCard className="p-7 sm:p-9">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-[#94a3b8]/60 outline-none transition-colors focus:border-[#14d9ff]/50 focus:bg-white/10"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white">Work email</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-[#94a3b8]/60 outline-none transition-colors focus:border-[#14d9ff]/50 focus:bg-white/10"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white">Company</label>
                  <input
                    type="text"
                    placeholder="Acme Inc."
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-[#94a3b8]/60 outline-none transition-colors focus:border-[#14d9ff]/50 focus:bg-white/10"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white">What are you deciding?</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="We're trying to reduce churn by predicting at-risk accounts..."
                    className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-[#94a3b8]/60 outline-none transition-colors focus:border-[#14d9ff]/50 focus:bg-white/10"
                  />
                </div>
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-5 py-3.5 text-[15px] font-semibold text-[#050505] transition-transform duration-300 hover:scale-[1.02]"
                >
                  <span className="relative z-10">{submitted ? 'Message sent' : 'Send message'}</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#14d9ff]/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#14d9ff]"
                  >
                    Thanks — we'll reply within one business day.
                  </motion.p>
                )}
              </form>
            </GlowCard>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-4">
                {CONTACT_CHANNELS.map((c) => {
                  const Icon = channelIcons[c.icon]
                  return (
                    <GlowCard key={c.label} className="p-5">
                      <div className="flex items-center gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-[#14d9ff]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm text-[#94a3b8]">{c.label}</span>
                          <span className="font-display text-base font-medium text-white">{c.value}</span>
                        </div>
                      </div>
                    </GlowCard>
                  )
                })}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <GlowCard className="p-6" glowColor="rgba(124,109,255,0.2)">
                <span className="mb-4 block text-sm font-medium text-white">Follow along</span>
                <div className="grid grid-cols-4 gap-3">
                  {SOCIALS.map((s) => {
                    const Icon = socialIcons[s.icon]
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        className="group flex aspect-square items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#94a3b8] transition-all hover:scale-105 hover:border-[#14d9ff]/30 hover:text-[#14d9ff]"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    )
                  })}
                </div>
              </GlowCard>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
