"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

import { useLocale } from "@/components/site/locale-provider"
import { cn } from "@/lib/utils"

interface LinkItem {
  label: string
  href: string
  isNew?: boolean
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

interface SidebarContentProps {
  active?: string
  activeHref: string
  navGroups: NavGroup[]
  onNavigate: (href: string) => void
}

function SidebarContent({ active, activeHref, navGroups, onNavigate }: SidebarContentProps) {
  return (
    <div className="space-y-6">
      {navGroups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-2 text-xs font-semibold text-foreground">{group.title}</p>
          <nav className="space-y-0.5">
            {group.links.map((link) => {
              const hrefWithoutHash = link.href.split("#")[0] || "/"
              const isUrlActive =
                activeHref === link.href ||
                (activeHref === hrefWithoutHash && !link.href.includes("#")) ||
                (!activeHref.includes("#") && (
                  active === link.label.toLowerCase() ||
                  active === link.href.split("/").pop()
                ))

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => onNavigate(link.href)}
                  className={cn(
                    "block rounded-md px-2 py-1.5 text-sm transition-colors",
                    isUrlActive
                      ? "bg-accent/60 font-medium text-foreground"
                      : "text-muted-foreground hover:bg-accent/30 hover:text-foreground"
                  )}
                  aria-current={isUrlActive ? "page" : undefined}
                >
                  <span className="flex items-center gap-2">{link.label}{link.isNew && <span className="size-1.5 rounded-full bg-blue-500" aria-label="New component" />}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      ))}
    </div>
  )
}

export function SectionShell({ children, active, onThisPage = [], navGroups }: SectionShellProps) {
  const { sidebarOpen, setSidebarOpen } = useLocale()
  const pathname = usePathname()
  const navigationScrollRef = React.useRef<HTMLDivElement>(null)
  const [activeHref, setActiveHref] = React.useState(pathname)

  React.useEffect(() => {
    const syncUrl = () => setActiveHref(`${pathname}${window.location.hash}`)
    syncUrl()
    window.addEventListener("hashchange", syncUrl)
    return () => window.removeEventListener("hashchange", syncUrl)
  }, [pathname])

  React.useEffect(() => {
    const sectionIds = navGroups
      .flatMap((group) => group.links)
      .filter((link) => link.href.startsWith(`${pathname}#`))
      .map((link) => link.href.split("#")[1])
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visibleSection) setActiveHref(`${pathname}#${visibleSection.target.id}`)
      },
      { rootMargin: "-20% 0px -65% 0px" }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [navGroups, pathname])

  React.useEffect(() => {
    const scrollArea = navigationScrollRef.current
    const activeLink = scrollArea?.querySelector<HTMLAnchorElement>('[aria-current="page"]')
    if (!scrollArea || !activeLink) return

    const areaRect = scrollArea.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()
    const linkIsVisible = linkRect.top >= areaRect.top + 24 && linkRect.bottom <= areaRect.bottom - 24
    if (linkIsVisible) return

    scrollArea.scrollTo({
      top: scrollArea.scrollTop + linkRect.top - areaRect.top - areaRect.height / 2 + linkRect.height / 2,
      behavior: "smooth",
    })
  }, [activeHref])

  const handleNavigate = (href: string) => {
    setActiveHref(href)
    setSidebarOpen(false)
  }

  return (
    <main className="relative bg-background text-foreground">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1400px] lg:grid-cols-[220px_1fr] xl:grid-cols-[220px_1fr_200px]">
        <aside className="hidden self-start border-e border-border lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)]">
          <div className="relative h-full">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-background via-background/80 to-transparent" />
            <div ref={navigationScrollRef} className="docs-navigation-scroll h-full overflow-y-auto py-6 pe-4 ps-2">
              <SidebarContent active={active} activeHref={activeHref} navGroups={navGroups} onNavigate={handleNavigate} />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        </aside>

        <article className="min-w-0 px-5 py-10 sm:px-8 lg:px-10 lg:py-12">{children}</article>

        <aside className="hidden px-4 py-10 xl:block">
          {onThisPage.length > 0 && (
            <div className="sticky top-20">
              <p className="mb-3 text-xs font-semibold text-foreground">On This Page</p>
              <nav className="space-y-2">
                {onThisPage.map((item) => (
                  <a key={item.href} href={item.href} className="block text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </aside>
      </div>

      <div className={cn("fixed inset-0 z-50 transition-opacity duration-200 lg:hidden", sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0")}>
        <div onClick={() => setSidebarOpen(false)} className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        <div className={cn("absolute inset-y-0 start-0 w-[280px] border-e border-border bg-background p-6 shadow-lg transition-transform duration-200 ease-out", sidebarOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full")}>
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-semibold">Navigation</span>
            <button onClick={() => setSidebarOpen(false)} className="rounded-md p-1 text-muted-foreground hover:text-foreground" aria-label="Close menu">
              <X className="size-4" />
            </button>
          </div>
          <div className="relative h-[calc(100%-3rem)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-background via-background/80 to-transparent" />
            <div className="docs-navigation-scroll h-full overflow-y-auto py-2">
              <SidebarContent active={active} activeHref={activeHref} navGroups={navGroups} onNavigate={handleNavigate} />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        </div>
      </div>
    </main>
  )
}
