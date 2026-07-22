import Link from "next/link"
import { Terminal } from "lucide-react"

import { SectionShell } from "@/components/site/section-shell"
import { getBlocksNavGroups, getGroupedBlocks, isNewBlock } from "@/lib/catalog"

export default function BlocksIndexPage() {
  return (
    <SectionShell
      active="introduction"
      navGroups={getBlocksNavGroups()}
      onThisPage={[
        { label: "What is Blocks", href: "#what" },
        { label: "All Blocks", href: "#blocks" }
      ]}
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium text-muted-foreground">Library</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Blocks</h1>
        
        <p id="what" className="mt-4 max-w-2xl scroll-mt-24 leading-7 text-muted-foreground">
          Blocks are ready-to-use, responsive layouts built entirely from DUI primitives. 
          Install a block using the shadcn CLI when you want a dashboard panel, a search filter toolbar, 
          or directory list instead of composing every piece yourself.
        </p>

        <section id="blocks" className="mt-12 scroll-mt-24">
          <h2 className="text-xl font-semibold border-b border-border pb-3">Blocks catalog</h2>
          
          <div className="mt-8 space-y-10">
            {getGroupedBlocks().map(({ group, items }) => (
              <section key={group} aria-labelledby={`group-${group.toLowerCase().replace(" ", "-")}`}>
                <h3 id={`group-${group.toLowerCase().replace(" ", "-")}`} className="text-sm font-semibold text-muted-foreground">{group}</h3>
                <div className="mt-3 divide-y divide-border border-y border-border">
                  {items.map((item) => (
              <Link
                key={item.slug}
                href={`/blocks/${item.slug}`}
                className="group grid gap-4 py-5 transition-colors hover:bg-accent/30 sm:grid-cols-[1fr_auto] sm:px-3"
              >
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-foreground">
                    {item.name}
                    {isNewBlock(item.slug) && <span className="size-1.5 rounded-full bg-primary" aria-label="New block" />}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-center text-xs font-mono text-muted-foreground">
                  <Terminal className="size-3.5" />
                  <span>blocks-{item.slug}</span>
                </div>
              </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </SectionShell>
  )
}
