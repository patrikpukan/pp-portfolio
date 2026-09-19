import { RichText } from "@/components/rich-text"
import type { ProseBlock, RichText as RichTextValue } from "@/content/types"
import { useMessages } from "@/i18n/use-messages"
import { Figure } from "./figure"
import { StatsRow } from "./stats-row"

// The measure caps the text elements, not the column, so the left edge
// stays flush with the header and the title (brief §2).
const measure = "max-w-[34rem]"
const paragraph = `${measure} mb-4 text-muted-foreground last:mb-0`
const strong = "font-medium text-foreground"

export function ProseBlocks({ blocks }: { blocks: ReadonlyArray<ProseBlock> }) {
  return blocks.map((block, i) => <Block key={i} block={block} />)
}

function Block({ block }: { block: ProseBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className={paragraph}>
          <RichText value={block.text} strongClassName={strong} />
        </p>
      )
    case "list":
      return (
        <ul
          className={`${measure} mb-4 grid list-disc gap-2 pl-[1.125rem] text-muted-foreground marker:text-[color-mix(in_oklab,var(--muted-foreground)_60%,transparent)]`}
        >
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText value={item} strongClassName={strong} />
            </li>
          ))}
        </ul>
      )
    case "decision":
      return <Decision paragraphs={block.paragraphs} />
    case "stats":
      return <StatsRow items={block.items} />
    case "figure":
      return <Figure figure={block.figure} />
  }
}

/**
 * "The decision I'd defend", pulled out of the flow. The border is the
 * accent (brief §4); the label stays muted, since the accent is never text.
 */
function Decision({
  paragraphs,
}: {
  paragraphs: ReadonlyArray<RichTextValue>
}) {
  const t = useMessages()

  return (
    <div className={`${measure} my-6 border-l-2 border-brand py-1 pl-5`}>
      <h3 className="mb-1.5 text-[0.6875rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
        {t.caseStudy.decision}
      </h3>
      {paragraphs.map((text, i) => (
        <p key={i} className={paragraph}>
          <RichText value={text} strongClassName={strong} />
        </p>
      ))}
    </div>
  )
}
