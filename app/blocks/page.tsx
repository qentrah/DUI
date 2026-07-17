import Link from "next/link"

import { DocsShell } from "@/components/docs/docs-shell"
import { blockCatalog } from "@/lib/catalog"

export default function BlocksIndexPage() {
  return (
    <DocsShell
      active="blocks"
      onThisPage={[
        { label: "What is Blocks", href: "#what" },
        { label: "Blocks", href: "#blocks" }
      ]}
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium text-muted-foreground">Library</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Blocks</h1>
        <p id="what" className="mt-4 max-w-2xl scroll-mt-24 leading-7 text-muted-foreground">
          Blocks are multi-component layouts built only from DUI primitives. Install a block when you want a
          ready-made dashboard panel, filter toolbar, or member list instead of composing every piece yourself.
        </p>

        <section id="blocks" className="mt-12 scroll-mt-24">
          <h2 className="text-xl font-semibold">Blocks</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {blockCatalog.map((item) => (
              <Link
                key={item.slug}
                href={`/blocks/${item.slug}`}
                className="rounded-2xl border border-border bg-card p-5 transition hover:border-foreground/20"
              >
                <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  Uses: {item.components.join(", ")}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
