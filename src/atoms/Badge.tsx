import type { HTMLAttributes, ReactNode } from 'react'

type Tone = 'success' | 'neutral' | 'warn' | 'danger'

const tones: Record<Tone, string> = {
  success: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  neutral: 'bg-white/5 text-[var(--color-ink-muted)] ring-white/10',
  warn: 'bg-amber-500/15 text-amber-200 ring-amber-500/35',
  danger: 'bg-red-500/15 text-red-300 ring-red-500/30',
}

export function Badge({
  tone = 'neutral',
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
