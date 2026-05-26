"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Ring spring (lagged)
  const springX = useSpring(mouseX, { stiffness: 380, damping: 32 })
  const springY = useSpring(mouseY, { stiffness: 380, damping: 32 })

  // Chained trail springs — each follows the previous, creating a liquid tail
  const t1x = useSpring(mouseX, { stiffness: 180, damping: 24 })
  const t1y = useSpring(mouseY, { stiffness: 180, damping: 24 })
  const t2x = useSpring(t1x, { stiffness: 130, damping: 22 })
  const t2y = useSpring(t1y, { stiffness: 130, damping: 22 })
  const t3x = useSpring(t2x, { stiffness: 90, damping: 20 })
  const t3y = useSpring(t2y, { stiffness: 90, damping: 20 })
  const t4x = useSpring(t3x, { stiffness: 60, damping: 18 })
  const t4y = useSpring(t3y, { stiffness: 60, damping: 18 })

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    document.documentElement.style.cursor = "none"

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setHovering(!!t.closest("a, button, [data-hover]"))
    }

    window.addEventListener("mousemove", move)
    document.addEventListener("mouseover", over)

    return () => {
      document.documentElement.style.cursor = ""
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseover", over)
    }
  }, [mouseX, mouseY, visible])

  const trailDots = [
    { x: t1x, y: t1y, size: 5, opacity: 0.45 },
    { x: t2x, y: t2y, size: 4, opacity: 0.30 },
    { x: t3x, y: t3y, size: 3, opacity: 0.18 },
    { x: t4x, y: t4y, size: 2, opacity: 0.10 },
  ]

  return (
    <>
      {/* Liquid trail */}
      {trailDots.map((dot, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 rounded-full pointer-events-none"
          style={{
            x: dot.x,
            y: dot.y,
            translateX: "-50%",
            translateY: "-50%",
            width: dot.size,
            height: dot.size,
            zIndex: 99994 + i,
            background: "var(--brand-olive-lt)",
            opacity: visible && !hovering ? dot.opacity : 0,
            transition: "opacity 0.25s",
          }}
        />
      ))}

      {/* Ring — spring-lagged */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          border: "1.5px solid rgba(134,176,96,0.75)",
          transition: "opacity 0.3s",
        }}
        animate={{
          width: hovering ? 52 : 30,
          height: hovering ? 52 : 30,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />

      {/* Dot — instant */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 99999,
          background: "var(--brand-olive-lt)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
        animate={{
          width: hovering ? 4 : 7,
          height: hovering ? 4 : 7,
          boxShadow: hovering
            ? "0 0 16px rgba(134,176,96,0.95), 0 0 32px rgba(134,176,96,0.40)"
            : "0 0 6px rgba(134,176,96,0.65)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      />
    </>
  )
}
