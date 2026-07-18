"use client"

import * as React from "react"
import { Check, Clipboard, TerminalSquare } from "lucide-react"
import { Highlight, themes } from "prism-react-renderer"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { BlockPreview } from "@/components/library/block-preview"
import { getComponent, type BlockSlug } from "@/lib/catalog"
import { cn } from "@/lib/utils"

interface BlockWorkspaceProps {
  block: {
    slug: BlockSlug
    name: string
    description: string
    components: readonly string[]
  }
  code: string
}

type PackageManager = "npm" | "bun" | "pnpm" | "yarn"

const managers: { key: PackageManager; label: string }[] = [
  { key: "npm", label: "npm" },
  { key: "bun", label: "bun" },
  { key: "pnpm", label: "pnpm" },
  { key: "yarn", label: "yarn" }
]

export function BlockWorkspace({ block, code }: BlockWorkspaceProps) {
  const [showCode, setShowCode] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [activeManager, setActiveManager] = React.useState<PackageManager>("npm")
  
  // Track copied status for command lines
  const [copiedCommand, setCopiedCommand] = React.useState<string | null>(null)

  const lineCount = code.split("\n").length
  const byteCount = new TextEncoder().encode(code).length

  async function copyCode() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  async function copyToClipboard(text: string, id: string) {
    await navigator.clipboard.writeText(text)
    setCopiedCommand(id)
    window.setTimeout(() => setCopiedCommand(null), 1400)
  }

  function getInstallCommand(pkg: string, isBlock: boolean = false) {
    const slugName = isBlock ? `blocks-${block.slug}` : pkg
    const registryPath = `qentrah/DUI/${slugName}`
    
    switch (activeManager) {
      case "bun":
        return `bunx shadcn@latest add ${registryPath}`
      case "pnpm":
        return `pnpm dlx shadcn@latest add ${registryPath}`
      case "yarn":
        return `yarn dlx shadcn@latest add ${registryPath}`
      case "npm":
      default:
        return `npx shadcn@latest add ${registryPath}`
    }
  }

  return (
    <div className="space-y-12">
      {/* Workspace Wrapper */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden mt-6">
        {/* Workspace Header toolbar */}
        <div className="flex items-center justify-between gap-4 border-b border-border bg-zinc-900/20 px-4 py-3">
          {/* Switch preview vs code */}
          <div className="flex items-center gap-2.5 bg-background border border-border px-3 py-1 rounded-lg">
            <span className={cn("text-xs font-semibold transition-colors select-none", !showCode ? "text-foreground" : "text-muted-foreground")}>
              Preview
            </span>
            <Switch checked={showCode} onCheckedChange={setShowCode} />
            <span className={cn("text-xs font-semibold transition-colors select-none", showCode ? "text-foreground" : "text-muted-foreground")}>
              Code
            </span>
          </div>

          <div>
            {showCode && (
              <Button
                variant="outline"
                size="sm"
                onClick={copyCode}
                className="h-8 px-2.5 text-xs font-medium gap-1.5 border-border hover:bg-accent"
              >
                {copied ? <Check className="size-3.5 text-emerald-400" /> : <Clipboard className="size-3.5" />}
                {copied ? "Copied source" : "Copy Source"}
              </Button>
            )}
          </div>
        </div>

        {/* Workspace Display Area */}
        <div className="relative min-h-[350px] bg-background">
          {!showCode ? (
            <div className="flex items-center justify-center p-6 sm:p-10 min-h-[400px]">
              <div className="w-full max-w-xl bg-card border border-border rounded-xl p-5 sm:p-8 shadow-sm">
                <BlockPreview slug={block.slug} />
              </div>
            </div>
          ) : (
            <div className="overflow-auto max-h-[500px] bg-[#0d1117] relative select-text">
              <div className="absolute top-2 right-4 text-[10px] text-zinc-500 font-mono pointer-events-none select-none">
                {lineCount} lines · {byteCount} Bytes
              </div>
              <Highlight theme={themes.vsDark} code={code} language="tsx">
                {({ tokens, getLineProps, getTokenProps }) => (
                  <pre className="min-w-max bg-[#0d1117] py-5 font-mono text-[12.5px] leading-5">
                    <code>
                      {tokens.map((line, index) => {
                        const lineProps = getLineProps({ line })
                        return (
                          <span
                            {...lineProps}
                            key={index}
                            className={cn(lineProps.className, "code-line block pe-6")}
                          >
                            <span className="sticky start-0 inline-block w-10 select-none bg-[#0d1117] pe-3 text-end text-[#6e7681]">
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
          )}
        </div>
      </div>

      {/* Installation Segment */}
      <section id="installation" className="scroll-mt-24 border-t border-border pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
          <TerminalSquare className="size-5.5 text-zinc-400" />
          Installation
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5 leading-6">
          Toggle your preferred package manager and run the CLI command to add this block and its dependency components.
        </p>

        {/* Tab triggers */}
        <div className="mt-6 flex border-b border-border gap-1">
          {managers.map((mgr) => (
            <button
              key={mgr.key}
              onClick={() => setActiveManager(mgr.key)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium border-b-2 transition-all relative top-px",
                activeManager === mgr.key
                  ? "border-blue-500 text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {mgr.label}
            </button>
          ))}
        </div>

        {/* Command Display */}
        <div className="mt-4 bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">CLI Install Command</h3>
            <span className="text-[10px] text-zinc-400 font-semibold bg-zinc-800/40 px-2 py-0.5 rounded border border-zinc-700/20">
              Auto-installs dependencies
            </span>
          </div>

          <div className="flex items-center gap-2 bg-neutral-950 p-1.5 rounded-lg border border-zinc-900">
            <code className="text-xs text-zinc-300 font-mono flex-1 overflow-x-auto whitespace-nowrap px-3 py-1.5">
              {getInstallCommand("", true)}
            </code>
            <Button
              size="sm"
              onClick={() => copyToClipboard(getInstallCommand("", true), "block")}
              className="h-8 shrink-0 hover:bg-white/10 text-neutral-300 gap-1"
              variant="ghost"
            >
              {copiedCommand === "block" ? <Check className="size-3.5 text-emerald-400" /> : <Clipboard className="size-3.5" />}
              <span className="text-xs">{copiedCommand === "block" ? "Copied" : "Copy"}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Dependencies Section */}
      <section id="composition" className="scroll-mt-24 border-t border-border pt-10">
        <h2 className="text-xl font-semibold tracking-tight">DUI Primitive Dependencies</h2>
        <p className="text-sm text-muted-foreground mt-1.5 leading-6">
          This block is composed of the following primitives. Here are the commands to install them individually if needed:
        </p>

        <div className="mt-6 grid gap-3">
          {block.components.map((compSlug) => {
            const componentInfo = getComponent(compSlug)
            const compName = componentInfo?.name || compSlug
            const compDesc = componentInfo?.description || `Installable ${compSlug} UI primitive component.`
            const cmd = getInstallCommand(compSlug, false)

            return (
              <div
                key={compSlug}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card/40 hover:bg-card/70 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{compName}</span>
                    <span className="text-[10px] text-muted-foreground bg-zinc-800/30 px-1.5 py-0.5 rounded border border-zinc-700/20">
                      {compSlug}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-5">
                    {compDesc}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-neutral-950 pl-3 pr-1 py-1 rounded-lg border border-zinc-900 w-full sm:w-auto">
                  <code className="text-[11px] text-zinc-400 font-mono flex-1 overflow-x-auto whitespace-nowrap">
                    {cmd}
                  </code>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => copyToClipboard(cmd, compSlug)}
                    className="size-7 shrink-0 text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                    aria-label={`Copy command for ${compSlug}`}
                  >
                    {copiedCommand === compSlug ? <Check className="size-3 text-emerald-400" /> : <Clipboard className="size-3" />}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
