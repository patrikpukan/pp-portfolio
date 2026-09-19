import type { RichText as RichTextValue } from "@/content/types"

export function RichText({
  value,
  strongClassName,
}: {
  value: RichTextValue
  strongClassName?: string
}) {
  return value.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      <strong key={i} className={strongClassName}>
        {part.strong}
      </strong>
    )
  )
}
