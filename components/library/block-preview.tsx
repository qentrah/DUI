"use client"

import { DashboardPanel } from "@/components/blocks/dashboard-panel"
import { FilterToolbar } from "@/components/blocks/filter-toolbar"
import { MemberList } from "@/components/blocks/member-list"
import { type BlockSlug } from "@/lib/catalog"

export function BlockPreview({ slug }: { slug: BlockSlug | string }) {
  if (slug === "filter-toolbar") return <FilterToolbar />
  if (slug === "member-list") return <MemberList />
  return <DashboardPanel />
}
