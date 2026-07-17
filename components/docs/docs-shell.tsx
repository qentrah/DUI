"use client"

import Link from "next/link"
import { X } from "lucide-react"

import { componentCatalog, blockCatalog } from "@/lib/catalog"
import { useLocale } from "@/components/site/locale-provider"
import { cn } from "@/lib/utils"

const gettingStarted = [
  { label: "Introduction", href: "/docs" },
  { label: "Installation", href: "/docs#installation" },
  { label: "Theming", href: "/docs#theming" },
  { label: "CLI", href: "/docs#cli" },
  { label: "RTL and Arabic", href: "/docs#rtl" },
  { label: "Registry", href: "/docs#registry" }
]

function SidebarContent({
  active,
  onNavigate
}: {
  active?: string
  onNavigate?: () => void
}) {
  const linkClass = (isActive: boolean) =>
    cn(
      "block rounded-md px-2 py-1.5 text-sm transition-colors",
      isActive
        ? "font-medium text-foreground"
        : "text-muted-foreground hover:text-foreground"
    )

  return (
    <div className="space-y-6">
      {/* Getting started */}
      <div>
        <p className="mb-2 px-2 text-sm font-semibold text-foreground">Getting Started</p>
        <nav className="space-y-0.5">
          {gettingStarted.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onNavigate}
              className={linkClass(active === link.label.toLowerCase())}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Components */}
      <div>
        <p className="mb-2 px-2 text-sm font-semibold text-foreground">Components</p>
        <nav className="space-y-0.5">
          {componentCatalog.map((item) => (
            <Link
              key={item.slug}
              href={`/components/${item.slug}`}
              onClick={onNavigate}
              className={linkClass(active === item.slug)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Blocks */}
      <div>
        <p className="mb-2 px-2 text-sm font-semibold text-foreground">Blocks</p>
        <nav className="space-y-0.5 pb-8">
          {blockCatalog.map((item) => (
            <Link
              key={item.slug}
              href={`/blocks/${item.slug}`}
              onClick={onNavigate}
              className={linkClass(active === item.slug)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export function DocsShell({
  children,
  active,
  onThisPage = []
}: {
  children: React.ReactNode
  active?: string
  onThisPage?: Array<{ label: string; href: string }>
}) {
  const { sidebarOpen, setSidebarOpen } = useLocale()

  return (
    <main className="bg-background text-foreground relative">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1400px] lg:grid-cols-[220px_1fr] xl:grid-cols-[220px_1fr_200px]">
        {/* Spacer for the fixed sidebar */}
        <div className="hidden lg:block" aria-hidden="true" />

        {/* Desktop sidebar */}
        <aside className="docs-sidebar hidden border-e border-border lg:block">
          <div className="relative h-full">
            {/* Top gradient fade */}
            <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10" />
            
            {/* Scrollable area */}
            <div className="h-full overflow-y-auto py-6 pe-4 ps-2">
              <SidebarContent active={active} />
            </div>
            
            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
          </div>
        </aside>

        {/* Main content */}
        <article className="min-w-0 px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
          {children}
        </article>

        {/* Right sidebar — On This Page */}
        <aside className="hidden px-4 py-10 xl:block">
          <div className="sticky top-20">
            <p className="mb-3 text-sm font-semibold text-foreground">On This Page</p>
            <nav className="space-y-2">
              {onThisPage.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {/* Mobile navigation drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-200",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        {/* Backdrop */}
        <div
          onClick={() => setSidebarOpen(false)}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        {/* Drawer */}
        <div
          className={cn(
            "absolute inset-y-0 start-0 w-[280px] border-e border-border bg-background p-6 shadow-lg transition-transform duration-200 ease-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
          )}
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-semibold">Navigation</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-md p-1 text-muted-foreground hover:text-foreground"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="relative h-[calc(100%-3rem)]">
            {/* Top gradient fade */}
            <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10" />

            {/* Scrollable area */}
            <div className="h-full overflow-y-auto py-2">
              <SidebarContent active={active} onNavigate={() => setSidebarOpen(false)} />
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </main>
  )
}
