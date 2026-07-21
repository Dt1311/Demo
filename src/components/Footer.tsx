import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { FOOTER_NAV } from '../data/content'
import { AnimatedGrid, NoiseOverlay } from './shared/Background'
import { Container } from './shared/Section'
import { GlowDivider } from './shared/BlurCircle'

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <footer className="relative w-full overflow-hidden pt-20 pb-10">
      <AnimatedGrid />
      <NoiseOverlay opacity={0.03} />

      <Container className="relative z-10">
        <GlowDivider className="mb-16" />

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-4">
            <a href="#hero" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#14d9ff] to-[#3b82f6] shadow-[0_0_20px_-4px_#14d9ff]">
                <svg viewBox="0 0 32 32" className="h-5 w-5 text-[#050505]" fill="none">
                  <path d="M9 22V10l7 8 7-8v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold text-white">UpSolve</span>
            </a>
            <p className="max-w-xs text-sm leading-[1.7] text-[#94a3b8]">
              Decision intelligence for modern teams. Turn signals into confident, auditable action.
            </p>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-white">{col.title}</span>
              {col.links.map((l) => (
                <a key={l} href="#" className="text-sm text-[#94a3b8] transition-colors hover:text-[#14d9ff]">
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-[#94a3b8]">
            © {new Date().getFullYear()} UpSolve, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#94a3b8]">SOC 2 · GDPR · HIPAA-ready</span>
            <motion.button
              onClick={scrollTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:border-[#14d9ff]/30 hover:text-[#14d9ff]"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </Container>
    </footer>
  )
}
