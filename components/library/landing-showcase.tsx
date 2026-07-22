"use client"

import * as React from "react"
import {
  Bot,
  ChevronDown,
  FileText,
  Globe2,
  Image as ImageIcon,
  Link2,
  PanelRight,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { useLocale } from "@/components/site/locale-provider"
import { Button } from "@/components/ui/button"
import {
  Composer,
  ComposerAction,
  ComposerFooter,
} from "@/components/ui/composer"
import { cn } from "@/lib/utils"

type PreviewSize = "compact" | "default" | "wide"

const previewWidths: Record<PreviewSize, string> = {
  compact: "max-w-xl",
  default: "max-w-3xl",
  wide: "max-w-5xl",
}

export function LandingShowcase() {
  const { isArabic } = useLocale()
  const [value, setValue] = React.useState("")
  const [model, setModel] = React.useState("DUI Reasoning")
  const [previewSize, setPreviewSize] = React.useState<PreviewSize>("default")
  const [messages, setMessages] = React.useState<string[]>([])

  const submitMessage = (message: string) => {
    const trimmedMessage = message.trim()
    if (!trimmedMessage) return
    setMessages((current) => [...current, trimmedMessage])
    setValue("")
  }

  return (
    <section className="border-y border-border bg-muted/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {isArabic ? "مكوّن عام جاهز للإنتاج" : "Production-ready public component"}
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {isArabic ? "تجربة حقيقية، وليست مجموعة بطاقات." : "A real product surface, not a grid of cards."}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              {isArabic
                ? "غيّر حجم الواجهة، اختر النموذج، واستخدم المحرر كما سيفعل المستخدم النهائي."
                : "Resize the surface, switch models, and use the composer exactly as an end user would."}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1" aria-label="Preview size">
            {(["compact", "default", "wide"] as const).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setPreviewSize(size)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                  previewSize === size ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={previewSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className={cn("mx-auto overflow-hidden border border-border bg-background shadow-2xl shadow-black/20 transition-[max-width] duration-300", previewWidths[previewSize])}>
          <header className="flex min-h-14 items-center justify-between border-b border-border px-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-foreground text-background">
                <Bot className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium">Public assistant</p>
                <p className="text-[11px] text-muted-foreground">dui.chat/product</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="size-8 p-0" aria-label="Search conversation"><Search className="size-4" /></Button>
              <Button variant="ghost" size="sm" className="size-8 p-0" aria-label="Open details"><PanelRight className="size-4" /></Button>
            </div>
          </header>

          <div className="flex min-h-[440px] flex-col px-4 py-6 sm:min-h-[500px] sm:px-8">
            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center">
              {messages.length === 0 ? (
                <div className="py-8">
                  <span className="mb-5 grid size-11 place-items-center rounded-xl border border-border bg-muted/50">
                    <Sparkles className="size-5" />
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {isArabic ? "بماذا يمكنني مساعدتك؟" : "What can I help you make?"}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                    {isArabic ? "اسأل عن منتجك، واجهتك، أو ألصق ملفاً لبدء العمل." : "Ask about your product, explore an interface, or attach context to get started."}
                  </p>
                </div>
              ) : (
                <div className="space-y-5 py-8" aria-live="polite">
                  {messages.map((message, index) => (
                    <div key={`${message}-${index}`} className="ms-auto max-w-[85%] rounded-2xl rounded-ee-sm bg-muted px-4 py-3 text-sm leading-6">
                      {message}
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="size-1.5 animate-pulse rounded-full bg-foreground" />
                    {isArabic ? "جارٍ تجهيز الإجابة…" : "Preparing a response…"}
                  </div>
                </div>
              )}

              <Composer
                value={value}
                onChange={setValue}
                onSubmit={submitMessage}
                placeholder={isArabic ? "اكتب رسالة…" : "Message the public assistant…"}
                className="max-w-none rounded-2xl shadow-lg shadow-black/10"
                footer={
                  <ComposerFooter className="justify-between">
                    <div className="flex items-center gap-1">
                      <ComposerAction icon={<Link2 className="size-4" />} label={isArabic ? "إرفاق" : "Attach"} />
                      <ComposerAction icon={<Globe2 className="size-4" />} label={isArabic ? "الويب" : "Web"} />
                    </div>
                    <label className="relative">
                      <span className="sr-only">{isArabic ? "اختر النموذج" : "Choose model"}</span>
                      <select
                        value={model}
                        onChange={(event) => setModel(event.target.value)}
                        className="h-8 appearance-none rounded-md border-0 bg-muted py-0 ps-2.5 pe-7 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option>DUI Reasoning</option>
                        <option>DUI Fast</option>
                        <option>DUI Vision</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute end-2 top-1/2 size-3 -translate-y-1/2" />
                    </label>
                  </ComposerFooter>
                }
              />
            </div>
          </div>

          <footer className="grid border-t border-border sm:grid-cols-3">
            {[
              [ShieldCheck, isArabic ? "آمن افتراضياً" : "Safe by default"],
              [FileText, isArabic ? "يدعم الملفات" : "File-aware"],
              [ImageIcon, isArabic ? "يفهم الصور" : "Vision-ready"],
            ].map(([Icon, label], index) => {
              const FooterIcon = Icon as typeof ShieldCheck
              return (
                <div key={String(label)} className={cn("flex items-center gap-2 px-4 py-3 text-xs text-muted-foreground", index > 0 && "border-t border-border sm:border-s sm:border-t-0")}>
                  <FooterIcon className="size-3.5" />
                  {label as string}
                </div>
              )
            })}
          </footer>
        </div>
      </div>
    </section>
  )
}
