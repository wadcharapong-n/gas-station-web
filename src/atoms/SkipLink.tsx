export function SkipLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900 focus:shadow-lg"
    >
      {children}
    </a>
  )
}
