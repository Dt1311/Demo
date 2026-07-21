export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
}) {
  const alignment = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start'
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#14d9ff]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#14d9ff] shadow-[0_0_8px_#14d9ff]" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.1] text-gradient">
        {title}
      </h2>
      {description && <p className="text-[17px] leading-[1.8] text-[#94a3b8]">{description}</p>}
    </div>
  )
}

export function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-[92%] max-w-[1400px] ${className}`}>{children}</div>
}

export function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative w-full overflow-hidden py-[120px] ${className}`}>
      {children}
    </section>
  )
}
