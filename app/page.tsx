"use client"

import NextImage from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Blocks,
  Bot,
  Check,
  Code2,
  Component,
  Languages,
  LayoutTemplate,
  Palette,
  Terminal,
} from "lucide-react"

import { useLocale } from "@/components/site/locale-provider"
import { CopyCommand } from "@/components/site/copy-command"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { cn } from "@/lib/utils"

const libraryGroups = [
  {
    icon: Component,
    title: "Interface primitives",
    titleAr: "مكوّنات الواجهة",
    description: "Buttons, inputs, menus, tables, sidebars, charts, and the small pieces products need every day.",
    descriptionAr: "الأزرار والحقول والقوائم والجداول والأشرطة الجانبية والرسوم وكل ما يحتاجه المنتج يومياً.",
    items: ["Button", "Dropdown", "Sidebar", "Table", "Chart", "Modal"],
  },
  {
    icon: Bot,
    title: "AI product components",
    titleAr: "مكوّنات منتجات الذكاء الاصطناعي",
    description: "Purpose-built surfaces for prompts, responses, tools, code, model selection, and public chat.",
    descriptionAr: "واجهات مصممة للمطالبات والردود والأدوات والكود واختيار النموذج والمحادثة العامة.",
    items: ["Composer", "AI Composer", "Code Viewer", "Resizable", "Cursor", "Search Input"],
  },
  {
    icon: LayoutTemplate,
    title: "Complete blocks",
    titleAr: "بلوكس متكاملة",
    description: "Responsive sections assembled from DUI primitives and registered with their dependencies.",
    descriptionAr: "أقسام متجاوبة مبنية من مكوّنات DUI ومسجلة مع جميع اعتمادياتها.",
    items: ["Sign In", "Hero", "Feature Grid", "Testimonials", "Gallery", "FAQ"],
  },
]

const foundations = [
  {
    icon: Languages,
    title: "English and Arabic",
    titleAr: "العربية والإنجليزية",
    description: "Direction-aware layouts and documentation for LTR and RTL products.",
    descriptionAr: "تخطيطات وتوثيق يدعمان اتجاهي LTR وRTL.",
  },
  {
    icon: Palette,
    title: "Token-based theming",
    titleAr: "تخصيص قائم على المتغيرات",
    description: "Light, dark, and custom themes without hard-coded product colors.",
    descriptionAr: "سمات فاتحة وداكنة ومخصصة دون ألوان ثابتة داخل المكوّنات.",
  },
  {
    icon: Code2,
    title: "Source you own",
    titleAr: "كود تملكه بالكامل",
    description: "Install readable React source into your project and adapt it to your system.",
    descriptionAr: "ثبّت كود React واضحاً داخل مشروعك وعدّله ليتوافق مع نظامك.",
  },
]

const installSteps = [
  ["01", "Choose a component or block", "اختر مكوّناً أو بلوك"],
  ["02", "Install it with the shadcn CLI", "ثبّته باستخدام shadcn CLI"],
  ["03", "Edit the source in your project", "عدّل الكود داخل مشروعك"],
]

export default function HomePage() {
  const { isArabic } = useLocale()

  return (
    <ThemeProvider>
      <main className="bg-background text-foreground">
        {/* Hero intentionally preserved. */}
        <section className="relative border-b border-border">
          <div className="mx-auto flex min-h-[560px] max-w-4xl flex-col items-center justify-center px-5 py-24 text-center">
            <div className="mb-6 flex items-center gap-3">
              <NextImage src="/logo.png" alt="DUI" width={40} height={40} className="h-8 w-auto" priority unoptimized />
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
                  <ArrowRight className={cn("ml-2 size-4", isArabic && "mr-2 ml-0 rotate-180")} />
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

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {isArabic ? "المكتبة" : "The library"}
                </p>
                <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
                  {isArabic ? "من الأساسيات إلى واجهات المنتجات الكاملة." : "From primitives to complete product surfaces."}
                </h2>
                <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
                  {isArabic
                    ? "نظام واحد واضح لبناء واجهات التطبيقات والذكاء الاصطناعي دون البدء من الصفر."
                    : "One coherent system for application and AI interfaces, without rebuilding the same foundations for every product."}
                </p>
              </div>

              <div className="border-t border-border">
                {libraryGroups.map((group) => {
                  const Icon = group.icon
                  return (
                    <article key={group.title} className="grid gap-5 border-b border-border py-8 sm:grid-cols-[1fr_1.1fr]">
                      <div className="flex gap-4">
                        <Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">{isArabic ? group.titleAr : group.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {isArabic ? group.descriptionAr : group.description}
                          </p>
                        </div>
                      </div>
                      <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:ps-6">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <Check className="size-3.5 text-muted-foreground" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {isArabic ? "مصمم للنظام الحقيقي" : "Built for a real system"}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {isArabic ? "مرن في المنتج، واضح في الكود." : "Flexible in the product. Predictable in the codebase."}
              </h2>
            </div>

            <div className="mt-12 grid border-y border-border md:grid-cols-3">
              {foundations.map((foundation, index) => {
                const Icon = foundation.icon
                return (
                  <article
                    key={foundation.title}
                    className={cn("py-8 md:px-8", index > 0 && "border-t border-border md:border-s md:border-t-0", index === 0 && "md:ps-0")}
                  >
                    <Icon className="size-5 text-muted-foreground" />
                    <h3 className="mt-8 font-semibold">{isArabic ? foundation.titleAr : foundation.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {isArabic ? foundation.descriptionAr : foundation.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-24 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Terminal className="size-4" />
                {isArabic ? "من السجل إلى مشروعك" : "Registry to project"}
              </div>
              <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
                {isArabic ? "ثبّت ما تحتاجه فقط." : "Install only what you need."}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
                {isArabic
                  ? "كل مكوّن وبلوك مسجل للاستخدام عبر CLI. عند تثبيت بلوك، تُضاف اعتماديات DUI اللازمة معه."
                  : "Every component and block is available through the CLI. Installing a block also resolves the DUI primitives it depends on."}
              </p>
              <div className="mt-8 max-w-xl">
                <CopyCommand command="npx shadcn@latest add qentrah/DUI/blocks-sign-in" />
              </div>
            </div>

            <ol className="border-t border-border">
              {installSteps.map(([number, label, labelAr]) => (
                <li key={number} className="grid grid-cols-[3rem_1fr] items-center border-b border-border py-6">
                  <span className="font-mono text-xs text-muted-foreground">{number}</span>
                  <span className="font-medium">{isArabic ? labelAr : label}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section>
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-20 sm:flex-row sm:items-end sm:py-24">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Blocks className="size-4" />
                {isArabic ? "ابدأ البناء" : "Start building"}
              </div>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                {isArabic ? "استكشف النظام من المكان المناسب لك." : "Explore the system from the place that fits your work."}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/components">
                <Button>{isArabic ? "المكوّنات" : "Components"}</Button>
              </Link>
              <Link href="/blocks">
                <Button variant="outline">{isArabic ? "البلوكس" : "Blocks"}</Button>
              </Link>
              <Link href="/docs">
                <Button variant="ghost">{isArabic ? "التوثيق" : "Documentation"}</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ThemeProvider>
  )
}
