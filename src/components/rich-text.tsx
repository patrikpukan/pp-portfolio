import type { RichText as RichTextValue } from "@/content/types"

export function RichText({
  value,
  strongClassName,
}: {
  value: RichTextValue
  strongClassName?: string
}) {
  return value.map((part, i) => {
    if (typeof part === "string") return part
    if ("code" in part) {
      return (
        <code
          key={i}
          className="rounded-[4px] bg-muted px-[0.35em] py-[0.1em] font-mono text-[0.8125em]"
        >
          {part.code}
        </code>
      )
    }
    return (
      <strong key={i} className={strongClassName}>
        {part.strong}
      </strong>
    )
  })
}
