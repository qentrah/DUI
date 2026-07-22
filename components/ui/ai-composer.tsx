"use client"

import * as React from "react"
import { ArrowUp, Bot, ChevronDown, File, Globe2, ListChecks, MessageCircle, Mic, Paperclip, Plug, Square, X } from "lucide-react"

import { cn } from "@/lib/utils"

export type AIComposerMode = "ask" | "agent" | "plan"
export type AIComposerLayout = "landing" | "thread"

export interface AIComposerBadge {
  id: string
  label: string
  tone?: "neutral" | "info" | "success"
}

export interface AIComposerPlugin {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
}

export interface AIComposerAttachment {
  id: string
  file: File
  previewUrl?: string
}

export interface AIComposerProps {
  value: string
  onChange: (value: string) => void
  onSend: (message: string, files: File[]) => void | Promise<void>
  onStop?: () => void
  sending?: boolean
  mode?: AIComposerMode
  onModeChange?: (mode: AIComposerMode) => void
  layout?: AIComposerLayout
  placeholder?: string
  badges?: readonly AIComposerBadge[]
  onRemoveBadge?: (id: string) => void
  plugins?: readonly AIComposerPlugin[]
  selectedPluginIds?: readonly string[]
  onPluginToggle?: (plugin: AIComposerPlugin) => void
  onVoiceClick?: () => void
  maxAttachments?: number
  accept?: string
  className?: string
}

const modes = [
  { value: "ask", label: "Ask", description: "Answer and explain", icon: MessageCircle },
  { value: "agent", label: "Agent", description: "Complete the task", icon: Bot },
  { value: "plan", label: "Plan", description: "Create a clear plan", icon: ListChecks },
] as const

