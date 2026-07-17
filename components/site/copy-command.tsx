"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="flex min-w-0 items-center rounded-xl bg-neutral-950 p-1.5 ps-4 text-white shadow-sm">
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-xs text-neutral-300">{command}</code>
      <Button onClick={copy} variant="ghost" size="sm" className="text-neutral-300 hover:bg-white/10 hover:text-white">
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        <span className="ms-2">{copied ? "Copied" : "Copy"}</span>
      </Button>
    </div>
  )
}
