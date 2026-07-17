import Link from "next/link"

import { DocsShell } from "@/components/docs/docs-shell"
import { componentCatalog } from "@/lib/catalog"

export default function ComponentsPage() {
  const newItems = componentCatalog.slice(-8)

  return (
    <DocsShell active="components" onThisPage={[
      { label: "New Components", href: "#new-components" },
      { label: "All Components", href: "#all-components" }
    ]}>
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
          <div className="mt-5 grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3">
            {componentCatalog.map((item) => (
              <Link key={item.slug} href={`/components/${item.slug}`} className="text-zinc-300 transition hover:text-white">
                {item.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </DocsShell>
  )
}
