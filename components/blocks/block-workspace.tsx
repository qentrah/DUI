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
    variants?: readonly {
      id: string
      label: string
      registrySlug: string
      source: string
      components: readonly string[]
    }[]
  }
  code: string
  variantCodes?: Record<string, string>
}

type PackageManager = "npm" | "bun" | "pnpm" | "yarn"

const managers: { key: PackageManager; label: string }[] = [
  { key: "npm", label: "npm" },
  { key: "bun", label: "bun" },
  { key: "pnpm", label: "pnpm" },
  { key: "yarn", label: "yarn" },
]

export function BlockWorkspace({ block, code, variantCodes }: BlockWorkspaceProps) {
  const [showCode, setShowCode] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [activeManager, setActiveManager] = React.useState<PackageManager>("npm")
  const [activeVariantId, setActiveVariantId] = React.useState(block.variants?.[0]?.id ?? "normal")
  const [copiedAgent, setCopiedAgent] = React.useState(false)

  // Track copied status for command lines
  const [copiedCommand, setCopiedCommand] = React.useState<string | null>(null)

  const activeVariant = block.variants?.find((variant) => variant.id === activeVariantId)
  const activeCode = variantCodes?.[activeVariantId] ?? code
  const activeComponents = activeVariant?.components ?? block.components
  const activeRegistrySlug = activeVariant?.registrySlug ?? `blocks-${block.slug}`
  const lineCount = activeCode.split("\n").length
  const byteCount = new TextEncoder().encode(activeCode).length
  const agentPrompt = `Add the ${block.name} (${activeVariant?.label ?? "default"}) from the DUI registry. Run \`${getInstallCommand("", true)}\`, inspect the installed source, preserve its accessibility and responsive behavior, and adapt its copy and callbacks to this product.`

  async function copyCode() {
    await navigator.clipboard.writeText(activeCode)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  async function copyToClipboard(text: string, id: string) {
    await navigator.clipboard.writeText(text)
    setCopiedCommand(id)
    window.setTimeout(() => setCopiedCommand(null), 1400)
  }

  async function copyForAgent() {
    await navigator.clipboard.writeText(agentPrompt)
    setCopiedAgent(true)
    window.setTimeout(() => setCopiedAgent(false), 1600)
  }

  function getInstallCommand(pkg: string, isBlock: boolean = false) {
    const slugName = isBlock ? activeRegistrySlug : pkg
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
      <div className="mt-8 overflow-hidden border-y border-border">
        <div className="flex min-h-14 items-center justify-between gap-3 border-b border-border py-2">
          {block.variants && block.variants.length > 1 ? (
            <div className="flex min-w-0 gap-1 overflow-x-auto" role="tablist" aria-label={`${block.name} variants`}>
              {block.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                role="tab"
                aria-selected={activeVariantId === variant.id}
                onClick={() => { setActiveVariantId(variant.id); setShowCode(false) }}
                className={cn("whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors", activeVariantId === variant.id && "bg-accent text-foreground")}
              >
                {variant.label}
              </button>
              ))}
            </div>
          ) : <span className="text-xs font-medium text-muted-foreground">Default block</span>}
          <Button variant="ghost" size="sm" onPress={copyForAgent} className="shrink-0 gap-1.5 text-xs">
            {copiedAgent ? <Check className="size-3.5 text-success" /> : <Clipboard className="size-3.5" />}
            {copiedAgent ? "Copied for agent" : "Copy for agent"}
          </Button>
        </div>
        {/* Workspace Header toolbar */}
        <div className="flex items-center justify-between gap-4 border-b border-border px-1 py-3">
          {/* Switch preview vs code */}
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "text-xs font-semibold transition-colors select-none",
                !showCode ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Preview
            </span>
            <Switch isSelected={showCode} onChange={setShowCode} />
            <span
              className={cn(
                "text-xs font-semibold transition-colors select-none",
                showCode ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Code
            </span>
          </div>

          <div>
            {showCode && (
              <Button
                variant="outline"
                size="sm"
                onPress={copyCode}
                className="h-8 px-2.5 text-xs font-medium gap-1.5 border-border hover:bg-accent"
              >
                {copied ? <Check className="size-3.5 text-success" /> : <Clipboard className="size-3.5" />}
                {copied ? "Copied source" : "Copy Source"}
              </Button>
            )}
          </div>
        </div>

        {/* Workspace Display Area */}
        <div className="relative min-h-[350px] bg-background">
          {!showCode ? (
            <div className="flex min-h-[480px] w-full items-center justify-center px-4 py-10 sm:px-8 sm:py-14">
              <div className="flex w-full justify-center"><BlockPreview key={activeVariantId} slug={block.slug} variant={activeVariantId} /></div>
            </div>
          ) : (
            <div className="overflow-auto max-h-[500px] bg-[#0d1117] relative select-text">
              <div className="absolute top-2 right-4 text-[10px] text-zinc-500 font-mono pointer-events-none select-none">
                {lineCount} lines · {byteCount} Bytes
              </div>
              <Highlight theme={themes.vsDark} code={activeCode} language="tsx">
                {({ tokens, getLineProps, getTokenProps }) => (
                  <pre className="min-w-max bg-[#0d1117] py-5 font-mono text-[12.5px] leading-5">
                    <code>
                      {tokens.map((line, index) => {
                        const lineProps = getLineProps({ line })
                        return (
                          <span {...lineProps} key={index} className={cn(lineProps.className, "code-line block pe-6")}>
                            <span className="sticky start-0 inline-block w-10 select-none bg-[#0d1117] pe-3 text-end text-[#6e7681]">
                              {index + 1}
                            </span>
                            {line.map((token, tokenIndex) => (
                              <span {...getTokenProps({ token })} key={`${index}-${tokenIndex}`} />
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
          <TerminalSquare className="size-5.5 text-muted-foreground" />
          Installation
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5 leading-6">
          Toggle your preferred package manager and run the CLI command to add this block and its dependency components.
        </p>

        <div className="mt-6 overflow-hidden rounded-lg border border-[#30363d] bg-[#0d1117]">
          <div className="flex flex-wrap items-center gap-3 border-b border-[#30363d] bg-[#161b22] px-3 py-2">
            <div className="flex items-center gap-1.5" aria-hidden="true"><span className="size-2.5 rounded-full bg-[#ff5f56]" /><span className="size-2.5 rounded-full bg-[#ffbd2e]" /><span className="size-2.5 rounded-full bg-[#27c93f]" /></div>
            <span className="text-xs font-medium text-[#8b949e]">DUI CLI · auto-installs dependencies</span>
            <div className="ms-auto flex gap-1">
              {managers.map((manager) => <button key={manager.key} type="button" onClick={() => setActiveManager(manager.key)} className={cn("rounded px-2 py-1 text-xs font-medium text-[#8b949e] hover:text-[#f0f6fc]", activeManager === manager.key && "bg-[#30363d] text-[#f0f6fc]")}>{manager.label}</button>)}
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-4">
            <span className="select-none font-mono text-sm text-[#3fb950]">$</span>
            <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-[#e6edf3]">
              {getInstallCommand("", true)}
            </code>
            <Button
              size="sm"
              onPress={() => copyToClipboard(getInstallCommand("", true), "block")}
              className="h-8 shrink-0 gap-1 text-[#8b949e] hover:bg-[#21262d] hover:text-[#f0f6fc]"
              variant="ghost"
            >
              {copiedCommand === "block" ? <Check className="size-3.5 text-success" /> : <Clipboard className="size-3.5" />}
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
          {activeComponents.map((compSlug) => {
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
                    <span className="text-[10px] text-muted-foreground bg-surface-secondary px-1.5 py-0.5 rounded border border-border">
                      {compSlug}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-5">{compDesc}</p>
                </div>

                <div className="flex items-center gap-2 bg-surface-secondary pl-3 pr-1 py-1 rounded-xl border border-border w-full sm:w-auto">
                  <code className="text-[11px] text-muted-foreground font-mono flex-1 overflow-x-auto whitespace-nowrap">
                    {cmd}
                  </code>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="ghost"
                    onPress={() => copyToClipboard(cmd, compSlug)}
                    className="size-7 shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                    aria-label={`Copy command for ${compSlug}`}
                  >
                    {copiedCommand === compSlug ? <Check className="size-3 text-success" /> : <Clipboard className="size-3" />}
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
