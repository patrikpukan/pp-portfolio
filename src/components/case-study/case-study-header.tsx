import { Link } from "@tanstack/react-router"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { GitHubIcon } from "@/components/brand-icons"
import { Button } from "@/components/ui/button"
import type { ProjectData } from "@/content/types"
import { useMessages } from "@/i18n/use-messages"

/** Back link, title, the one-sentence problem, and the live / source links. */
export function CaseStudyHeader({
  project,
  summary,
  headingId,
}: {
  project: ProjectData
  summary: string
  headingId: string
}) {
  const t = useMessages()
  const { live, source } = project.links ?? {}

  return (
    <>
      <Link
        to="/"
        hash="projects"
        className="mb-8 inline-flex items-center gap-1.5 text-[0.8125rem] text-muted-foreground hover:text-brand motion-safe:transition-colors"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" />
        {t.caseStudy.backToProjects}
      </Link>

      <h1
        id={headingId}
        className="mb-3 text-[clamp(1.75rem,4.5vw,2.25rem)] leading-[1.15] font-semibold tracking-[-0.03em]"
      >
        {project.name}
      </h1>
      <p className="mb-8 max-w-[34rem] text-[1.0625rem] text-muted-foreground">
        {summary}
      </p>

      {(live || source) && (
        <div className="mb-10 flex flex-wrap gap-2">
          {live && (
            <Button
              nativeButton={false}
              render={<a href={live} target="_blank" rel="noreferrer" />}
            >
              <ExternalLink />
              {t.caseStudy.live}
            </Button>
          )}
          {source && (
            <Button
              variant={live ? "outline" : "default"}
              nativeButton={false}
              render={<a href={source} target="_blank" rel="noreferrer" />}
            >
              <GitHubIcon />
              {t.caseStudy.source}
            </Button>
          )}
        </div>
      )}
    </>
  )
}
