"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Highlight, themes, type PrismTheme } from "prism-react-renderer"

import { cn } from "@/lib/utils"

const codeViewerVariants = cva("relative overflow-hidden border font-mono text-sm", {
  variants: {
    variant: {
      github: "rounded-lg border-border bg-[#0d1117] text-[#e6edf3] shadow-sm",
      terminal: "rounded-xl border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl shadow-black/20",
      illustrative: "rounded-2xl border-border bg-card text-card-foreground shadow-xl shadow-black/10",
      minimal: "rounded-none border-0 bg-transparent text-foreground",
      default: "rounded-lg border-border bg-[#0d1117] text-[#e6edf3] shadow-sm",
      elevated: "rounded-xl border-border bg-card text-card-foreground shadow-lg",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { variant: "github", size: "md" },
})

export interface CodeViewerProps extends VariantProps<typeof codeViewerVariants> {
  code: string
  language?: string
  mode?: "code" | "command" | "prompt"
  title?: string
  description?: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
  wrap?: boolean
  editable?: boolean
  className?: string
  highlightLines?: number[]
  theme?: "system" | "github" | "vscode" | "dracula" | "night-owl" | "light" | "forest" | "amber" | "ocean" | "rose"
  customTheme?: PrismTheme
  runLabel?: string
  onChange?: (value: string) => void
  onRun?: (value: string) => void | Promise<void>
}

const systemSyntaxTheme: PrismTheme = {
  plain: { color: "var(--syntax-foreground, #e6edf3)", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "var(--syntax-comment, #8b949e)", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "var(--syntax-punctuation, #c9d1d9)" } },
    { types: ["namespace", "variable", "parameter"], style: { color: "var(--syntax-variable, #79c0ff)" } },
    { types: ["property", "tag", "constant", "symbol", "deleted"], style: { color: "var(--syntax-property, #ff7b72)" } },
    { types: ["boolean", "number"], style: { color: "var(--syntax-number, #d2a8ff)" } },
    { types: ["selector", "attr-name", "string", "char", "builtin", "inserted"], style: { color: "var(--syntax-string, #a5d6ff)" } },
    { types: ["operator", "entity", "url"], style: { color: "var(--syntax-operator, #79c0ff)" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "var(--syntax-keyword, #ff7b72)" } },
    { types: ["function", "class-name"], style: { color: "var(--syntax-function, #d2a8ff)" } },
    { types: ["regex", "important"], style: { color: "var(--syntax-regex, #ffa657)" } },
  ],
}

function createSyntaxTheme(colors: {
  foreground: string
  comment: string
  punctuation: string
  variable: string
  property: string
  number: string
  string: string
  operator: string
  keyword: string
  function: string
}) : PrismTheme {
  return {
    plain: { color: colors.foreground, backgroundColor: "transparent" },
    styles: [
      { types: ["comment", "prolog", "doctype", "cdata"], style: { color: colors.comment, fontStyle: "italic" } },
      { types: ["punctuation"], style: { color: colors.punctuation } },
      { types: ["namespace", "variable", "parameter"], style: { color: colors.variable } },
      { types: ["property", "tag", "constant", "symbol", "deleted"], style: { color: colors.property } },
      { types: ["boolean", "number"], style: { color: colors.number } },
      { types: ["selector", "attr-name", "string", "char", "builtin", "inserted"], style: { color: colors.string } },
      { types: ["operator", "entity", "url"], style: { color: colors.operator } },
      { types: ["atrule", "attr-value", "keyword"], style: { color: colors.keyword } },
      { types: ["function", "class-name"], style: { color: colors.function } },
      { types: ["regex", "important"], style: { color: colors.property } },
    ],
  }
}

