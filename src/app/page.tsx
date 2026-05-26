import Navigation from "@/components/Navigation"
import ScrollProgress from "@/components/ScrollProgress"
import HeroSection from "@/components/HeroSection"
import ServicesSection from "@/components/ServicesSection"
import GAPPSection from "@/components/GAPPSection"
import HowItWorksSection from "@/components/HowItWorksSection"
import TrustSection from "@/components/TrustSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import ServiceAreaMap from "@/components/ServiceAreaMap"
import AboutSection from "@/components/AboutSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ background: "var(--brand-dark)" }}>
      <ScrollProgress />
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <GAPPSection />
      <HowItWorksSection />
      <TrustSection />
      <TestimonialsSection />
      <ServiceAreaMap />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
