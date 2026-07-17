"use client"

import * as React from "react"
import {
  Check,
  ChevronDown,
  Clipboard,
  Code2,
  Download,
  FileCode2,
  History,
  PanelTopClose
} from "lucide-react"
import { Highlight, themes } from "prism-react-renderer"

import { ComponentPreview } from "@/components/library/component-preview"
import { CopyCommand } from "@/components/site/copy-command"
import { type ComponentSlug } from "@/lib/catalog"
import { cn } from "@/lib/utils"

const variants: Partial<Record<ComponentSlug, string[]>> = {
  button: ["default", "secondary", "outline", "ghost", "destructive"],
  input: ["default", "error", "disabled"],
  badge: ["default", "secondary", "success", "warning", "destructive", "outline"],
  card: ["default", "flat", "elevated"],
  alert: ["default", "success", "warning", "destructive"],
  avatar: ["default", "small", "large"],
  checkbox: ["default", "checked", "disabled"],
  progress: ["starting", "default", "complete"],
  separator: ["default"],
  skeleton: ["default"],
  spinner: ["default", "large"],
  switch: ["default", "checked", "disabled"],
  textarea: ["default", "error", "disabled"],
  "filter-chip": ["default", "mine"],
  "status-pill": ["default", "warning", "danger", "info", "neutral"],
  "empty-state": ["default", "sm", "lg"],
  "color-dot": ["default", "ring"],
  "tag-chip": ["default", "removable"],
  "legend-item": ["default"],
  "list-row": ["default", "compact", "card"],
  "list-item": ["default"],
  "color-swatch": ["default", "idle"],
  "status-badge": ["default", "pending", "warning", "error", "inactive"],
  "department-dot": ["default"]
}

