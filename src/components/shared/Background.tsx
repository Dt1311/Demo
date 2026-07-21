import { motion } from 'framer-motion'

export function AnimatedGrid({ className = '', fade = true }: { className?: string; fade?: boolean }) {
  return (
    <div className={`pointer-events-none absolute inset-0 grid-bg ${fade ? 'mask-fade-edges' : ''} ${className}`} aria-hidden />
  )
}

export function NoiseOverlay({ className = '', opacity = 0.04 }: { className?: string; opacity?: number }) {
  return (
    <div className={`pointer-events-none absolute inset-0 noise ${className}`} style={{ opacity }} aria-hidden />
  )
}

export function MouseGlow({ color = 'rgba(20, 217, 255, 0.08)', size = 600 }: { color?: string; size?: number }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{
        background: `radial-gradient(${size / 2}px at 50% 50%, ${color} 0%, transparent 70%)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

export function Particles({ count = 18, className = '' }: { count?: number; className?: string }) {
  const particles = Array.from({ length: count }, (_, i) => i)
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {particles.map((i) => {
        const left = (i * 53) % 100
        const top = (i * 37) % 100
        const size = 1 + (i % 3)
        const duration = 6 + (i % 5) * 2
        const delay = (i % 7) * 0.4
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#14d9ff]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              boxShadow: '0 0 6px rgba(20,217,255,0.8)',
            }}
            animate={{ y: [0, -24, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      })}
    </div>
  )
}
