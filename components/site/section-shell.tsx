"use client"

import * as React from "react"
import Link from "next/link"
import { X } from "lucide-react"

import { useLocale } from "@/components/site/locale-provider"
import { cn } from "@/lib/utils"

interface LinkItem {
  label: string
  href: string
}

interface NavGroup {
  title: string
  links: readonly LinkItem[] | LinkItem[]
}

interface SectionShellProps {
  children: React.ReactNode
  active?: string
  onThisPage?: Array<{ label: string; href: string }>
  navGroups: NavGroup[]
}

function SidebarContent({
  active,
  navGroups,
  onNavigate
}: {
  active?: string
  navGroups: NavGroup[]
  onNavigate?: () => void
}) {
  const linkClass = (isActive: boolean) =>
    cn(
      "block rounded-md px-2 py-1.5 text-sm transition-colors",
      isActive
        ? "font-medium text-foreground bg-accent/40"
        : "text-muted-foreground hover:text-foreground"
    )

  return (
    <div className="space-y-6">
      {navGroups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-2 text-sm font-semibold text-foreground">{group.title}</p>
          <nav className="space-y-0.5">
            {group.links.map((link) => {
              const isUrlActive =
                active === link.label.toLowerCase() ||
                active === link.href.split("/").pop() ||
                (link.href.includes("#") && active === link.href.split("#")[1])

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onNavigate}
                  className={linkClass(isUrlActive)}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      ))}
    </div>
  )
}

export function SectionShell({
  children,
  active,
  onThisPage = [],
  navGroups
}: SectionShellProps) {
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
              <SidebarContent active={active} navGroups={navGroups} />
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
          {onThisPage.length > 0 && (
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
          )}
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
              <SidebarContent
                active={active}
                navGroups={navGroups}
                onNavigate={() => setSidebarOpen(false)}
              />
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </main>
  )
}