const forestSyntaxTheme = createSyntaxTheme({ foreground: "#dcfce7", comment: "#6b8f71", punctuation: "#a7f3d0", variable: "#5eead4", property: "#86efac", number: "#fde68a", string: "#bef264", operator: "#67e8f9", keyword: "#4ade80", function: "#facc15" })
const amberSyntaxTheme = createSyntaxTheme({ foreground: "#fef3c7", comment: "#a38b62", punctuation: "#fde68a", variable: "#fcd34d", property: "#fb923c", number: "#fef08a", string: "#d9f99d", operator: "#fdba74", keyword: "#fbbf24", function: "#fef08a" })
const oceanSyntaxTheme = createSyntaxTheme({ foreground: "#e0f2fe", comment: "#647d94", punctuation: "#bae6fd", variable: "#67e8f9", property: "#38bdf8", number: "#c4b5fd", string: "#5eead4", operator: "#7dd3fc", keyword: "#818cf8", function: "#22d3ee" })
const roseSyntaxTheme = createSyntaxTheme({ foreground: "#ffe4e6", comment: "#9f7180", punctuation: "#fecdd3", variable: "#f9a8d4", property: "#fb7185", number: "#fde68a", string: "#fda4af", operator: "#f0abfc", keyword: "#e879f9", function: "#fbbf24" })

const syntaxThemes = {
  system: systemSyntaxTheme,
  github: themes.github,
  vscode: themes.vsDark,
  dracula: themes.dracula,
  "night-owl": themes.nightOwl,
  light: themes.vsLight,
  forest: forestSyntaxTheme,
  amber: amberSyntaxTheme,
  ocean: oceanSyntaxTheme,
  rose: roseSyntaxTheme,
} satisfies Record<NonNullable<CodeViewerProps["theme"]>, PrismTheme>

function CopyIcon({ checked }: { checked: boolean }) {
  return checked ? (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6" /></svg>
  ) : (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
  )
}

function RunIcon() {
  return <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="m8 5 11 7-11 7V5Z" /></svg>
}

