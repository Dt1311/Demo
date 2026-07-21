import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { HERO_STATS } from '../data/content'
import { FloatingCards } from './hero/FloatingCards'
import { AnimatedGrid, NoiseOverlay, Particles } from './shared/Background'
import { BlurCircle } from './shared/BlurCircle'
import { Container } from './shared/Section'

const HeroCanvas = lazy(() => import('./hero/HeroCanvas').then((m) => ({ default: m.HeroCanvas })))

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden pt-32 pb-20">
      <AnimatedGrid />
      <NoiseOverlay opacity={0.035} />
      <Particles count={20} />
      <BlurCircle color="rgba(20, 217, 255, 0.16)" size={520} className="left-[-10%] top-[10%]" duration={16} />
      <BlurCircle color="rgba(124, 109, 255, 0.14)" size={460} className="right-[-8%] top-[30%]" duration={18} delay={2} />
      <BlurCircle color="rgba(59, 130, 246, 0.12)" size={400} className="bottom-[5%] left-[40%]" duration={20} delay={4} />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="flex flex-col gap-7">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[#94a3b8]"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#14d9ff] shadow-[0_0_8px_#14d9ff]" />
            Decision intelligence for modern teams
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(3rem,6vw,5.8rem)] font-semibold leading-[1.05] tracking-tight"
          >
            <span className="text-gradient">Turn signals into</span>
            <br />
            <span className="text-gradient-accent">confident decisions.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl text-[17px] leading-[1.8] text-[#94a3b8]"
          >
            UpSolve unifies your telemetry, models, and workflows into one calm surface.
            AutoClarity explains what happened. DecisionLab decides what happens next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white px-5 py-3 text-[15px] font-semibold text-[#050505] transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10">Start free</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#14d9ff]/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#autoclarity"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
            >
              <Play className="h-4 w-4 text-[#14d9ff]" />
              Watch demo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-2 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-display text-2xl font-semibold text-white">{s.value}</span>
                <span className="text-xs leading-tight text-[#94a3b8]">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[600px]">
          <div className="absolute inset-0">
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center">
                  <span className="h-16 w-16 animate-pulse rounded-full bg-[#14d9ff]/20 blur-xl" />
                </div>
              }
            >
              <HeroCanvas />
            </Suspense>
          </div>
          <FloatingCards />
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#94a3b8]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-9 w-5 rounded-full border border-white/15 p-1"
        >
          <div className="h-2 w-full rounded-full bg-[#14d9ff]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
