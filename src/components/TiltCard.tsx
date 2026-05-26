"use client"

import { useMotionValue, useSpring, useTransform, motion } from "framer-motion"
import { type CSSProperties, type ReactNode, useState } from "react"

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
  intensity?: number
}

export default function TiltCard({ children, className, style, intensity = 8 }: Props) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [glareX, setGlareX] = useState(50)
  const [glareY, setGlareY] = useState(50)
  const [hovered, setHovered] = useState(false)

  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity])

  const springRotateX = useSpring(rotateX, { stiffness: 350, damping: 35 })
  const springRotateY = useSpring(rotateY, { stiffness: 350, damping: 35 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    x.set(nx - 0.5)
    y.set(ny - 0.5)
    setGlareX(nx * 100)
    setGlareY(ny * 100)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        ...style,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
      }}
      className={className}
    >
      {children}

      {/* Glare highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)`,
          zIndex: 10,
        }}
      />
    </motion.div>
  )
}
