import type { ProjectContent } from "../../types"

export const northwindOps = {
  blurb:
    "Internal logistics console for a 60-person warehouse team. Replaced a spreadsheet workflow; cut order-entry time roughly in half and now handles ~4k events a day.",
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
