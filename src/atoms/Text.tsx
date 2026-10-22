import type { HTMLAttributes, ReactNode } from 'react'

export function H1({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) {
  return (
    <h1
      className={`text-balance text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl ${className}`}
      {...props}
    >
      {children}
    </h1>
  )
}

export function H2({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) {
  return (
    <h2
      className={`text-xl font-semibold tracking-tight text-[var(--color-ink)] ${className}`}
      {...props}
    >
      {children}
    </h2>
  )
}

export function Lead({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }) {
  return (
    <p className={`text-pretty text-base text-[var(--color-ink-muted)] ${className}`} {...props}>
      {children}
    </p>
  )
}
