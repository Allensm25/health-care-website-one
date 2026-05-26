"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

function processLogo(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = imageData.data

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2]
        const brightness = (r + g + b) / 3

        // Remove white background
        if (r > 235 && g > 235 && b > 235) {
          d[i + 3] = 0
          continue
        }
        if (r > 200 && g > 200 && b > 200) {
          d[i + 3] = Math.round(((255 - brightness) / 55) * 255)
          continue
        }

        // Remap dark pixels to dark olive — visible on cream background
        if (brightness < 140) {
          const t = brightness / 140 // 0 = black, 1 = medium dark
          d[i]     = Math.round(27  + t * 65)  // R → dark olive range
          d[i + 1] = Math.round(46  + t * 85)  // G → olive
          d[i + 2] = Math.round(9   + t * 30)  // B → near-zero for warmth
        }
        // Gold/amber pixels (brightness ≥ 140) stay untouched — still visible on cream
      }

      ctx.putImageData(imageData, 0, 0)
      resolve(canvas.toDataURL("image/png"))
    }
    img.src = src
  })
}

export default function LogoFloat() {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    processLogo("/fcc-logo.png").then(setSrc)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: src ? 1 : 0 }}
      transition={{ duration: 0.9 }}
      style={{ perspective: "1200px" }}
      className="flex items-center justify-center"
    >
      {src && (
        <motion.img
          src={src}
          alt="First Choice Care"
          animate={{
            y: [0, -18, 0],
            rotateY: [-12, 12, -12],
            rotateX: [5, -5, 5],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            transformStyle: "preserve-3d",
            width: "340px",
            height: "340px",
            objectFit: "contain",
            filter:
              "drop-shadow(0 16px 32px rgba(27,46,9,0.18)) " +
              "drop-shadow(0 0 36px rgba(134,176,96,0.40)) " +
              "drop-shadow(0 0 70px rgba(134,176,96,0.18))",
          }}
        />
      )}
    </motion.div>
  )
}
