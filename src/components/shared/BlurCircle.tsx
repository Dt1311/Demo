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
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.18, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export function GlowDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`relative h-px w-full ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#14d9ff]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#7c6dff]/20 to-transparent" />
      <motion.div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#14d9ff] to-transparent"
        animate={{ x: ['-20%', '320%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-[#7c6dff]/60 to-transparent"
        animate={{ x: ['280%', '-20%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  )
}