const snippets: Partial<Record<ComponentSlug, (variant: string) => string>> = {
  button: (variant) => `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <Button variant="${variant}">
      Save changes
    </Button>
  )
}`,
  input: (variant) => `import { Input } from "@/components/ui/input"

export function InputDemo() {
  return (
    <Input
      label="Email address"
      placeholder="name@example.com"${variant === "error" ? '\n      error="Enter a valid email address."' : ""}
      ${variant === "disabled" ? "disabled" : ""}
    />
  )
}`,
  badge: (variant) => `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return <Badge variant="${variant}">Project status</Badge>
}`,
  card: () => `import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project summary</CardTitle>
      </CardHeader>
      <CardContent>18 of 24 tasks are complete.</CardContent>
    </Card>
  )
}`,
  alert: (variant) => `import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <Alert variant="${variant}">
      <AlertTitle>Changes published</AlertTitle>
      <AlertDescription>The new version is now available.</AlertDescription>
    </Alert>
  )
}`,
  avatar: () => `import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarFallback>DU</AvatarFallback>
    </Avatar>
  )
}`,
  checkbox: (variant) => `import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxDemo() {
  return <Checkbox${variant === "checked" ? " defaultChecked" : ""}${variant === "disabled" ? " disabled" : ""} />
}`,
  progress: (variant) => `import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  return <Progress value={${variant === "complete" ? 100 : variant === "starting" ? 18 : 64}} />
}`,
  separator: () => `import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return <Separator />
}`,
  skeleton: () => `import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return <Skeleton className="h-4 w-48" />
}`,
  spinner: (variant) => `import { Spinner } from "@/components/ui/spinner"

export function SpinnerDemo() {
  return <Spinner${variant === "large" ? ' className="size-8"' : ""} />
}`,
  switch: (variant) => `import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return <Switch${variant === "checked" ? " defaultChecked" : ""}${variant === "disabled" ? " disabled" : ""} />
}`,
  textarea: (variant) => `import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return (
    <Textarea
      placeholder="Write a message…"
      ${variant === "disabled" ? "disabled" : ""}
    />
  )
}`,
  "filter-chip": () => `import { FilterChipBar } from "@/components/ui/filter-chip"

export function FilterChipDemo() {
  return (
    <FilterChipBar
      activeKey="all"
      onChange={(key) => console.log(key)}
      chips={[
        { key: "all", label: "All", count: 12 },
        { key: "mine", label: "Mine", count: 4 }
      ]}
    />
  )
}`,
  "status-pill": (variant) => `import { StatusPill } from "@/components/ui/status-pill"

export function StatusPillDemo() {
  return <StatusPill tone="${variant === "default" ? "success" : variant}" label="On track" />
}`,
  "empty-state": () => `import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"

export function EmptyStateDemo() {
  return (
    <EmptyState
      title="No results"
      description="Try adjusting filters."
      action={<Button size="sm">Create</Button>}
    />
  )
}`,
  "color-dot": () => `import { ColorDot } from "@/components/ui/color-dot"

export function ColorDotDemo() {
  return <ColorDot color="#3b82f6" label="Blue" />
}`,
  "tag-chip": () => `import { TagChip } from "@/components/ui/tag-chip"

export function TagChipDemo() {
  return <TagChip tone="blue" label="Design" removable onRemove={() => undefined} />
}`,
  "legend-item": () => `import { LegendItem } from "@/components/ui/legend-item"

export function LegendItemDemo() {
  return <LegendItem color="#16a34a" label="Done" value="12" />
}`,
  "list-row": () => `import { ListRow } from "@/components/ui/list-row"

export function ListRowDemo() {
  return <ListRow title="Proposal review" subtitle="Due tomorrow" />
}`,
  "list-item": () => `import { List, ListItem, ListItemAvatar, ListItemContent } from "@/components/ui/list-item"

export function ListItemDemo() {
  return (
    <List>
      <ListItem>
        <ListItemAvatar initials="SA" />
        <ListItemContent primary="Sara Ahmed" secondary="Designer" />
      </ListItem>
    </List>
  )
}`,
  "color-swatch": () => `import { ColorSwatch } from "@/components/ui/color-swatch"

export function ColorSwatchDemo() {
  return <ColorSwatch color="#3b82f6" selected />
}`,
  "status-badge": (variant) => `import { StatusBadge } from "@/components/ui/status-badge"

export function StatusBadgeDemo() {
  return <StatusBadge variant="${variant === "default" ? "active" : variant}">active</StatusBadge>
}`,
  "department-dot": () => `import { DepartmentDot } from "@/components/ui/department-dot"

export function DepartmentDotDemo() {
  return <DepartmentDot department="engineering" showLabel />
}`
}

function getSnippet(slug: ComponentSlug, variant: string) {
  const createSnippet = snippets[slug]
  if (createSnippet) return createSnippet(variant)

  const componentName = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")

  return `import { ${componentName} } from "@/components/ui/${slug}"

export function ${componentName}Demo() {
  return <${componentName} />
}`
}

