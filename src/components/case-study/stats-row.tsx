import type { Stat } from "@/content/types"

/**
 * Three plain tiles. Values stay in ink with proportional figures: no
 * accent, no deltas (brief §4).
 */
export function StatsRow({ items }: { items: ReadonlyArray<Stat> }) {
  return (
    <dl className="mb-6 grid grid-cols-3 gap-px overflow-hidden rounded-lg border bg-border max-[34rem]:grid-cols-1">
      {items.map((stat) => (
        <div
          key={stat.label + stat.note}
          className="bg-card px-[1.125rem] py-4"
        >
          <dt className="mb-1 text-[0.8125rem] text-muted-foreground">
            {stat.label}
          </dt>
          <dd className="text-2xl leading-[1.2] font-semibold tracking-[-0.02em]">
            {stat.value}
          </dd>
          <dd className="mt-0.5 text-[0.75rem] text-muted-foreground">
            {stat.note}
          </dd>
        </div>
      ))}
    </dl>
  )
}
