"use client"

import * as React from "react"
import { LogOut, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusPill } from "@/components/ui/status-pill"
import { cn } from "@/lib/utils"

export interface SessionBlockProps {
  name?: string
  email?: string
  avatar?: string
  status?: "online" | "offline" | "away"
  plan?: string
  onSignOut?: () => void
  onSettings?: () => void
  className?: string
}

const statusConfig = {
  online: { label: "Online", tone: "success" as const },
  offline: { label: "Offline", tone: "neutral" as const },
  away: { label: "Away", tone: "warning" as const },
}

export function SessionBlock({
  name = "Sara Ahmed",
  email = "sara@example.com",
  avatar,
  status = "online",
  plan = "Enterprise",
  onSignOut,
  onSettings,
  className,
}: SessionBlockProps) {
  return (
    <Card className={cn("w-full max-w-xs", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{name}</span>
              <span className="text-xs text-muted-foreground">{email}</span>
              <StatusPill tone={statusConfig[status].tone} label={statusConfig[status].label} size="sm" />
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {plan}
          </Badge>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" onPress={onSettings} className="flex-1 gap-2">
            <Settings className="size-3.5" />
            Settings
          </Button>
          <Button variant="danger" size="sm" onPress={onSignOut} className="flex-1 gap-2">
            <LogOut className="size-3.5" />
            Sign out
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}