import { Badge } from "@/components/ui/badge"
import { useSiteContent } from "@/content"
import type { TimelineEntry } from "@/content/types"
import { useMessages } from "@/i18n/use-messages"
import { RichText } from "@/components/rich-text"
import { Block, Section } from "./section"

const mono = "font-mono text-[0.75rem] tracking-[0.02em]"
const twoColumns = "grid grid-cols-[7.5rem_1fr] gap-4 max-[34rem]:grid-cols-1"

export function AboutSection() {
  const t = useMessages()
  const { about } = useSiteContent()

  return (
    <Section id="about" label={t.sections.about}>
      <p className="mb-10 max-w-[36rem] text-muted-foreground">{about.lead}</p>

      <Block title={t.about.experience}>
        <div className="grid gap-6">
          {about.experience.map((entry) => (
            <Entry key={`${entry.org}-${entry.period.from}`} entry={entry} />
          ))}
        </div>
      </Block>

      <Block title={t.about.stack}>
        <dl className="grid gap-4">
          {about.skills.map((group) => (
            <div
              key={group.label}
              className={`${twoColumns} items-start max-[34rem]:gap-2`}
            >
              <dt className={`${mono} text-muted-foreground`}>{group.label}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title={t.about.education}>
        <div className="grid gap-6">
          {about.education.map((entry) => (
            <Entry key={`${entry.org}-${entry.period.from}`} entry={entry} />
          ))}
        </div>
      </Block>

      <Block title={t.about.hobbies}>
        <ul className="grid list-disc gap-2 pl-[1.125rem] text-[0.875rem] text-muted-foreground marker:text-[color-mix(in_oklab,var(--muted-foreground)_60%,transparent)]">
          {about.hobbies.map((hobby, i) => (
            <li key={i}>
              <RichText
                value={hobby}
                strongClassName="font-medium text-foreground"
              />
            </li>
          ))}
        </ul>
      </Block>
    </Section>
  )
}

// The title comes first in the DOM so heading navigation lands on it; the
// period is placed in the left column visually (above it on narrow screens).
function Entry({ entry }: { entry: TimelineEntry }) {
  const t = useMessages()

  return (
    <div className={`${twoColumns} max-[34rem]:gap-1`}>
      <div className="col-start-2 row-start-1 max-[34rem]:col-start-1 max-[34rem]:row-start-2">
        <h4 className="mb-0.5 text-[0.9375rem] font-semibold tracking-[-0.01em]">
          {entry.title}
        </h4>
        <p className="text-[0.875rem] text-muted-foreground">
          {t.common.joinFacts(
            entry.place ? [entry.org, entry.place] : [entry.org]
          )}
        </p>
        {entry.note && (
          <p className="mt-2 text-[0.875rem] text-muted-foreground">
            {entry.note}
          </p>
        )}
      </div>
      <span
        className={`${mono} col-start-1 row-start-1 pt-0.5 text-muted-foreground`}
      >
        {t.common.period(entry.period)}
      </span>
    </div>
  )
}
