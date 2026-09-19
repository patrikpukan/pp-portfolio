import { cn } from "cn"
import type { ReactNode } from "react"

/**
 * A homepage section: full-bleed, with a 1px rule between neighbours
 * (brief §2). The heading is a real <h2> wearing the eyebrow style (§5).
 */
export function Section({
  id,
  label,
  className,
  children,
}: {
  id: string
  label: string
  className?: string
  children: ReactNode
}) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("py-18 [section+&]:border-t", className)}
    >
      <div className="shell">
        <h2
          id={headingId}
          className="mb-7 flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.12em] text-muted-foreground uppercase before:size-[5px] before:flex-none before:rounded-[1px] before:bg-brand after:h-px after:flex-1 after:bg-border"
        >
          {label}
        </h2>
        {children}
      </div>
    </section>
  )
}

/** A titled block inside a section: Experience, Stack, … */
export function Block({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="mb-10 last:mb-0">
      <h3 className="mb-4 text-[0.9375rem] font-semibold tracking-[-0.01em]">
        {title}
      </h3>
      {children}
    </div>
  )
}
