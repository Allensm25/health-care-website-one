"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function IntroAnimation() {
  const [show, setShow] = useState(false)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (sessionStorage.getItem("fcc-intro")) return
    setShow(true)

    const t1 = setTimeout(() => setPhase(1), 700)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => {
      sessionStorage.setItem("fcc-intro", "1")
      setShow(false)
    }, 2600)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{ background: "var(--brand-dark)", zIndex: 999999 }}
        >
          {/* Ambient glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "700px",
              height: "700px",
              background: "radial-gradient(circle, rgba(134,176,96,0.12) 0%, rgba(134,176,96,0.03) 50%, transparent 70%)",
            }}
          />

          {/* Accent bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "52px",
              height: "3px",
              borderRadius: "2px",
              background: "linear-gradient(to right, var(--brand-olive-lt), var(--brand-cream))",
              transformOrigin: "left",
              marginBottom: "22px",
            }}
          />

          {/* Brand name */}
          <motion.h1
            initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-center"
            style={{ color: "var(--text-primary)" }}
          >
            First Choice{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, var(--brand-olive-lt), var(--brand-cream))" }}
            >
              Care
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xs tracking-[0.3em] uppercase mt-4 font-medium"
            style={{ color: "var(--text-faint)" }}
          >
            Atlanta Home Health Care
          </motion.p>

          {/* Progress bar */}
          <div
            className="absolute bottom-14 left-1/2 -translate-x-1/2 overflow-hidden rounded-full"
            style={{ width: "160px", height: "2px", background: "rgba(134,176,96,0.18)" }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase >= 2 ? 1 : phase >= 1 ? 0.6 : 0.15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                height: "100%",
                borderRadius: "2px",
                background: "linear-gradient(to right, var(--brand-olive-lt), var(--brand-cream))",
                transformOrigin: "left",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
