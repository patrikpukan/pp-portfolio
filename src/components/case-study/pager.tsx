import { Link } from "@tanstack/react-router"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { projectNeighbours } from "@/content/projects"
import type { ProjectSlug } from "@/content/projects"
import { useMessages } from "@/i18n/use-messages"

const tile =
  "rounded-lg border px-4 py-3.5 hover:border-[color-mix(in_oklab,var(--foreground)_25%,var(--border))] hover:bg-accent motion-safe:transition-colors motion-safe:duration-150"
const label =
  "mb-0.5 flex items-center gap-1 font-mono text-[0.75rem] tracking-[0.02em] text-muted-foreground"

/** Previous / next case study, wrapping around at either end. */
export function Pager({ slug }: { slug: ProjectSlug }) {
  const t = useMessages()
  const { previous, next } = projectNeighbours(slug)

  return (
    // Full-bleed rule, matching the section dividers.
    <div className="border-t">
      <nav
        aria-label={t.caseStudy.pagerLabel}
        className="shell grid grid-cols-2 gap-3 py-10 max-[34rem]:grid-cols-1"
      >
        <Link
          to="/projects/$slug"
          params={{ slug: previous.slug }}
          className={tile}
        >
          <span className={label}>
            <ArrowLeft aria-hidden="true" className="size-3" />
            {t.caseStudy.previous}
          </span>
          {previous.name}
        </Link>
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className={`${tile} text-right`}
        >
          <span className={`${label} justify-end`}>
            {t.caseStudy.next}
            <ArrowRight aria-hidden="true" className="size-3" />
          </span>
          {next.name}
        </Link>
      </nav>
    </div>
  )
}
