import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { DocsShell } from "@/components/docs/docs-shell"
import { CopyCommand } from "@/components/site/copy-command"

export default function DocsPage() {
  return (
    <DocsShell active="introduction" onThisPage={[
      { label: "Installation", href: "#installation" },
      { label: "Project setup", href: "#setup" },
      { label: "Theming", href: "#theming" },
      { label: "RTL and Arabic", href: "#rtl" },
      { label: "Registry", href: "#registry" }
    ]}>
      <p className="text-sm font-medium text-zinc-500">Getting started</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Documentation</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
        DUI gives your team owned component source instead of another runtime dependency. Install only what you need and adapt it inside your application.
      </p>

      <div className="my-10 h-px bg-zinc-800" />

      <section id="installation" className="scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
        <p className="mt-3 leading-7 text-zinc-400">Initialize shadcn in your React project, then add components directly from the qentrah registry.</p>
        <div className="mt-5 space-y-3">
          <CopyCommand command="npx shadcn@latest init" />
          <CopyCommand command="npx shadcn@latest add qentrah/DUI/button" />
        </div>
      </section>

      <section id="setup" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">Project setup</h2>
        <div className="mt-5 space-y-4">
          {[
            "The CLI copies source into your configured components directory.",
            "Required npm dependencies are installed automatically.",
            "Aliases follow the consuming project’s components.json configuration."
          ].map((item) => (
            <div key={item} className="flex gap-3 text-sm leading-6 text-zinc-400">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="theming" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">Theming</h2>
        <p className="mt-3 leading-7 text-zinc-400">DUI uses a Zinc-first neutral palette. Components inherit your Tailwind tokens and remain easy to restyle inside the consuming application.</p>
      </section>

      <section id="rtl" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">RTL and Arabic</h2>
        <p className="mt-3 leading-7 text-zinc-400">
          DUI uses logical CSS properties such as <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">margin-inline-start</code> through Tailwind’s <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">ms-*</code> and <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">ps-*</code> utilities. Set <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-sm">dir=&quot;rtl&quot;</code> on the document for Arabic interfaces.
        </p>
      </section>

      <section id="registry" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl font-semibold tracking-tight">Registry workflow</h2>
        <p className="mt-3 leading-7 text-zinc-400">
          Every installable item is declared in the root registry.json and built into public/r for inspection and hosted usage.
        </p>
        <Link href="/components" className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
          Browse components <ArrowRight className="size-4" />
        </Link>
      </section>
    </DocsShell>
  )
}