function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`
}

function AIComposer({
  value,
  onChange,
  onSend,
  onStop,
  sending = false,
  mode = "ask",
  onModeChange,
  layout = "thread",
  placeholder = "Assign a task or ask anything",
  badges = [],
  onRemoveBadge,
  plugins = [],
  selectedPluginIds = [],
  onPluginToggle,
  onVoiceClick,
  maxAttachments = 6,
  accept = "image/*,.pdf,.md,.txt,.csv,.json,.js,.ts,.tsx,.jsx,.py,.css,.html",
  className,
}: AIComposerProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const attachmentUrlsRef = React.useRef(new Set<string>())
  const [attachments, setAttachments] = React.useState<AIComposerAttachment[]>([])
  const [modeOpen, setModeOpen] = React.useState(false)
  const [pluginsOpen, setPluginsOpen] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)

  React.useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, layout === "landing" ? 72 : 58), 220)}px`
  }, [layout, value])

  React.useEffect(() => () => {
    attachmentUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
  }, [])

  const addFiles = (files: FileList | File[]) => {
    setAttachments((current) => {
      const ids = new Set(current.map((attachment) => attachment.id))
      const availableSlots = Math.max(0, maxAttachments - current.length)
      const next = Array.from(files)
        .filter((file) => !ids.has(fileKey(file)))
        .slice(0, availableSlots)
        .map((file) => {
          const previewUrl = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined
          if (previewUrl) attachmentUrlsRef.current.add(previewUrl)
          return { id: fileKey(file), file, previewUrl }
        })
      return [...current, ...next]
    })
  }

  const removeAttachment = (id: string) => {
    setAttachments((current) => {
      const target = current.find((attachment) => attachment.id === id)
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl)
        attachmentUrlsRef.current.delete(target.previewUrl)
      }
      return current.filter((attachment) => attachment.id !== id)
    })
  }

  const submit = async () => {
    const message = value.trim()
    if (sending || (!message && attachments.length === 0)) return
    await onSend(message, attachments.map((attachment) => attachment.file))
    onChange("")
    attachments.forEach((attachment) => {
      if (attachment.previewUrl) {
        URL.revokeObjectURL(attachment.previewUrl)
        attachmentUrlsRef.current.delete(attachment.previewUrl)
      }
    })
    setAttachments([])
  }

  const activeMode = modes.find((item) => item.value === mode) ?? modes[0]
  const ActiveModeIcon = activeMode.icon
  const ready = Boolean(value.trim() || attachments.length)

  return (
    <div
      className={cn("w-full", layout === "landing" && "mx-auto max-w-3xl", className)}
      onDragEnter={(event) => { if (event.dataTransfer.types.includes("Files")) { event.preventDefault(); setDragging(true) } }}
      onDragOver={(event) => { if (event.dataTransfer.types.includes("Files")) event.preventDefault() }}
      onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragging(false) }}
      onDrop={(event) => { event.preventDefault(); setDragging(false); if (event.dataTransfer.files.length) addFiles(event.dataTransfer.files) }}
    >
      <div className={cn(
        "relative overflow-visible border border-border bg-background text-foreground transition focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/15",
        layout === "landing" ? "rounded-3xl shadow-xl shadow-black/10" : "rounded-2xl shadow-sm",
        dragging && "border-ring bg-accent/30"
      )}>
        <input ref={fileInputRef} type="file" multiple accept={accept} className="hidden" onChange={(event) => { if (event.target.files) addFiles(event.target.files); event.target.value = "" }} />

        {(modeOpen || pluginsOpen) && <button type="button" className="fixed inset-0 z-20 cursor-default" onClick={() => { setModeOpen(false); setPluginsOpen(false) }} aria-label="Close composer menu" />}

        {dragging && <div className="pointer-events-none absolute inset-2 z-20 grid place-items-center rounded-2xl border border-dashed border-ring bg-background/90 text-sm font-medium backdrop-blur">Drop files to attach</div>}

        {(badges.length > 0 || attachments.length > 0) && (
          <div className="flex flex-wrap gap-2 px-4 pt-3">
            {badges.map((badge) => (
              <span key={badge.id} className={cn("inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs", badge.tone === "info" ? "border-blue-500/30 bg-blue-500/10 text-blue-400" : badge.tone === "success" ? "border-success-border bg-success-bg text-success" : "border-border bg-muted/50 text-muted-foreground")}>
                <Globe2 className="size-3" /> {badge.label}
                {onRemoveBadge && <button type="button" onClick={() => onRemoveBadge(badge.id)} aria-label={`Remove ${badge.label}`}><X className="size-3" /></button>}
              </span>
            ))}
            {attachments.map((attachment) => (
              <span key={attachment.id} className="inline-flex h-8 max-w-52 items-center gap-2 rounded-lg border border-border bg-muted/40 px-2 text-xs">
                {/* Blob previews are local object URLs and cannot use the Next.js image optimizer. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {attachment.previewUrl ? <img src={attachment.previewUrl} alt="" className="size-5 rounded object-cover" /> : <File className="size-3.5 text-muted-foreground" />}
                <span className="truncate">{attachment.file.name}</span>
                <button type="button" onClick={() => removeAttachment(attachment.id)} aria-label={`Remove ${attachment.file.name}`}><X className="size-3" /></button>
              </span>
            ))}
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void submit() } }}
          disabled={sending}
          placeholder={placeholder}
          dir="auto"
          rows={2}
          className="w-full resize-none bg-transparent px-4 pt-4 text-[15px] leading-6 outline-none placeholder:text-muted-foreground disabled:opacity-60 sm:px-5"
        />

        <div className="flex items-center justify-between gap-3 px-3 pb-3 pt-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={sending} className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground disabled:opacity-50" aria-label="Attach files"><Paperclip className="size-4" /></button>

            <div className="relative">
              <button type="button" onClick={() => setPluginsOpen((current) => !current)} disabled={sending} className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-2.5 text-xs text-muted-foreground transition hover:bg-accent hover:text-foreground" aria-expanded={pluginsOpen}><Plug className="size-3.5" /><span className="hidden sm:inline">Plugins</span><ChevronDown className="size-3" /></button>
              {pluginsOpen && <div className="absolute bottom-full start-0 z-30 mb-2 w-64 rounded-xl border border-border bg-popover p-1.5 shadow-2xl">
                <p className="px-2 py-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Connected plugins</p>
                {plugins.length ? plugins.map((plugin) => <button type="button" key={plugin.id} onClick={() => { onPluginToggle?.(plugin); setPluginsOpen(false) }} className="flex w-full items-start gap-2.5 rounded-lg px-2 py-2 text-start hover:bg-accent"><span className="mt-0.5 grid size-7 place-items-center rounded-lg bg-muted">{plugin.icon ?? <Plug className="size-3.5" />}</span><span className="min-w-0"><strong className="block truncate text-xs">{plugin.label}</strong><span className="block truncate text-[10px] text-muted-foreground">{selectedPluginIds.includes(plugin.id) ? "Selected" : plugin.description}</span></span></button>) : <p className="px-2 py-3 text-xs text-muted-foreground">No plugins connected.</p>}
              </div>}
            </div>

            <div className="relative">
              <button type="button" onClick={() => setModeOpen((current) => !current)} className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs text-muted-foreground transition hover:bg-accent hover:text-foreground" aria-expanded={modeOpen}><ActiveModeIcon className="size-3.5" />{activeMode.label}<ChevronDown className="size-3" /></button>
              {modeOpen && <div className="absolute bottom-full start-0 z-30 mb-2 w-52 rounded-xl border border-border bg-popover p-1.5 shadow-2xl">{modes.map((item) => { const Icon = item.icon; return <button type="button" key={item.value} onClick={() => { onModeChange?.(item.value); setModeOpen(false) }} className={cn("flex w-full items-center gap-2 rounded-lg px-2 py-2 text-start hover:bg-accent", mode === item.value && "bg-accent")}><Icon className="size-4" /><span><strong className="block text-xs">{item.label}</strong><span className="text-[10px] text-muted-foreground">{item.description}</span></span></button> })}</div>}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onVoiceClick && <button type="button" onClick={onVoiceClick} disabled={sending} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Start voice input"><Mic className="size-4" /></button>}
            <button type="button" onClick={() => sending ? onStop?.() : void submit()} disabled={!sending && !ready} className="grid size-8 place-items-center rounded-full bg-foreground text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground" aria-label={sending ? "Stop response" : "Send message"}>{sending ? <Square className="size-3 fill-current" /> : <ArrowUp className="size-4" />}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

AIComposer.displayName = "AIComposer"

export { AIComposer }
