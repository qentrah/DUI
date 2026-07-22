"use client"

import { SignInForm } from "@/components/blocks/sign-in"
import { SessionBlock } from "@/components/blocks/session-block"
import { ColorFilterBlock } from "@/components/blocks/color-filter"
import { HeroSection, HeroSectionSimple, HeroSectionCentered } from "@/components/blocks/hero-sections"
import { CtaSection } from "@/components/blocks/cta-section"
import { FeatureGrid } from "@/components/blocks/feature-grid"
import { TestimonialSection } from "@/components/blocks/testimonial-section"
import { LogoCloud } from "@/components/blocks/logo-cloud"
import { FaqSection } from "@/components/blocks/faq-section"
import { SignInFormCSS } from "@/components/blocks/sign-in-css"
import { SignInFormGSAP } from "@/components/blocks/sign-in-gsap"
import { GalleryMosaic } from "@/components/blocks/gallery-mosaic"
import { PhotoStory } from "@/components/blocks/photo-story"
import { TestimonialGrid } from "@/components/blocks/testimonial-grid"
import { LocalLogoWall } from "@/components/blocks/local-logo-wall"
import { type BlockSlug } from "@/lib/catalog"

export function BlockPreview({ slug, variant = "normal" }: { slug: BlockSlug | string; variant?: string }) {
  if (slug === "sign-in") {
    if (variant === "css") return <SignInFormCSS />
    if (variant === "gsap") return <SignInFormGSAP />
    return <SignInForm />
  }
  if (slug === "session") return <SessionBlock />
  if (slug === "color-filter") return <ColorFilterBlock />
  if (slug === "hero-simple") return <HeroSectionSimple />
  if (slug === "hero-centered") return <HeroSectionCentered />
  if (slug === "cta-section") return <CtaSection />
  if (slug === "feature-grid") return <FeatureGrid />
  if (slug === "testimonial-section") return <TestimonialSection />
  if (slug === "logo-cloud") return <LogoCloud />
  if (slug === "faq-section") return <FaqSection />
  if (slug === "gallery-mosaic") return <GalleryMosaic />
  if (slug === "photo-story") return <PhotoStory />
  if (slug === "testimonial-grid") return <TestimonialGrid />
  if (slug === "local-logo-wall") return <LocalLogoWall />
  return <HeroSection />
}
