"use client"

import * as React from "react"
import { Check, Clipboard, Github, TerminalSquare } from "lucide-react"
import { Highlight, themes } from "prism-react-renderer"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SkillWorkspaceProps {
  skill: {
    slug: string
    name: string
    description: string
    category: string
    content: string
    ownership: "qentrah"
    creator: { name: string; github: string }
    repository: string
  }
}

type PackageManager = "npm" | "bun" | "pnpm" | "yarn"

const managers: { key: PackageManager; label: string }[] = [
  { key: "npm", label: "npm" },
  { key: "bun", label: "bun" },
  { key: "pnpm", label: "pnpm" },
  { key: "yarn", label: "yarn" }
]

export function SkillWorkspace({ skill }: SkillWorkspaceProps) {
  const [showRaw, setShowRaw] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [activeManager, setActiveManager] = React.useState<PackageManager>("npm")
  const [copiedCommand, setCopiedCommand] = React.useState(false)

  // Construct raw SKILL.md representation
  const rawMarkdown = `---
name: ${skill.slug}
description: ${skill.description}
---

${skill.content}`

  const lineCount = rawMarkdown.split("\n").length
  const byteCount = new TextEncoder().encode(rawMarkdown).length

  async function copyRaw() {
    await navigator.clipboard.writeText(rawMarkdown)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  async function copyCommand(text: string) {
    await navigator.clipboard.writeText(text)
    setCopiedCommand(true)
    window.setTimeout(() => setCopiedCommand(false), 1400)
  }

  function getInstallCommand() {
    const registryPath = skill.slug
    switch (activeManager) {
      case "bun":
        return `bunx @qentrah/skills add ${registryPath}`
      case "pnpm":
        return `pnpm dlx @qentrah/skills add ${registryPath}`
      case "yarn":
        return `yarn dlx @qentrah/skills add ${registryPath}`
      case "npm":
      default:
        return `npx @qentrah/skills add ${registryPath}`
    }
  }

  return (
    <div className="space-y-12">
      <section className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ownership</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="font-medium text-foreground">Built by Qentrah</span>
          <a
            href={skill.creator.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Created by {skill.creator.name}
          </a>
          <a
            href={`${skill.repository}/edit/main/SKILL.md`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            <Github className="size-3.5" />
            Edit SKILL.md on GitHub
          </a>
        </div>
      </section>

      {/* Workspace Container */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden mt-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 border-b border-border bg-zinc-900/20 px-4 py-3">
          <div className="flex items-center gap-2.5 bg-background border border-border px-3 py-1 rounded-lg">
            <span className={cn("text-xs font-semibold transition-colors select-none", !showRaw ? "text-foreground" : "text-muted-foreground")}>
              Instructions
            </span>
            <Switch checked={showRaw} onCheckedChange={setShowRaw} />
            <span className={cn("text-xs font-semibold transition-colors select-none", showRaw ? "text-foreground" : "text-muted-foreground")}>
              SKILL.md Source
            </span>
          </div>

          <div>
            {showRaw && (
              <Button
                variant="outline"
                size="sm"
                onClick={copyRaw}
                className="h-8 px-2.5 text-xs font-medium gap-1.5 border-border hover:bg-accent"
              >
                {copied ? <Check className="size-3.5 text-emerald-400" /> : <Clipboard className="size-3.5" />}
                {copied ? "Copied source" : "Copy Source"}
              </Button>
            )}
          </div>
        </div>

        {/* Display Panel */}
        <div className="relative min-h-[300px] bg-background">
          {!showRaw ? (
            <div className="p-6 sm:p-10 select-text leading-7 text-zinc-300">
              <div className="prose prose-invert max-w-none">
                {/* Simple client-side rendering of Markdown headings and lists */}
                {skill.content.split("\n").map((line, idx) => {
                  if (line.startsWith("# ")) {
                    return <h3 key={idx} className="text-xl font-bold text-foreground mt-4 mb-3 border-b border-border/40 pb-2">{line.replace("# ", "")}</h3>
                  }
                  if (line.match(/^\d+\.\s/)) {
                    return (
                      <div key={idx} className="flex gap-2.5 my-2.5 pl-2 text-sm">
                        <span className="font-semibold text-blue-500">{line.match(/^\d+/)?.[0]}.</span>
                        <span>{line.replace(/^\d+\.\s/, "")}</span>
                      </div>
                    )
                  }
                  if (line.trim() === "") return <div key={idx} className="h-2" />
                  return <p key={idx} className="text-sm my-2 text-muted-foreground">{line}</p>
                })}
              </div>
            </div>
          ) : (
            <div className="overflow-auto max-h-[450px] bg-[#0d1117] relative select-text">
              <div className="absolute top-2 right-4 text-[10px] text-zinc-500 font-mono pointer-events-none select-none">
                {lineCount} lines · {byteCount} Bytes
              </div>
              <Highlight theme={themes.vsDark} code={rawMarkdown} language="markdown">
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
          Toggle your package manager and copy the command to add this skill directly to your workspace configuration.
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
            <h3 className="text-sm font-bold text-foreground">CLI Add Command</h3>
            <span className="text-[10px] text-zinc-400 font-semibold bg-zinc-800/40 px-2 py-0.5 rounded border border-zinc-700/20">
              Installs skill bundle
            </span>
          </div>

          <div className="flex items-center gap-2 bg-neutral-950 p-1.5 rounded-lg border border-zinc-900">
            <code className="text-xs text-zinc-300 font-mono flex-1 overflow-x-auto whitespace-nowrap px-3 py-1.5">
              {getInstallCommand()}
            </code>
            <Button
              size="sm"
              onClick={() => copyCommand(getInstallCommand())}
              className="h-8 shrink-0 hover:bg-white/10 text-neutral-300 gap-1"
              variant="ghost"
            >
              {copiedCommand ? <Check className="size-3.5 text-emerald-400" /> : <Clipboard className="size-3.5" />}
              <span className="text-xs">{copiedCommand ? "Copied" : "Copy"}</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
