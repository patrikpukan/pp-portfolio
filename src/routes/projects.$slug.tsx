import { createFileRoute, notFound } from "@tanstack/react-router"
import { CaseSection } from "@/components/case-study/case-section"
import { CaseStudyHeader } from "@/components/case-study/case-study-header"
import { FactsList } from "@/components/case-study/facts-list"
import { Figure } from "@/components/case-study/figure"
import { Pager } from "@/components/case-study/pager"
import { ProseBlocks } from "@/components/case-study/prose-blocks"
import { projectProse, useProjectProse } from "@/content"
import { profile } from "@/content/profile"
import { findProject } from "@/content/projects"
import { messages } from "@/i18n/messages"
import { useMessages } from "@/i18n/use-messages"

const sections = ["problem", "built", "outcome", "retrospective"] as const

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = findProject(params.slug)
    // A real 404 status, not an empty 200 (brief §9).
    if (!project) throw notFound()
    return { project }
  },
  head: ({ loaderData, match }) => {
    if (!loaderData) return {}
    const { project } = loaderData
    const { locale } = match.context
    const prose = projectProse[locale][project.slug]
    const title = messages[locale].meta.caseStudyTitle(
      project.name,
      profile.name
    )
    return {
      meta: [
        { title },
        { name: "description", content: prose.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: prose.summary },
        { property: "og:type", content: "article" },
      ],
    }
  },
  component: CaseStudy,
})

function CaseStudy() {
  const { project } = Route.useLoaderData()
  const t = useMessages()
  const prose = useProjectProse()[project.slug]

  return (
    <>
      <section aria-labelledby="case-heading" className="pt-22 pb-14">
        <div className="shell">
          <CaseStudyHeader
            project={project}
            summary={prose.summary}
            headingId="case-heading"
          />
          <FactsList project={project} facts={prose.facts} />
          <Figure figure={prose.hero} eager />
        </div>
      </section>

      {sections.map((section) => (
        <CaseSection
          key={section}
          id={section}
          title={t.caseStudy.sections[section]}
        >
          <ProseBlocks blocks={prose[section]} />
        </CaseSection>
      ))}

      <Pager slug={project.slug} />
    </>
  )
}
