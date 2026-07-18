import { notFound } from "next/navigation"

import { ComponentWorkbench } from "@/components/library/component-workbench"
import { SectionShell } from "@/components/site/section-shell"
import { componentCatalog, getComponent, getDocsNavGroups } from "@/lib/catalog"

export function generateStaticParams() {
  return componentCatalog.map((item) => ({ slug: item.slug }))
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getComponent(slug)
  if (!item) notFound()

  return (
    <SectionShell
      active={item.slug}
      navGroups={getDocsNavGroups()}
      onThisPage={[
        { label: "Preview", href: "#preview" },
        { label: "Installation", href: "#installation" },
        { label: "Usage", href: "#usage" }
      ]}
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium text-muted-foreground">Components / {item.category}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{item.name}</h1>
        <p className="mt-4 text-muted-foreground">{item.description}</p>

        <div id="preview" className="scroll-mt-24"><ComponentWorkbench slug={item.slug} /></div>
        <section id="usage" className="mt-12 scroll-mt-24 border-t border-border pt-10">
          <h2 className="text-2xl font-semibold">Usage</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Install the component, import it from your configured UI directory, and adapt the source to your product. Open the source panel under any example to copy that exact variant.
          </p>
        </section>
      </div>
    </SectionShell>
  )
}
