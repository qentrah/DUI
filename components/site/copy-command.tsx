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
    <div className="flex min-w-0 items-center rounded-xl bg-surface-secondary p-1.5 ps-4 shadow-md">
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-xs text-muted-foreground">
        {command}
      </code>
      <Button
        onPress={copy}
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
      >
        {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
        <span className="ms-2">{copied ? "Copied" : "Copy"}</span>
      </Button>
    </div>
  )
}