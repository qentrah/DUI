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

  // Read block source code directly from the filesystem (RSC/build-time execution)
  const filePath = path.join(process.cwd(), "components", "blocks", `${slug}.tsx`)
  let code = ""
  try {
    code = fs.readFileSync(filePath, "utf8")
  } catch (error) {
    console.error(`Failed to read code for block: ${slug}`, error)
  }

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
          <BlockWorkspace block={item} code={code} />
        </div>
      </div>
    </SectionShell>
  )
}
