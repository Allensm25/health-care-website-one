"use client"

import { useEffect, useRef } from "react"

const PALETTE = [
  "rgba(78,122,40,",
  "rgba(134,176,96,",
  "rgba(154,120,40,",
  "rgba(27,46,9,",
]

interface Particle {
  x: number   // page-coordinate X (0..W)
  y: number   // page-coordinate Y (0..pageH)
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
}

export default function GlobalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse  = useRef({ x: -9999, y: -9999 })   // viewport coords
  const scrollY = useRef(0)                         // current scroll offset

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    if (!ctx) return

    let W     = window.innerWidth
    let viewH = window.innerHeight
    let pageH = document.documentElement.scrollHeight

    canvas.width  = W
    canvas.height = viewH  // canvas stays viewport-sized

    // 30% fewer than before: base density per viewport then scale across full page
    const perViewport = Math.floor((W * viewH) / 11000 * 0.70)
    const COUNT = Math.min(Math.floor(perViewport * (pageH / viewH)), 230)

    const REPEL   = 115
    const CONNECT = 95

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * pageH,   // spread across full page height
      vx:    (Math.random() - 0.5) * 0.28,
      vy:    (Math.random() - 0.5) * 0.28,
      size:  Math.random() * 3.0 + 2.5,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      alpha: Math.random() * 0.28 + 0.12,
    }))

    let raf: number

    function tick() {
      ctx.clearRect(0, 0, W, viewH)

      const sy  = scrollY.current
      const mx  = mouse.current.x
      const my  = mouse.current.y + sy   // convert to page coords for repulsion

      // Determine which particles are visible in viewport (with small buffer)
      const visible: Particle[] = []

      for (const p of particles) {
        // Mouse repulsion (in page coords)
        const dx = p.x - mx
        const dy = p.y - my
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < REPEL && d > 0) {
          const f = ((REPEL - d) / REPEL) * 0.055
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }

        // Gentle drift noise + damping
        p.vx += (Math.random() - 0.5) * 0.004
        p.vy += (Math.random() - 0.5) * 0.004
        p.vx *= 0.97
        p.vy *= 0.97

        p.x += p.vx
        p.y += p.vy

        // Wrap within page bounds
        if (p.x < -10)       p.x = W + 10
        if (p.x > W + 10)    p.x = -10
        if (p.y < -10)       p.y = pageH + 10
        if (p.y > pageH + 10) p.y = -10

        // Convert page coord → screen coord
        const screenY = p.y - sy
        const inView  = screenY > -20 && screenY < viewH + 20

        if (inView) {
          visible.push(p)
          ctx.beginPath()
          ctx.arc(p.x, screenY, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `${p.color}${p.alpha})`
          ctx.fill()
        }
      }

      // Connection lines — only between visible particles (stays O(k²) with k≈20-30)
      for (let i = 0; i < visible.length; i++) {
        const si = visible[i].y - sy
        for (let j = i + 1; j < visible.length; j++) {
          const dx = visible[i].x - visible[j].x
          const dy = visible[i].y - visible[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECT) {
            const a = (1 - d / CONNECT) * 0.10
            ctx.beginPath()
            ctx.moveTo(visible[i].x, si)
            ctx.lineTo(visible[j].x, visible[j].y - sy)
            ctx.strokeStyle = `rgba(78,122,40,${a})`
            ctx.lineWidth = 0.45
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }

    tick()

    const onResize = () => {
      W     = window.innerWidth
      viewH = window.innerHeight
      pageH = document.documentElement.scrollHeight
      canvas.width  = W
      canvas.height = viewH
    }

    const onScroll = () => { scrollY.current = window.scrollY }
    const onMove   = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    const onLeave  = () => { mouse.current.x = -9999; mouse.current.y = -9999 }

    window.addEventListener("resize",    onResize, { passive: true })
    window.addEventListener("scroll",    onScroll, { passive: true })
    window.addEventListener("mousemove", onMove,   { passive: true })
    document.addEventListener("mouseleave", onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize",    onResize)
      window.removeEventListener("scroll",    onScroll)
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
        mixBlendMode: "multiply",
      }}
    />
  )
}
