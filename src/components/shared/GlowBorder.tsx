import { motion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

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
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(70% 70% at 50% 0%, ${glowColor} 0%, transparent 70%)` }} />
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.08), 0 0 40px -10px ${glowColor}` }} />
      <div className="relative h-full">{children}</div>
    </motion.div>
  )
}
