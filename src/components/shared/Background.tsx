import { motion } from 'framer-motion'

export function AnimatedGrid({ className = '', fade = true, fine = false }: { className?: string; fade?: boolean; fine?: boolean }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${fine ? 'grid-bg-fine' : 'grid-bg'} ${fade ? 'mask-fade-edges-soft' : ''} ${className}`} aria-hidden />
  )
}

export function NoiseOverlay({ className = '', opacity = 0.04 }: { className?: string; opacity?: number }) {
  return (
    <div className={`pointer-events-none absolute inset-0 noise ${className}`} style={{ opacity }} aria-hidden />
  )
}

export function Vignette({ className = '', opacity = 0.5 }: { className?: string; opacity?: number }) {
  return (
    <div className={`pointer-events-none absolute inset-0 vignette ${className}`} style={{ opacity }} aria-hidden />
  )
}

export function MouseGlow({ color = 'rgba(20, 217, 255, 0.06)', size = 700 }: { color?: string; size?: number }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{
        background: `radial-gradient(${size / 2}px at 50% 50%, ${color} 0%, transparent 70%)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  )
}

export function Particles({ count = 18, className = '', colors }: { count?: number; className?: string; colors?: string[] }) {
  const palette = colors ?? ['rgba(20,217,255,0.9)', 'rgba(59,130,246,0.7)', 'rgba(124,109,255,0.6)']
  const particles = Array.from({ length: count }, (_, i) => i)
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {particles.map((i) => {
        const left = (i * 53 + 7) % 100
        const top = (i * 37 + 13) % 100
        const size = 1 + (i % 3)
        const duration = 7 + (i % 6) * 2
        const delay = (i % 7) * 0.5
        const color = palette[i % palette.length]
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: color,
              boxShadow: `0 0 ${4 + (i % 3) * 2}px ${color}`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.9, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      })}
    </div>
  )
}

export function LightBeams({ className = '' }: { className?: string }) {
  const beams = [
    { left: '15%', top: '0%', height: '60%', rotate: -8, color: 'rgba(20,217,255,0.06)', delay: 0, duration: 12 },
    { left: '55%', top: '0%', height: '70%', rotate: 6, color: 'rgba(124,109,255,0.05)', delay: 2, duration: 16 },
    { left: '82%', top: '0%', height: '50%', rotate: -4, color: 'rgba(59,130,246,0.05)', delay: 4, duration: 14 },
  ]
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {beams.map((b, i) => (
        <motion.div
          key={i}
          className="absolute origin-top"
          style={{
            left: b.left,
            top: b.top,
            height: b.height,
            width: 2,
            background: `linear-gradient(to bottom, ${b.color}, transparent)`,
            transform: `rotate(${b.rotate}deg)`,
            filter: 'blur(1px)',
          }}
          animate={{ opacity: [0, 0.8, 0], scaleY: [0.7, 1, 0.7] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export function GlowOrb({ className = '', color = 'rgba(20,217,255,0.12)', size = 300 }: { className?: string; color?: string; size?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        filter: 'blur(40px)',
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
