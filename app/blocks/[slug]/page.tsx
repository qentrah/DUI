import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"

import { SectionShell } from "@/components/site/section-shell"
import { BlockWorkspace } from "@/components/blocks/block-workspace"
import { getBlock, blockCatalog, getBlocksNavGroups } from "@/lib/catalog"

export function generateStaticParams() {
  return blockCatalog.map((item) => ({ slug: item.slug }))
}

export default async function BlockPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getBlock(slug)
  if (!item) notFound()

  const filePath = path.join(process.cwd(), "components", "blocks", item.source)
  const code = fs.readFileSync(filePath, "utf8")
  const variants = "variants" in item ? item.variants : undefined
  const variantCodes = variants ? Object.fromEntries(variants.map((variant) => [variant.id, fs.readFileSync(path.join(process.cwd(), "components", "blocks", variant.source), "utf8")])) : undefined

  return (
    <SectionShell
      active={item.slug}
      navGroups={getBlocksNavGroups()}
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

        <div id="preview" className="scroll-mt-24">
          <BlockWorkspace block={item} code={code} variantCodes={variantCodes} />
        </div>
      </div>
    </SectionShell>
  )
}
