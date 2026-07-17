import { notFound } from "next/navigation"

import { DocsShell } from "@/components/docs/docs-shell"
import { BlockPreview } from "@/components/library/block-preview"
import { CopyCommand } from "@/components/site/copy-command"
import { getBlock, blockCatalog } from "@/lib/catalog"

export function generateStaticParams() {
  return blockCatalog.map((item) => ({ slug: item.slug }))
}

export default async function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getBlock(slug)
  if (!item) notFound()

  return (
    <DocsShell
      active="blocks"
      onThisPage={[
        { label: "Preview", href: "#preview" },
        { label: "Installation", href: "#installation" },
        { label: "Composition", href: "#composition" }
      ]}
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium text-muted-foreground">Blocks</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{item.name}</h1>
        <p className="mt-4 text-muted-foreground">{item.description}</p>

        <section id="preview" className="mt-10 scroll-mt-24">
          <h2 className="text-xl font-semibold">Preview</h2>
          <div className="mt-5 overflow-hidden rounded-xl border border-border bg-background p-6 sm:p-10">
            <BlockPreview slug={item.slug} />
          </div>
        </section>

        <section id="installation" className="mt-12 scroll-mt-24 border-t border-border pt-10">
          <h2 className="text-2xl font-semibold">Installation</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Install the block and its primitive dependencies with the shadcn CLI.
          </p>
          <div className="mt-5">
            <CopyCommand command={`npx shadcn@latest add qentrah/DUI/blocks-${item.slug}`} />
          </div>
        </section>

        <section id="composition" className="mt-12 scroll-mt-24 border-t border-border pt-10">
          <h2 className="text-2xl font-semibold">Composition</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            This block is application-independent. It only imports DUI UI primitives and exposes typed props/callbacks.
            Wire data, auth, and routing in your app.
          </p>
          <ul className="mt-4 list-disc space-y-1 ps-5 text-sm text-muted-foreground">
            {item.components.map((name) => (
              <li key={name}>
                <code className="text-foreground">{name}</code>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </DocsShell>
  )
}
