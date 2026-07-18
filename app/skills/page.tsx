import Link from "next/link"
import { Terminal } from "lucide-react"

import { SectionShell } from "@/components/site/section-shell"
import { referencedSkillCatalog, skillCatalog, getSkillsNavGroups } from "@/lib/catalog"

export default function SkillsPage() {
  return (
    <SectionShell
      active="introduction"
      navGroups={getSkillsNavGroups()}
      onThisPage={[
        { label: "What is Skills", href: "#what" },
        { label: "Skills Catalog", href: "#catalog" }
      ]}
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-medium text-muted-foreground">Library</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Skills</h1>
        
        <p id="what" className="mt-4 max-w-2xl scroll-mt-24 leading-7 text-muted-foreground">
          Skills are portable, version-controlled instructions and workflows for AI agents. 
          Use them to package specialized knowledge, design guidelines, code review checklists, and 
          scripts directly inside your team&apos;s code repository.
        </p>

        <section id="catalog" className="mt-12 scroll-mt-24">
          <h2 className="text-xl font-semibold border-b border-border pb-3">Qentrah skills</h2>
          
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {skillCatalog.map((item) => (
              <Link
                key={item.slug}
                href={`/skills/${item.slug}`}
                className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:bg-accent/40 hover:border-foreground/20"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-[10px] text-muted-foreground bg-zinc-800/40 px-2 py-0.5 rounded border border-zinc-700/20">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Created by {item.creator.name} for Qentrah
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Terminal className="size-3.5 text-zinc-500" />
                  <span>npx @qentrah/skills add {item.slug}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold border-b border-border pb-3">Referenced favorites</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            These are not Qentrah skills. Their cards always link to the original creator&apos;s repository.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {referencedSkillCatalog.map((item) => (
              <a
                key={item.name}
                href={item.repository}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:bg-accent/40"
              >
                <p className="text-xs font-medium text-muted-foreground">Reference · {item.category}</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <p className="mt-4 text-xs text-muted-foreground">Created by {item.creator}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </SectionShell>
  )
}
