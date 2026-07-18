import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Skills",
  description: "Portable, version-controlled instructions for AI agents and product workflows.",
  alternates: { canonical: "/skills" },
}

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children
}
