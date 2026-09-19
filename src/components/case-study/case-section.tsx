import type { ReactNode } from "react"

/**
 * One case-study section: full-bleed, with a 1px rule between neighbours
 * (brief §2), and a real <h2>.
 */
export function CaseSection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  const headingId = `${id}-heading`
  return (
    <section aria-labelledby={headingId} className="py-12 [&+&]:border-t">
      <div className="shell">
        <h2
          id={headingId}
          className="mb-3 text-[1.125rem] font-semibold tracking-[-0.015em]"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}