function CodeExample({
  slug,
  variant,
  featured = false
}: {
  slug: ComponentSlug
  variant: string
  featured?: boolean
}) {
  const [expanded, setExpanded] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const code = getSnippet(slug, variant)
  const lineCount = code.split("\n").length
  const byteCount = new TextEncoder().encode(code).length

  async function copyCode() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  function downloadRawCode() {
    const url = URL.createObjectURL(new Blob([code], { type: "text/plain;charset=utf-8" }))
    const link = document.createElement("a")
    link.href = url
    link.download = `${slug}-${variant}.tsx`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section id={`example-${variant}`} className="scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-xl font-semibold capitalize text-foreground">
          {featured ? "Preview" : variant}
        </h2>
        {!featured && (
          <p className="mt-1 text-sm text-muted-foreground">
            The {variant} style of this component.
          </p>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex min-h-72 items-center justify-center bg-background p-8 sm:p-12">
          <div className="w-full max-w-lg">
            <ComponentPreview slug={slug} variant={variant} />
          </div>
        </div>

        <div className="relative border-t border-border bg-[#0d1117]">
          {expanded && (
            <div className="flex min-h-12 flex-wrap items-center gap-2 border-b border-[#30363d] bg-[#161b22] px-3 py-2 text-xs text-[#8b949e]">
              <div className="flex items-center rounded-md border border-[#30363d] bg-[#0d1117] p-0.5">
                <span className="flex items-center gap-1.5 rounded bg-[#30363d] px-2.5 py-1 font-medium text-[#f0f6fc]">
                  <FileCode2 className="size-3.5" />
                  Code
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 text-[#c9d1d9]">
                  <History className="size-3.5" />
                  Blame
                </span>
              </div>

              <span className="font-mono">
                {lineCount} lines · {byteCount} Bytes
              </span>

              <div className="ms-auto flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={copyCode}
                  className="flex h-8 items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 font-medium text-[#f0f6fc] hover:bg-[#30363d]"
                >
                  {copied ? <Check className="size-3.5 text-emerald-400" /> : <Clipboard className="size-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={downloadRawCode}
                  className="flex h-8 items-center gap-1.5 rounded-md border border-[#30363d] bg-[#21262d] px-2.5 font-medium text-[#f0f6fc] hover:bg-[#30363d]"
                  title="Download raw TSX"
                >
                  Raw
                  <Download className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="flex size-8 items-center justify-center rounded-md border border-[#30363d] bg-[#21262d] text-[#f0f6fc] hover:bg-[#30363d]"
                  aria-label="Hide Code"
                  title="Hide code"
                >
                  <PanelTopClose className="size-3.5" />
                </button>
              </div>
            </div>
          )}

          <div
            className={cn(
              "code-scroll overflow-auto transition-[max-height] duration-300",
              expanded ? "max-h-[430px]" : "max-h-[96px]"
            )}
          >
            <Highlight theme={themes.vsDark} code={code} language="tsx">
              {({ tokens, getLineProps, getTokenProps }) => (
                <pre className="min-w-max bg-[#0d1117] py-4 font-mono text-[13px] leading-6">
                  <code>
                    {tokens.map((line, index) => {
                      const lineProps = getLineProps({ line })
                      return (
                        <span
                          {...lineProps}
                          key={index}
                          className={cn(lineProps.className, "code-line block pe-8")}
                        >
                          <span className="sticky start-0 inline-block w-12 select-none bg-[#0d1117] pe-4 text-end text-[#6e7681]">
                            {index + 1}
                          </span>
                          {line.map((token, tokenIndex) => (
                            <span {...getTokenProps({ token })} key={tokenIndex} />
                          ))}
                        </span>
                      )
                    })}
                  </code>
                </pre>
              )}
            </Highlight>
          </div>

          {!expanded && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1117]/35 to-[#0d1117]" />
          )}

          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className={cn(
              "absolute start-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-3 py-1.5 text-xs font-medium text-[#e6edf3] shadow-lg transition hover:bg-[#21262d]",
              expanded ? "hidden" : "bottom-4"
            )}
            aria-expanded={expanded}
          >
            <Code2 className="size-3.5" />
            {expanded ? "Hide Code" : "View Code"}
            <ChevronDown className={cn("size-3.5 transition", expanded && "rotate-180")} />
          </button>
        </div>
      </div>
    </section>
  )
}

export function ComponentWorkbench({ slug }: { slug: ComponentSlug }) {
  return (
    <div className="mt-10 space-y-14">
      {(variants[slug] ?? ["default"]).map((variant, index) => (
        <CodeExample
          key={variant}
          slug={slug}
          variant={variant}
          featured={index === 0}
        />
      ))}

      <section id="installation" className="scroll-mt-24 border-t border-border pt-10">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Add the source directly to your project with the shadcn CLI.
        </p>
        <div className="mt-5">
          <CopyCommand command={`npx shadcn@latest add qentrah/DUI/${slug}`} />
        </div>
      </section>
    </div>
  )
}
