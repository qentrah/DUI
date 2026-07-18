import Link from "next/link"
import { Terminal } from "lucide-react"

import { SectionShell } from "@/components/site/section-shell"
import { blockCatalog, getBlocksNavGroups } from "@/lib/catalog"

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
          
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {blockCatalog.map((item) => (
              <Link
                key={item.slug}
                href={`/blocks/${item.slug}`}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:bg-accent/40 hover:border-foreground/20"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="mt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                      Uses primitives
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.components.map((name) => (
                        <span
                          key={name}
                          className="inline-block rounded-md bg-zinc-800/40 border border-zinc-700/30 px-2 py-0.5 text-xs text-zinc-300"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Terminal className="size-3.5 text-zinc-500" />
                  <span>npx shadcn add blocks-{item.slug}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </SectionShell>
  )
}
