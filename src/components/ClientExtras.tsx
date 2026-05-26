"use client"

import dynamic from "next/dynamic"

const SmoothScrollProvider = dynamic(() => import("@/components/SmoothScrollProvider"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false })
const GrainOverlay = dynamic(() => import("@/components/GrainOverlay"), { ssr: false })
const IntroAnimation = dynamic(() => import("@/components/IntroAnimation"), { ssr: false })
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false })
const StickyCTABar = dynamic(() => import("@/components/StickyCTABar"), { ssr: false })
const FloatingActions = dynamic(() => import("@/components/FloatingActions"), { ssr: false })
const GlobalParticles = dynamic(() => import("@/components/GlobalParticles"), { ssr: false })

export default function ClientExtras() {
  return (
    <>
      <IntroAnimation />
      <SmoothScrollProvider />
      <CustomCursor />
      <GrainOverlay />
      <ScrollProgress />
      <StickyCTABar />
      <FloatingActions />
      <GlobalParticles />
    </>
  )
}
