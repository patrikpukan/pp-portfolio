import type { ProjectContent } from "../../types"

export const useFormState = {
  blurb:
    "A 2\u00a0kB headless form hook with schema-driven validation and full type inference. ~900 stars, used in a handful of production apps.",
  summary:
    "Placeholder: one sentence stating the actual problem this project solved, not its category.",
  facts: {
    role: "Placeholder: your role and what you owned",
    timeline: "Placeholder: dates and time spent",
  },
  hero: {
    alt: "hero screenshot — 16:10",
    caption: "Placeholder: what the screenshot shows.",
  },
  problem: [
    {
      type: "paragraph",
      text: [
        "Placeholder: the situation before this project, and why the obvious solution wasn’t good enough.",
      ],
    },
  ],
  built: [
    {
      type: "list",
      items: [
        ["Placeholder: a part you built and the reason it exists."],
        ["Placeholder: another part, and the tradeoff it made."],
      ],
    },
    {
      type: "decision",
      paragraphs: [
        [
          "Placeholder: the architectural choice you’d be asked about in an interview, what it cost, and what it bought.",
        ],
      ],
    },
    {
      type: "paragraph",
      text: ["Placeholder: the alternative you rejected, and why."],
    },
  ],
  outcome: [
    {
      type: "stats",
      items: [
        { label: "Placeholder", value: "—", note: "what it measures" },
        { label: "Placeholder", value: "—", note: "what it measures" },
        { label: "Placeholder", value: "—", note: "the one that matters" },
      ],
    },
    {
      type: "paragraph",
      text: ["Placeholder: which of the three numbers is the point, and why."],
    },
  ],
  retrospective: [
    {
      type: "paragraph",
      text: ["Placeholder: what you’d do differently next time."],
    },
  ],
} as const satisfies ProjectContent
