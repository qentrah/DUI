"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Boxes, Layout, Sparkles, Github, Search, Code, Copy, Zap } from "lucide-react"

import { CopyCommand } from "@/components/site/copy-command"
import { ThemeProvider } from "@/components/ui/theme-provider"

import { useLocale } from "@/components/site/locale-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: BookOpen,
    href: "/docs",
    en: "Documentation",
    ar: "التوثيق",
    enDetail: "Installation, theming and usage.",
    arDetail: "التثيبت والتخصيص والاستخدام.",
  },
  {
    icon: Boxes,
    href: "/components",
    en: "Components",
    ar: "المكوّنات",
    enDetail: "Browse and preview every primitive.",
    arDetail: "تصفح المعاينات لكل المكوّن.",
  },
  {
    icon: Layout,
    href: "/blocks",
    en: "Blocks",
    ar: "بلوكس",
    enDetail: "Explore responsive pre-built layout blocks.",
    arDetail: "استكشاف البلوكس المع جاهزة والمتجاوبة.",
  },
  {
    icon: Sparkles,
    href: "/skills",
    en: "Skills",
    ar: "المهارات",
    enDetail: "Install reusable agent workflow templates.",
    arDetail: "تثبيت قوالب مهارات الوكيل القابلة لإعادة الاستخدام.",
  },
]

const howItWorks = [
  {
    icon: Search,
    en: "Browse Components",
    ar: "تصفح المكوّنات",
    enDetail: "Explore our library of accessible, themeable React components.",
    arDetail: "استكشف مكتبتنا من المكوّنات المتاحة والقابلة للتخصيص.",
  },
  {
    icon: Code,
    en: "Preview & Customize",
    ar: "معاينة وتخصيص",
    enDetail: "See live previews with multiple variants and customize to your needs.",
    arDetail: "شاهد المعاينات الحية بأنواع متعددة وخصص لتناسب احتياجاتك.",
  },
  {
    icon: Copy,
    en: "Copy Source Code",
    ar: "نسخ الكود",
    enDetail: "Copy the component source directly from the documentation.",
    arDetail: "انسخ مصدر المكوّن مباشرة من التوثيق.",
  },
  {
    icon: Zap,
    en: "Install via CLI",
    ar: "تثبيت عبر سطر الأوامر",
    enDetail: "Use the shadcn CLI to add components with a single command.",
    arDetail: "استخدم أداة سطر الأوامر لإضافة المكوّنات بأمر واحد.",
  },
]

export default function HomePage() {
  const { isArabic } = useLocale()

  return (
    <ThemeProvider>
      <main className="bg-background text-foreground">
        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="relative border-b border-border">
          <div className="mx-auto flex min-h-[560px] max-w-4xl flex-col items-center justify-center px-5 py-24 text-center">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground">DUI</span>
              <Badge variant="outline" className="text-xs">
                v0.2.0
              </Badge>
            </div>

            <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              {isArabic ? "واجهة واحدة، لكل منتج." : "Beautiful React components for modern apps."}
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              {isArabic
                ? "مكوّنات React بسيطة ومتاحة المصدر، مصممة للعربية والإنجليزية وتُثبّت مباشرة باستخدام shadcn CLI."
                : "Beautifully designed, accessible components built on React Aria. Bi-directional. Themeable. Copy-paste ready."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/docs">
                <Button size="lg">
                  {isArabic ? "ابدأ الاستخدام" : "Get Started"}
                  <ArrowRight className={cn("ml-2 size-4", isArabic && "rotate-180 mr-2 ml-0")} />
                </Button>
              </Link>
              <Link href="/components">
                <Button size="lg" variant="outline">
                  {isArabic ? "تصفح المكوّنات" : "Browse Components"}
                </Button>
              </Link>
            </div>

            <div className="mt-12 w-full max-w-xl text-start">
              <CopyCommand command="npx shadcn@latest add qentrah/DUI/button" />
            </div>
          </div>
        </section>

        {/* ── Theme System ────────────────────────────────────────── */}
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="text-2xl font-bold tracking-tight">
              {isArabic ? "نظام ألوان موحد" : "Unified Color System"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {isArabic
                ? "مكوّنات بألوان قابلة للتخصيص بسهولة."
                : "Components with themeable colors for every state and context."}
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="size-8 rounded-lg bg-primary" />
              <div className="size-8 rounded-lg bg-secondary" />
              <div className="size-8 rounded-lg bg-success" />
              <div className="size-8 rounded-lg bg-warning" />
              <div className="size-8 rounded-lg bg-destructive" />
            </div>
          </div>
        </section>

        {/* ── How It Works ────────────────────────────────────────── */}
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-5xl px-5">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                {isArabic ? "كيف يعمل" : "How It Works"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {isArabic
                  ? "خطوات بسيطة لإضافة المكوّنات إلى مشروعك."
                  : "Simple steps to add components to your project."}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((step, idx) => {
                const Icon = step.icon
                return (
                  <Card key={step.en}>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground">{idx + 1}</span>
                      </div>
                      <h3 className="mt-4 text-sm font-semibold">{isArabic ? step.ar : step.en}</h3>
                      <p className="mt-1.5 text-xs text-muted-foreground">{isArabic ? step.arDetail : step.enDetail}</p>
                    </CardContent>
                  </Card>
                )
              })}
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
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{isArabic ? feature.arDetail : feature.enDetail}</p>
                    <ArrowRight
                      className={cn(
                        "mt-auto pt-4 size-4 text-muted-foreground transition group-hover:translate-x-1",
                        isArabic && "rotate-180 group-hover:-translate-x-1"
                      )}
                    />
                  </div>
                )
                return feature.href.startsWith("http") ? (
                  <a key={feature.en} href={feature.href}>
                    {content}
                  </a>
                ) : (
                  <Link key={feature.en} href={feature.href}>
                    {content}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </ThemeProvider>
  )
}