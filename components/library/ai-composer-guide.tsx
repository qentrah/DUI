import { CodeViewer } from "@/components/ui/code-viewer"

const controlledExample = `"use client"

import * as React from "react"
import {
  AIComposer,
  type AIComposerMode,
} from "@/components/ui/ai-composer"

export function AssistantComposer() {
  const [value, setValue] = React.useState("")
  const [mode, setMode] = React.useState<AIComposerMode>("ask")
  const [sending, setSending] = React.useState(false)

  async function send(message: string, files: File[]) {
    setSending(true)
    try {
      await yourApi.send({ message, files, mode })
    } finally {
      setSending(false)
    }
  }

  return (
    <AIComposer
      value={value}
      onChange={setValue}
      onSend={send}
      onStop={() => yourApi.stop()}
      sending={sending}
      mode={mode}
      onModeChange={setMode}
      layout="thread"
    />
  )
}`

const integrationsExample = `<AIComposer
  value={value}
  onChange={setValue}
  onSend={send}
  mode={mode}
  onModeChange={setMode}
  badges={[
    { id: "website", label: "Website", tone: "info" },
  ]}
  plugins={[
    { id: "github", label: "GitHub", description: "qentrah/DUI" },
    { id: "sheets", label: "Google Sheets", description: "Planning" },
  ]}
  selectedPluginIds={selectedPluginIds}
  onPluginToggle={togglePlugin}
  onVoiceClick={startVoiceInput}
/>
`

export function AIComposerGuide() {
  return (
    <section id="api" className="mt-12 scroll-mt-24 border-t border-border pt-10">
      <h2 className="text-2xl font-semibold">Connect it to your product</h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        AIComposer owns presentation and local attachment previews. Your application owns message delivery, cancellation, plugin state, and voice capture through callbacks. This keeps the installed component independent from any backend or AI SDK.
      </p>
      <div className="mt-6"><CodeViewer code={controlledExample} language="tsx" title="assistant-composer.tsx" theme="system" showLineNumbers /></div>

      <h3 className="mt-10 text-lg font-semibold">Plugins, context, and voice</h3>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
        Plugin options and badges are plain data. The selector reports user intent through <code className="rounded bg-muted px-1.5 py-0.5 text-sm">onPluginToggle</code>; it never connects accounts or sends data by itself.
      </p>
      <div className="mt-6"><CodeViewer code={integrationsExample} language="tsx" title="composer-integrations.tsx" theme="ocean" showLineNumbers /></div>

      <h3 className="mt-10 text-lg font-semibold">Behavior contract</h3>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
        <li><strong className="text-foreground">Enter</strong> sends; <strong className="text-foreground">Shift + Enter</strong> creates a new line.</li>
        <li>Files can be selected or dropped, are deduplicated, and respect <code className="rounded bg-muted px-1.5 py-0.5 text-sm">maxAttachments</code>.</li>
        <li>The component clears text and attachments only after <code className="rounded bg-muted px-1.5 py-0.5 text-sm">onSend</code> resolves successfully.</li>
        <li>Use <code className="rounded bg-muted px-1.5 py-0.5 text-sm">sending</code> with <code className="rounded bg-muted px-1.5 py-0.5 text-sm">onStop</code> to expose cancellation.</li>
      </ul>
    </section>
  )
}
