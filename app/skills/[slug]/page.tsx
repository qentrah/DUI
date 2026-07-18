import { notFound } from "next/navigation"

import { SectionShell } from "@/components/site/section-shell"
import { SkillWorkspace } from "@/components/library/skill-workspace"
import { getSkill, skillCatalog, getSkillsNavGroups } from "@/lib/catalog"

export function generateStaticParams() {
  return skillCatalog.map((item) => ({ slug: item.slug }))
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getSkill(slug)
  if (!item) notFound()

  return (
    <SectionShell
      active={item.slug}
      navGroups={getSkillsNavGroups()}
      onThisPage={[
        { label: "Instructions", href: "#instructions" },
        { label: "Installation", href: "#installation" }
      ]}
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium text-muted-foreground">Skills / {item.category}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{item.name}</h1>
        <p className="mt-4 text-muted-foreground">{item.description}</p>

        <div id="instructions" className="scroll-mt-24">
          <SkillWorkspace skill={item} />
        </div>
      </div>
    </SectionShell>
  )
}
