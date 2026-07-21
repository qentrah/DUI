"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface ListItemProps {
  children: React.ReactNode
  onPress?: () => void
  href?: string
  isSelected?: boolean
  isDisabled?: boolean
  className?: string
}

function ListItem({ children, onPress, href, isSelected, isDisabled, className }: ListItemProps) {
  const Component = href ? "a" : "div"

  return (
    <Component
      href={href}
      onClick={onPress}
      className={cn(
        "group flex items-center gap-3 border-b border-border px-4 py-3 transition-all first:rounded-t-2xl last:rounded-b-2xl last:border-0 hover:bg-accent/50",
        isSelected && "bg-accent/40",
        isDisabled && "pointer-events-none opacity-40",
        onPress && "cursor-pointer",
        className
      )}
    >
      {children}
    </Component>
  )
}

ListItem.displayName = "ListItem"

export interface ListItemAvatarProps {
  src?: string
  alt?: string
  initials?: string
  icon?: React.ReactNode
  color?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const avatarSizes = {
  sm: "h-8 w-8 text-[10px]",
  md: "h-10 w-10 text-[11px]",
  lg: "h-12 w-12 text-[12px]",
}

function ListItemAvatar({ src, alt, initials, icon, color, size = "md", className }: ListItemAvatarProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full",
        avatarSizes[size],
        color ? "" : "bg-surface-secondary text-muted-foreground",
        className
      )}
      style={color ? { backgroundColor: `${color}15`, color } : undefined}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt || ""} className="h-full w-full object-cover" />
      ) : icon ? (
        icon
      ) : (
        <span className="font-semibold">{initials || "?"}</span>
      )}
    </div>
  )
}

ListItemAvatar.displayName = "ListItemAvatar"

export interface ListItemContentProps {
  primary: React.ReactNode
  secondary?: React.ReactNode
  description?: React.ReactNode
  className?: string
}

function ListItemContent({ primary, secondary, description, className }: ListItemContentProps) {
  return (
    <div className={cn("min-w-0 flex-1", className)}>
      <div className="flex items-center gap-2">
        <span className="truncate text-[13px] font-medium text-foreground">{primary}</span>
      </div>
      {secondary ? <p className="mt-0.5 truncate text-[12px] text-muted-foreground">{secondary}</p> : null}
      {description ? <p className="mt-0.5 truncate text-[11px] text-muted-foreground/80">{description}</p> : null}
    </div>
  )
}

ListItemContent.displayName = "ListItemContent"

export interface ListItemMetaProps {
  children: React.ReactNode
  className?: string
}

function ListItemMeta({ children, className }: ListItemMetaProps) {
  return <div className={cn("flex shrink-0 items-center gap-2", className)}>{children}</div>
}

ListItemMeta.displayName = "ListItemMeta"

export interface ListItemActionsProps {
  children: React.ReactNode
  alwaysVisible?: boolean
  className?: string
}

function ListItemActions({ children, alwaysVisible = false, className }: ListItemActionsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 transition-opacity",
        alwaysVisible ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        className
      )}
    >
      {children}
    </div>
  )
}

ListItemActions.displayName = "ListItemActions"

export interface ListItemTagProps {
  children: React.ReactNode
  className?: string
}

function ListItemTag({ children, className }: ListItemTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg bg-surface-secondary border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}

ListItemTag.displayName = "ListItemTag"

function ListItemDivider({ className }: { className?: string }) {
  return <div className={cn("h-px bg-border", className)} />
}

ListItemDivider.displayName = "ListItemDivider"

export interface ListItemEmptyProps {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function ListItemEmpty({ icon, title, description, action, className }: ListItemEmptyProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      {icon ? <div className="mb-3 text-muted-foreground">{icon}</div> : null}
      {title ? <p className="text-sm font-medium text-foreground">{title}</p> : null}
      {description ? <p className="mt-1 text-xs text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}

ListItemEmpty.displayName = "ListItemEmpty"

export interface ListProps {
  children: React.ReactNode
  className?: string
}

function List({ children, className }: ListProps) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-card shadow-md", className)}>
      <div className="divide-y divide-border">{children}</div>
    </div>
  )
}

List.displayName = "List"

export {
  ListItem,
  ListItemAvatar,
  ListItemContent,
  ListItemMeta,
  ListItemActions,
  ListItemTag,
  ListItemDivider,
  ListItemEmpty,
  List,
}