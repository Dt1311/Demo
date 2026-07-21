import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/content'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('#about')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-[1400px] items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? 'glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]' : 'border border-transparent bg-transparent'
          }`}
        >
          <a href="#hero" className="flex items-center gap-2.5" aria-label="UpSolve home">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#14d9ff] to-[#3b82f6] shadow-[0_0_20px_-4px_#14d9ff]">
              <svg viewBox="0 0 32 32" className="h-5 w-5 text-[#050505]" fill="none">
                <path d="M9 22V10l7 8 7-8v12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-white">UpSolve</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative rounded-lg px-4 py-2 text-sm font-medium text-[#94a3b8] transition-colors hover:text-white"
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-white/5"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
                <span className="absolute inset-x-4 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent via-[#14d9ff] to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="#contact" className="text-sm font-medium text-[#94a3b8] transition-colors hover:text-white">
              Sign in
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#050505] transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10">Get started</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#14d9ff]/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl glass text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-2 glass-strong p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-lg font-semibold">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-[#94a3b8] transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                  <span className="text-[#14d9ff]">→</span>
                </motion.a>
              ))}
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <a href="#contact" onClick={() => setOpen(false)} className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-medium text-white">
                  Sign in
                </a>
                <a href="#contact" onClick={() => setOpen(false)} className="rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-[#050505]">
                  Get started
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
