import Link from "next/link"

import { SectionShell } from "@/components/site/section-shell"
import { getDocsNavGroups, getGroupedComponents, isNewComponent } from "@/lib/catalog"

export default function ComponentsPage() {
  const groups = getGroupedComponents()
  const newItems = groups.flatMap((group) => group.items).filter((item) => isNewComponent(item.slug))

  return (
    <SectionShell
      active="components"
      navGroups={getDocsNavGroups()}
      onThisPage={[
        { label: "New Components", href: "#new-components" },
        { label: "All Components", href: "#all-components" }
      ]}
    >
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-semibold tracking-[-0.04em]">Components</h1>
        <p className="mt-4 max-w-xl leading-7 text-zinc-400">
          All installable components in the DUI library. Each page includes variants, responsive previews, source code, and its shadcn CLI command.
        </p>

        <section id="new-components" className="mt-10 scroll-mt-24">
          <h2 className="text-xl font-semibold">New Components</h2>
          <div className="mt-5 grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3">
            {newItems.map((item) => (
              <Link key={item.slug} href={`/components/${item.slug}`} className="text-zinc-300 transition hover:text-white">
                {item.name} <span className="ms-1 inline-block size-1.5 rounded-full bg-blue-500 align-middle" />
              </Link>
            ))}
          </div>
        </section>

        <section id="all-components" className="mt-12 scroll-mt-24">
          <h2 className="text-xl font-semibold">All Components</h2>
          <div className="mt-6 space-y-10">{groups.map(({ group, items }) => <section key={group}><h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{group}</h3><div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3">{items.map((item) => <Link key={item.slug} href={`/components/${item.slug}`} className="flex items-center gap-2 text-zinc-300 transition hover:text-white">{item.name}{isNewComponent(item.slug) && <span className="size-1.5 rounded-full bg-blue-500" aria-label="New component" />}</Link>)}</div></section>)}</div>
        </section>
      </div>
    </SectionShell>
  )
}
