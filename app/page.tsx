"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Boxes, Layout, Sparkles, Github } from "lucide-react"

import { CopyCommand } from "@/components/site/copy-command"

import { useLocale } from "@/components/site/locale-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const features = [
  { icon: BookOpen, href: "/docs", en: "Documentation", ar: "التوثيق", detail: "Installation, theming and usage." },
  { icon: Boxes, href: "/components", en: "Components", ar: "المكوّنات", detail: "Browse and preview every primitive." },
  { icon: Layout, href: "/blocks", en: "Blocks", ar: "بلوكس", detail: "Explore responsive pre-built layout blocks." },
  { icon: Sparkles, href: "/skills", en: "Skills", ar: "المهارات", detail: "Install reusable agent workflow templates." }
]

export default function HomePage() {
  const { isArabic } = useLocale()

  return (
    <main className="bg-background text-foreground">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative border-b border-border">
        <div className="mx-auto flex min-h-[560px] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center">
          <p className="mb-5 text-sm text-muted-foreground">
            qentrah / DUI
          </p>

          <h1 className="max-w-2xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            {isArabic ? "واجهة واحدة، لكل منتج." : "Build your component library."}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
            {isArabic
              ? "مكوّنات React بسيطة ومتاحة المصدر، مصممة للعربية والإنجليزية وتُثبّت مباشرة باستخدام shadcn CLI."
              : "Beautifully designed components that you can copy and paste into your apps. Open Source. Bi-directional. Customizable."}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/docs">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {isArabic ? "ابدأ الاستخدام" : "Get Started"}
              </Button>
            </Link>
            <Link href="/components">
              <Button size="lg" variant="outline">
                {isArabic ? "تصفح المكوّنات" : "Components"}
              </Button>
            </Link>
          </div>

          <div className="mt-12 w-full max-w-xl text-start">
            <CopyCommand command="npx shadcn@latest add qentrah/DUI/button" />
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              const content = (
                <div className="group flex h-full flex-col bg-background p-5 transition hover:bg-accent">
                  <Icon className="size-5 text-muted-foreground" />
                  <h2 className="mt-6 text-sm font-semibold">{isArabic ? feature.ar : feature.en}</h2>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{feature.detail}</p>
                  <ArrowRight className={cn("mt-auto pt-4 size-4 text-muted-foreground transition group-hover:translate-x-1", isArabic && "rotate-180 group-hover:-translate-x-1")} />
                </div>
              )
              return feature.href.startsWith("http") ? (
                <a key={feature.en} href={feature.href}>{content}</a>
              ) : (
                <Link key={feature.en} href={feature.href}>{content}</Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
