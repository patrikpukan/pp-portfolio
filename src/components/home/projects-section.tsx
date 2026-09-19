import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useProjectProse } from "@/content"
import { projects } from "@/content/projects"
import { projectTags } from "@/content/types"
import type { ProjectTag } from "@/content/types"
import { useMessages } from "@/i18n/use-messages"
import { Section } from "./section"
import { useReveal } from "./use-reveal"

type Filter = ProjectTag | "all"

export function ProjectsSection() {
  const t = useMessages()
  const [filter, setFilter] = useState<Filter>("all")
  const visible = projects.filter(
    (project) =>
      filter === "all" ||
      (project.tags as ReadonlyArray<string>).includes(filter)
  )

  return (
    <Section id="projects" label={t.sections.projects}>
      <ToggleGroup
        aria-label={t.projects.filterLabel}
        className="mb-5"
        value={[filter]}
        onValueChange={(value: Array<string>) => {
          // Single choice that can't be cleared: re-pressing the active
          // filter keeps it.
          const next = value[0] as Filter | undefined
          if (next) setFilter(next)
        }}
      >
        <ToggleGroupItem value="all">{t.projects.all}</ToggleGroupItem>
        {projectTags.map((tag) => (
          <ToggleGroupItem key={tag} value={tag}>
            {t.projects.tags[tag]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <p aria-live="polite" className="sr-only">
        {t.projects.resultCount(visible.length)}
      </p>

      <div className="grid gap-3">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  )
}

const mono = "font-mono text-[0.75rem] tracking-[0.02em]"

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const t = useMessages()
  const prose = useProjectProse()[project.slug]
  const reveal = useReveal<HTMLAnchorElement>()
  const period =
    project.period === null
      ? project.tags.includes("oss")
        ? t.projects.tags.oss
        : null
      : t.common.period(project.period)

  return (
    <Card
      render={
        <Link
          ref={reveal}
          to="/projects/$slug"
          params={{ slug: project.slug }}
        />
      }
      className="group relative overflow-hidden px-5 py-[1.125rem] [transition-property:border-color,background-color,opacity,translate] duration-150 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:bg-brand before:transition-transform before:duration-200 hover:border-[color-mix(in_oklab,var(--foreground)_25%,var(--border))] hover:bg-[color-mix(in_oklab,var(--accent)_45%,var(--card))] hover:before:scale-y-100 data-[reveal=hidden]:translate-y-2 data-[reveal=hidden]:opacity-0 data-[reveal=hidden]:transition-none data-[reveal=shown]:duration-200 motion-reduce:transition-none motion-reduce:before:transition-none"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-[0.9375rem] font-semibold tracking-[-0.01em]">
            {project.name}
          </h3>
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={2.5}
            className="size-3.5 text-muted-foreground opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand group-hover:opacity-100 motion-safe:transition-[translate,opacity,color] motion-safe:duration-150"
          />
        </div>
        {period && (
          <span className={`${mono} shrink-0 text-muted-foreground`}>
            {period}
          </span>
        )}
      </div>
      <p className="mt-2 text-[0.875rem] text-muted-foreground">
        {prose.blurb}
      </p>
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {project.stack.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="px-2 py-px text-[0.6875rem]/[1.5]"
          >
            {item}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
