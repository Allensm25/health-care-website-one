"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import dynamic from "next/dynamic"
import SplitText from "@/components/SplitText"
import MagneticButton from "@/components/MagneticButton"
import CountUp from "@/components/CountUp"

const HomeScene = dynamic(() => import("@/components/3d/HomeScene"), { ssr: false })
const LogoFloat = dynamic(() => import("@/components/LogoFloat"), { ssr: false })

const stats = [
  { value: "500+", target: 500, suffix: "+", label: "Families Served" },
  { value: "10+",  target: 10,  suffix: "+", label: "Years in Atlanta" },
  { value: "24/7", target: null,              label: "Care Available" },
  { value: "100%", target: 100, suffix: "%",  label: "GAPP Certified" },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Parallax layers at different depths
  const gridY    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const blob1Y   = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
  const blob2Y   = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])
  const sceneY   = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const textY    = useTransform(scrollYProgress, [0, 1], ["0%", "8%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      style={{ background: "var(--brand-dark)" }}
    >
      {/* Background atmosphere — parallax layers */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: "linear-gradient(135deg, rgba(134,176,96,0.10) 0%, transparent 55%, rgba(154,120,40,0.06) 100%)" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: "rgba(134,176,96,0.12)", y: blob1Y }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[90px]"
          style={{ background: "rgba(154,120,40,0.07)", y: blob2Y }}
        />
        {/* Warm grid — fastest parallax layer */}
        <motion.div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(134,176,96,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(134,176,96,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            y: gridY,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full py-16">

        {/* Left: Text — slowest layer */}
        <motion.div className="flex flex-col gap-8" style={{ y: textY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 w-fit rounded-full px-4 py-1.5"
            style={{ background: "rgba(134,176,96,0.14)", border: "1px solid rgba(134,176,96,0.40)" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--brand-olive)" }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--brand-olive-lt)" }}>
              Atlanta, Georgia · Home Health Care
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight" style={{ color: "var(--text-primary)" }}>
            <SplitText text="Care That Comes" delay={0.18} stagger={0.07} />{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, var(--brand-olive-lt), var(--brand-cream))" }}
            >
              <SplitText text="To You" delay={0.52} stagger={0.09} />
            </span>
            <br />
            <SplitText text="With Heart" delay={0.72} stagger={0.08} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg leading-relaxed max-w-md"
            style={{ color: "var(--text-body)" }}
          >
            First Choice Care delivers compassionate, professional home health services to children
            and adults across the Atlanta metro area — including Georgia&apos;s Pediatric Program
            (GAPP) and private pay services.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton>
              <a
                href="#contact"
                className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl inline-block"
                style={{ background: "linear-gradient(135deg, var(--brand-olive-lt), var(--brand-olive-dark))", color: "white" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(78,122,40,0.35)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                Get Started Today
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#services"
                className="px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 inline-block"
                style={{ border: "1px solid rgba(134,176,96,0.50)", color: "var(--brand-olive-lt)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(134,176,96,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Our Services
              </a>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6"
            style={{ borderTop: "1px solid rgba(27,46,9,0.10)" }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex flex-col gap-1"
              >
                <span className="text-2xl font-bold" style={{ color: "var(--brand-olive-lt)" }}>
                  {s.target != null
                    ? <CountUp target={s.target} suffix={s.suffix ?? ""} duration={1.8} />
                    : s.value
                  }
                </span>
                <span className="text-xs leading-tight" style={{ color: "var(--text-muted)" }}>{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D scene — mid parallax layer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25 }}
          className="relative h-[480px] lg:h-[600px] w-full flex items-center justify-center"
          style={{ y: sceneY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0">
            <HomeScene />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div
              className="absolute w-[460px] h-[460px] rounded-full blur-[90px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(134,176,96,0.12) 0%, rgba(134,176,96,0.04) 55%, transparent 75%)" }}
            />

            <div
              className="absolute w-[380px] h-[380px] rounded-full pointer-events-none"
              style={{ animation: "spin-slow 18s linear infinite" }}
            >
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
                style={{ background: "var(--brand-olive-lt)", boxShadow: "0 0 14px rgba(78,122,40,0.6)" }}
              />
            </div>
            <div
              className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
              style={{ animation: "spin-slow 26s linear infinite reverse" }}
            >
              <div
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                style={{ background: "var(--brand-cream)", boxShadow: "0 0 10px rgba(154,120,40,0.5)" }}
              />
            </div>

            <LogoFloat />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "var(--brand-olive-lt)" }}>
                First Choice Care
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Atlanta, Georgia · Est. 2014
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: heroOpacity }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-faint)" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full flex justify-center pt-1.5"
          style={{ border: "2px solid rgba(134,176,96,0.45)" }}
        >
          <div className="w-1 h-2 rounded-full" style={{ background: "var(--brand-olive-lt)" }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