function CodeViewer({
  code,
  language = "text",
  mode = "code",
  title,
  description,
  variant = "github",
  size,
  showLineNumbers = mode === "code",
  showCopyButton = true,
  wrap = false,
  editable = false,
  className,
  highlightLines = [],
  theme = "system",
  customTheme,
  runLabel = mode === "prompt" ? "Run prompt" : "Run",
  onChange,
  onRun,
}: CodeViewerProps) {
  const [draft, setDraft] = React.useState(code)
  const [copied, setCopied] = React.useState(false)
  const [running, setRunning] = React.useState(false)

  React.useEffect(() => setDraft(code), [code])

  const updateDraft = (value: string) => {
    setDraft(value)
    onChange?.(value)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(draft)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const run = async () => {
    if (!onRun || !draft.trim() || running) return
    setRunning(true)
    try {
      await onRun(draft)
    } finally {
      setRunning(false)
    }
  }

  const lines = draft.split("\n")
  const isDarkSurface = variant === "github" || variant === "terminal" || variant === "default"
  const activeSyntaxTheme = customTheme ?? syntaxThemes[theme]

  return (
    <section className={cn(codeViewerVariants({ variant, size }), className)}>
      {variant === "illustrative" && (
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px]" />
      )}

      <header className={cn(
        "relative flex min-h-11 items-center gap-3 border-b px-3.5",
        isDarkSurface ? "border-[#30363d] bg-[#161b22]" : "border-border bg-muted/40"
      )}>
        {variant === "terminal" && (
          <div className="flex gap-1.5" aria-hidden="true"><span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-amber-400" /><span className="size-2.5 rounded-full bg-emerald-400" /></div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-sans text-xs font-medium">{title ?? (mode === "command" ? "Terminal" : mode === "prompt" ? "Prompt runner" : `example.${language}`)}</p>
          {description && <p className={cn("mt-0.5 truncate font-sans text-[10px]", isDarkSurface ? "text-[#8b949e]" : "text-muted-foreground")}>{description}</p>}
        </div>
        <span className={cn("rounded px-1.5 py-0.5 text-[10px] uppercase", isDarkSurface ? "bg-[#21262d] text-[#8b949e]" : "bg-muted text-muted-foreground")}>{mode === "code" ? language : mode}</span>
        {showCopyButton && (
          <button type="button" onClick={copyToClipboard} className={cn("inline-flex h-7 items-center gap-1.5 rounded-md border px-2 font-sans text-[11px] transition", isDarkSurface ? "border-[#30363d] bg-[#21262d] hover:bg-[#30363d]" : "border-border bg-background hover:bg-accent")} aria-label="Copy content">
            <CopyIcon checked={copied} /> {copied ? "Copied" : "Copy"}
          </button>
        )}
      </header>

      <div className="relative">
        {mode === "prompt" ? (
          <div className="p-3 sm:p-4">
            <textarea
              value={draft}
              onChange={(event) => updateDraft(event.target.value)}
              readOnly={!editable}
              rows={7}
              spellCheck={false}
              aria-label="Prompt"
              className={cn("w-full resize-y rounded-xl border bg-background/90 p-4 font-sans text-sm leading-6 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20", isDarkSurface ? "border-[#30363d] bg-[#0d1117] text-[#e6edf3]" : "border-border")}
            />
          </div>
        ) : editable ? (
          <div className="flex items-start px-4 py-4">
            {mode === "command" && <span className="me-3 select-none text-emerald-400">$</span>}
            <textarea value={draft} onChange={(event) => updateDraft(event.target.value)} rows={Math.max(3, lines.length)} spellCheck={false} aria-label={mode === "command" ? "Command" : "Code"} className="min-h-24 w-full resize-y bg-transparent leading-6 outline-none" />
          </div>
        ) : (
          <Highlight theme={activeSyntaxTheme} code={draft} language={language}>
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre className={cn("code-scroll max-h-96 overflow-auto py-4 leading-6", wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre")} style={{ background: "transparent" }}>
                <code className="block min-w-max">
                  {tokens.map((line, index) => {
                    const lineProps = getLineProps({ line })
                    return (
                      <span
                        {...lineProps}
                        key={index}
                        className={cn("flex min-h-6 px-4", lineProps.className, highlightLines.includes(index + 1) && (isDarkSurface ? "bg-[#1f6feb26]" : "bg-primary/10"))}
                      >
                        {showLineNumbers && <span className={cn("me-5 w-8 shrink-0 select-none text-end", isDarkSurface ? "text-[#6e7681]" : "text-muted-foreground")}>{index + 1}</span>}
                        {mode === "command" && <span className="me-3 select-none text-emerald-400">$</span>}
                        <span>{line.map((token, tokenIndex) => <span {...getTokenProps({ token })} key={tokenIndex} />)}</span>
                      </span>
                    )
                  })}
                </code>
              </pre>
            )}
          </Highlight>
        )}
      </div>

      {(onRun || mode === "prompt") && (
        <footer className={cn("relative flex items-center justify-between border-t px-3.5 py-2.5", isDarkSurface ? "border-[#30363d] bg-[#161b22]" : "border-border bg-muted/30")}>
          <span className={cn("font-sans text-[11px]", isDarkSurface ? "text-[#8b949e]" : "text-muted-foreground")}>{draft.length} characters</span>
          <button type="button" onClick={run} disabled={!onRun || !draft.trim() || running} className="inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 font-sans text-xs font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
            <RunIcon /> {running ? "Running…" : runLabel}
          </button>
        </footer>
      )}
    </section>
  )
}

CodeViewer.displayName = "CodeViewer"

function InlineCode({ code, className }: { code: string; language?: string; className?: string }) {
  return <code className={cn("inline-block rounded bg-muted px-1.5 py-0.5 font-mono text-xs", className)}>{code}</code>
}

function CodeBlock(props: Pick<CodeViewerProps, "code" | "language" | "showLineNumbers" | "showCopyButton" | "className">) {
  return <CodeViewer {...props} variant="github" mode="code" />
}

export { CodeViewer, codeViewerVariants, InlineCode, CodeBlock }
