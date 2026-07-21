import { motion } from 'framer-motion'

type BlurCircleProps = {
  className?: string
  color?: string
  size?: number
  duration?: number
  delay?: number
}

export function BlurCircle({
  className = '',
  color = 'rgba(20, 217, 255, 0.18)',
  size = 480,
  duration = 14,
  delay = 0,
}: BlurCircleProps) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[120px] ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.5, 0.75, 0.5],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export function GlowDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`relative h-px w-full ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#14d9ff]/40 to-transparent" />
      <motion.div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#14d9ff] to-transparent"
        animate={{ x: ['-20%', '320%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
