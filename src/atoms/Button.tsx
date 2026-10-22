import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'outline'

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--color-brand-600)] text-white hover:bg-[var(--color-brand-700)] focus-visible:ring-[var(--color-brand-500)]',
  ghost:
    'bg-transparent text-[var(--color-ink)] hover:bg-white/5 focus-visible:ring-[var(--color-accent)]',
  outline:
    'border border-white/15 bg-transparent text-[var(--color-ink)] hover:bg-white/5 focus-visible:ring-[var(--color-accent)]',
}

export function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
