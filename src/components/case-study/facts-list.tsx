import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import type { ProjectContent, ProjectData } from "@/content/types"
import { useMessages } from "@/i18n/use-messages"

/** The at-a-glance read: a plain definition list, not a card grid. */
export function FactsList({
  project,
  facts,
}: {
  project: ProjectData
  facts: ProjectContent["facts"]
}) {
  const t = useMessages()

  return (
    <dl className="mb-10 grid gap-2.5">
      <Fact label={t.caseStudy.facts.role}>{facts.role}</Fact>
      <Fact label={t.caseStudy.facts.timeline}>{facts.timeline}</Fact>
      <Fact label={t.caseStudy.facts.platforms}>
        {t.common.joinList(project.platforms)}
      </Fact>
      <Fact label={t.caseStudy.facts.stack}>
        <span className="flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <Badge key={item} className="px-2 py-px text-[0.6875rem]/[1.5]">
              {item}
            </Badge>
          ))}
        </span>
      </Fact>
    </dl>
  )
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 max-[34rem]:grid-cols-1 max-[34rem]:gap-1">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}
