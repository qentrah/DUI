import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  List,
  ListItem,
  ListItemActions,
  ListItemAvatar,
  ListItemContent,
  ListItemMeta,
  ListItemTag
} from "@/components/ui/list-item"
import { StatusBadge } from "@/components/ui/status-badge"
import { DepartmentDot } from "@/components/ui/department-dot"
import { cn } from "@/lib/utils"

export interface MemberListProps {
  className?: string
  members?: Array<{
    id: string
    name: string
    role: string
    department: string
    status: "active" | "pending" | "inactive"
    initials: string
  }>
  onMemberClick?: (id: string) => void
}

const defaultMembers: NonNullable<MemberListProps["members"]> = [
  { id: "1", name: "Sara Ahmed", role: "Product designer", department: "marketing", status: "active", initials: "SA" },
  { id: "2", name: "Omar Nabil", role: "Frontend engineer", department: "engineering", status: "pending", initials: "ON" },
  { id: "3", name: "Lina Farid", role: "Account lead", department: "sales", status: "active", initials: "LF" }
]

/**
 * Block: member directory list composed from ListItem family, StatusBadge, DepartmentDot.
 */
export function MemberList({ className, members = defaultMembers, onMemberClick }: MemberListProps) {
  return (
    <List className={cn(className)}>
      {members.map((member) => (
        <ListItem key={member.id} onClick={() => onMemberClick?.(member.id)}>
          <ListItemAvatar initials={member.initials} color="#3b82f6" />
          <ListItemContent
            primary={member.name}
            secondary={member.role}
            description={
              <span className="inline-flex items-center gap-1.5">
                <DepartmentDot department={member.department} showLabel />
              </span>
            }
          />
          <ListItemMeta>
            <ListItemTag>{member.role.split(" ")[0]}</ListItemTag>
            <StatusBadge variant={member.status}>{member.status}</StatusBadge>
            <ListItemActions>
              <Button size="icon" variant="ghost" aria-label="More actions">
                <MoreHorizontal className="size-4" />
              </Button>
            </ListItemActions>
          </ListItemMeta>
        </ListItem>
      ))}
    </List>
  )
}
