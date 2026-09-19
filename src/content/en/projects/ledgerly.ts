import type { ProjectContent } from "../../types"

export const ledgerly = {
  blurb:
    "Personal-finance app with a shared TypeScript core: a React dashboard, a React Native client, and an offline-first sync layer that reconciles edits made on either side.",
  summary:
    "A personal-finance app where the web and mobile clients are equal citizens — both fully usable offline, both writing to the same ledger, without a “last write wins” data loss story.",
  facts: {
    role: "Sole developer — design, API, both clients",
    timeline: "2024 — ongoing, ~6 months of evenings",
  },
  hero: {
    alt: "hero screenshot — 16:10",
    caption:
      "The ledger view, mid-sync. Pending rows carry a subtle state until the server acks them.",
  },
  problem: [
    {
      type: "paragraph",
      text: [
        "I wanted to log an expense standing at a checkout with no signal, then open my laptop that evening and find it there — with the category I’d already corrected on my phone still intact.",
      ],
    },
    {
      type: "paragraph",
      text: [
        "Most finance apps solve this by making the mobile client the source of truth and the web a read-only viewer. That was the thing I specifically did not want to build. Both clients had to accept writes offline, which turns a straightforward CRUD app into a ",
        { strong: "distributed state problem" },
        " with two writers and an unreliable link between them.",
      ],
    },
  ],
  built: [
    {
      type: "list",
      items: [
        [
          "A shared TypeScript core — schema, validation, and money arithmetic — consumed unchanged by both clients, so a rounding rule can’t drift between platforms.",
        ],
        [
          "A local SQLite database on each client that the UI reads from exclusively. Nothing in the interface ever awaits the network.",
        ],
        [
          "An append-only operation log per device, drained to the server on reconnect and replayed in causal order.",
        ],
        [
          "A tRPC API over Postgres that treats the server as a referee rather than an owner — it orders operations, it doesn’t originate them.",
        ],
      ],
    },
    {
      type: "decision",
      paragraphs: [
        [
          "I stored ",
          { strong: "operations, not rows" },
          ". Syncing row snapshots means the later write silently erases the earlier one; syncing ",
          { code: 'categorize(tx_id, "Groceries")' },
          " alongside ",
          { code: "amend_amount(tx_id, 1240)" },
          " means both survive, because they touch different fields of the same entity and the intent is explicit.",
        ],
        [
          "It cost me roughly three extra weeks and a materialization layer that has to be right. What it bought is that ",
          { strong: "a conflict is a merge, not a loss" },
          " — and I never had to write a dialog asking the user which version of their own data to keep.",
        ],
      ],
    },
    {
      type: "paragraph",
      text: [
        "Full CRDTs were the obvious alternative and I skipped them deliberately. A ledger’s operations are almost all commutative already, and the two that aren’t are cheap to order by timestamp. Automerge would have been correct and about 90 kB heavier than the problem deserved.",
      ],
    },
  ],
  outcome: [
    {
      type: "stats",
      items: [
        {
          label: "Sync payload",
          value: "4.1 kB",
          note: "median, per reconnect",
        },
        {
          label: "Time to interactive",
          value: "0.4 s",
          note: "cold start, local read",
        },
        { label: "Conflicts lost", value: "0", note: "across 14 months" },
      ],
    },
    {
      type: "paragraph",
      text: [
        "The number I actually care about is the last one. It’s the whole reason for the operation log, and it’s the one a snapshot-based design could not have held at zero.",
      ],
    },
    {
      type: "figure",
      figure: {
        alt: "sync flow diagram",
        caption:
          "Two clients writing offline, reconciled through the operation log on reconnect.",
      },
    },
  ],
  retrospective: [
    {
      type: "paragraph",
      text: [
        "I hand-rolled the migration story for the local SQLite schema and regretted it by the third change. Client-side migrations need the same rigor as server ones, and I gave them less — a device that skipped two app versions took a path I hadn’t tested.",
      ],
    },
    {
      type: "paragraph",
      text: [
        "I’d also write the operation log’s replay tests ",
        { strong: "before" },
        " the replay itself next time. It’s the one part of the system where a bug is silent, arrives weeks later, and looks like the user misremembering.",
      ],
    },
  ],
} as const satisfies ProjectContent
