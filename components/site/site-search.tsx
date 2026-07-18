"use client"

import * as React from "react"
import Link from "next/link"
import { BookOpen, Boxes, FileText, Search, Sparkles } from "lucide-react"

import { componentCatalog } from "@/lib/catalog"

const pages = [
  { label: "Documentation", description: "Introduction and project setup", href: "/docs", icon: BookOpen },
  { label: "Installation", description: "Install with the shadcn CLI", href: "/docs#installation", icon: FileText },
  { label: "Theming", description: "Zinc tokens and customization", href: "/docs#theming", icon: FileText },
  { label: "RTL and Arabic", description: "Direction and bilingual interfaces", href: "/docs#rtl", icon: FileText },
  { label: "Component directory", description: "Browse every DUI component", href: "/components", icon: Boxes },
  { label: "Skills", description: "Install reusable agent workflows", href: "/skills", icon: Sparkles }
]

const searchableItems = [
  ...pages,
  ...componentCatalog.map((item) => ({
    label: item.name,
    description: item.description,
    href: `/components/${item.slug}`,
    icon: Boxes
  }))
]

export function SiteSearch() {
  const [query, setQuery] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function close(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  React.useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen(true)
        requestAnimationFrame(() => rootRef.current?.querySelector<HTMLInputElement>("input")?.focus())
      }
    }
    window.addEventListener("keydown", handleShortcut)
    return () => window.removeEventListener("keydown", handleShortcut)
  }, [])

  const normalized = query.trim().toLowerCase()
  const results = searchableItems
    .filter((item) => !normalized || `${item.label} ${item.description}`.toLowerCase().includes(normalized))
    .slice(0, 8)

  return (
    <div ref={rootRef} className="relative w-full max-w-xs">
      <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
      <input
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false)
        }}
        placeholder="Search DUI..."
        aria-label="Search documentation"
        className="h-9 w-full rounded-lg border border-zinc-800 bg-zinc-900 ps-9 pe-12 text-sm text-zinc-200 outline-none placeholder:text-zinc-500 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
      />
      <kbd className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">⌘K</kbd>
      {open && (
        <div className="absolute end-0 top-11 z-50 w-[360px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl">
          <p className="px-2 pb-2 pt-1 text-xs font-medium text-zinc-500">{normalized ? "Search results" : "Quick links"}</p>
          {results.length ? results.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-zinc-900">
                <Icon className="mt-0.5 size-4 shrink-0 text-zinc-500" />
                <span>
                  <span className="block text-sm text-zinc-200">{item.label}</span>
                  <span className="mt-0.5 block text-xs text-zinc-500">{item.description}</span>
                </span>
              </Link>
            )
          }) : (
            <p className="px-2 py-8 text-center text-sm text-zinc-500">No documentation found.</p>
          )}
        </div>
      )}
    </div>
  )
}
