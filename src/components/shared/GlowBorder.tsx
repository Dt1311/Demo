import { useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'

export function GlowBorder({ children, className = '', color = 'rgba(20, 217, 255, 0.4)' }: { children: ReactNode; className?: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className={`group relative ${className}`}>
      <div className="absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(60% 60% at 50% 50%, ${color} 0%, transparent 70%)` }} />
      <div className="relative h-full w-full rounded-[inherit]">{children}</div>
    </div>
  )
}

export function GlowCard({ children, className = '', glowColor = 'rgba(20, 217, 255, 0.25)' }: { children: ReactNode; className?: string; glowColor?: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-3xl glass ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(80% 50% at 50% 0%, ${glowColor} 0%, transparent 60%)` }} />
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `linear-gradient(135deg, ${glowColor} 0%, transparent 50%)`, maskImage: 'linear-gradient(black, transparent 70%)', WebkitMaskImage: 'linear-gradient(black, transparent 70%)' }} />
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.08), 0 0 40px -12px ${glowColor}` }} />
      <div className="relative h-full">{children}</div>
    </motion.div>
  )
}
