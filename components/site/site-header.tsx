"use client"

import Link from "next/link"
import { BookOpen, ChevronDown, Github, Languages, Menu, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/components/site/locale-provider"
import { SiteSearch } from "@/components/site/site-search"
import { componentCatalog } from "@/lib/catalog"

const navigation = [
  { href: "/docs", en: "Documentation", ar: "التوثيق", icon: BookOpen },
  { href: "/skills", en: "Skills", ar: "المهارات", icon: Sparkles },
]

export function SiteHeader() {
  const { locale, setLocale, isArabic, setSidebarOpen } = useLocale()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 text-foreground backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-5 px-5">
        <Button
          variant="ghost"
          size="sm"
          onPress={() => setSidebarOpen((prev) => !prev)}
          className="inline-flex size-9 items-center justify-center p-0 lg:hidden border border-border bg-card hover:bg-accent text-foreground"
          aria-label="Toggle navigation menu"
        >
          <Menu className="size-5" />
        </Button>

        <Link href="/" className="flex items-center rounded-md bg-white px-1.5 py-1 ring-1 ring-border" aria-label="DUI home">
          <Image src="/logo.png" alt="DUI" width={40} height={40} className="h-8 w-auto" priority unoptimized />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/docs"
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            <BookOpen className="size-3.5" />
            {isArabic ? "التوثيق" : "Documentation"}
          </Link>
          <div className="group/menu relative">
            <Link
              href="/components"
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
            >
              {isArabic ? "المكوّنات" : "Components"}
              <ChevronDown className="size-3.5 transition group-hover/menu:rotate-180" />
            </Link>
            <div className="pointer-events-none invisible absolute start-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2 opacity-0 transition duration-150 group-hover/menu:pointer-events-auto group-hover/menu:visible group-hover/menu:opacity-100 group-focus-within/menu:pointer-events-auto group-focus-within/menu:visible group-focus-within/menu:opacity-100">
              <div className="rounded-xl border border-border bg-popover p-2 shadow-2xl">
                <Link href="/components" className="mb-1 block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent">
                  {isArabic ? "عرض جميع المكوّنات" : "Browse all components"}
                </Link>
                <div className="h-px bg-border" />
                <div className="grid grid-cols-2 gap-1 pt-1">
                  {componentCatalog.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/components/${item.slug}`}
                      className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/blocks"
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            {isArabic ? "بلوكس" : "Blocks"}
          </Link>
          {navigation.map((item) => {
            const Icon = item.icon
            if (item.href === "/docs") return null
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="size-3.5" />
                {isArabic ? item.ar : item.en}
              </Link>
            )
          })}
        </nav>

        <div className="ms-auto">
          <SiteSearch />
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onPress={() => setLocale(locale === "en" ? "ar" : "en")}
            aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
            className="border border-border bg-card text-card-foreground hover:bg-accent"
          >
            <Languages className="size-4" />
            <span className="ms-2">{isArabic ? "English" : "العربية"}</span>
          </Button>
          <a
            href="https://github.com/qentrah/DUI"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-card-foreground transition hover:bg-accent"
            aria-label="Open qentrah DUI on GitHub"
          >
            <Github className="size-4" />
            <span className="hidden xl:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  )
}