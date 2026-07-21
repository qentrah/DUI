"use client"

import { SignInForm } from "@/components/blocks/sign-in"
import { SessionBlock } from "@/components/blocks/session-block"
import { ColorFilterBlock } from "@/components/blocks/color-filter"
import { HeroSection, HeroSectionSimple, HeroSectionCentered } from "@/components/blocks/hero-sections"
import { type BlockSlug } from "@/lib/catalog"

export function BlockPreview({ slug }: { slug: BlockSlug | string }) {
  if (slug === "sign-in") return <SignInForm />
  if (slug === "session") return <SessionBlock />
  if (slug === "color-filter") return <ColorFilterBlock />
  if (slug === "hero-simple") return <HeroSectionSimple />
  if (slug === "hero-centered") return <HeroSectionCentered />
  return <HeroSection />
}