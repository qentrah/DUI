"use client"

import { Clock3, LogOut, MapPin, Settings, ShieldCheck } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StatusPill } from "@/components/ui/status-pill"
import { cn } from "@/lib/utils"

export interface SessionBlockProps {
  name?: string
  email?: string
  avatar?: string
  status?: "online" | "offline" | "away"
  plan?: string
  location?: string
  lastActive?: string
  onSignOut?: () => void
  onSettings?: () => void
  className?: string
}

const statusConfig = {
  online: { label: "Online", tone: "success" as const },
  offline: { label: "Offline", tone: "neutral" as const },
  away: { label: "Away", tone: "warning" as const },
}

function SessionBlock({
  name = "Sara Ahmed",
  email = "sara@example.com",
  avatar,
  status = "online",
  plan = "Enterprise",
  location = "Cairo, Egypt",
  lastActive = "Active now",
  onSignOut,
  onSettings,
  className,
}: SessionBlockProps) {
  return (
    <section className={cn("w-full max-w-2xl px-6 py-8 sm:px-8", className)} aria-labelledby="session-title">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar size="lg">
            {avatar && <AvatarImage src={avatar} alt={name} />}
            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="session-title" className="truncate text-lg font-semibold">{name}</h2>
              <StatusPill tone={statusConfig[status].tone} label={statusConfig[status].label} size="sm" />
            </div>
            <p className="truncate text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        <Badge variant="outline">{plan} workspace</Badge>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-4 text-sm sm:grid-cols-3">
        <div><p className="flex items-center gap-2 text-muted-foreground"><ShieldCheck className="size-4" />Security</p><p className="mt-1 font-medium">Protected with 2FA</p></div>
        <div><p className="flex items-center gap-2 text-muted-foreground"><MapPin className="size-4" />Location</p><p className="mt-1 font-medium">{location}</p></div>
        <div><p className="flex items-center gap-2 text-muted-foreground"><Clock3 className="size-4" />Last activity</p><p className="mt-1 font-medium">{lastActive}</p></div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button variant="outline" onPress={onSettings} className="gap-2"><Settings className="size-4" />Manage account</Button>
        <Button variant="danger-soft" onPress={onSignOut} className="gap-2"><LogOut className="size-4" />Sign out</Button>
      </div>
    </section>
  )
}

export { SessionBlock }
