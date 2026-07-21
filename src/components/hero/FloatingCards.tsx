import { motion } from 'framer-motion'
import { Activity, Cpu, GitBranch, Sparkles, TrendingUp } from 'lucide-react'

const cards = [
  { icon: Activity, label: 'Live signals', value: '1,284', tint: 'text-[#14d9ff]', top: '8%', left: '-8%', delay: 0 },
  { icon: GitBranch, label: 'Active flows', value: '42', tint: 'text-[#3b82f6]', top: '38%', right: '-12%', delay: 0.4 },
  { icon: TrendingUp, label: 'Accuracy', value: '99.4%', tint: 'text-[#7c6dff]', bottom: '12%', left: '-4%', delay: 0.8 },
  { icon: Cpu, label: 'Inference', value: '38ms', tint: 'text-[#14d9ff]', bottom: '34%', right: '-6%', delay: 1.2 },
]

export function FloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      {cards.map((c, i) => {
        const Icon = c.icon
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + c.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ top: c.top, left: c.left, right: c.right, bottom: c.bottom }}
            className="absolute"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
              className="pointer-events-auto flex items-center gap-3 rounded-2xl glass-strong px-4 py-3 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]"
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ${c.tint}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#94a3b8]">{c.label}</span>
                <span className="font-display text-sm font-semibold text-white">{c.value}</span>
              </div>
            </motion.div>
          </motion.div>
        )
      })}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute left-1/2 top-[6%] -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-auto flex items-center gap-2 rounded-full glass-strong px-3.5 py-1.5"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#14d9ff]" />
          <span className="text-xs font-medium text-white">AI online</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        </motion.div>
      </motion.div>
    </div>
  )
}
