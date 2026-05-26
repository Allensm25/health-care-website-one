"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  duration?: number
}

export default function ScrambleText({ text, className, style, delay = 0, duration = 900 }: Props) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const startTimeout = setTimeout(() => {
      const letters = text.split("")
      const frames = Math.round(duration / 40)
      let frame = 0

      const interval = setInterval(() => {
        setDisplay(
          letters
            .map((char, i) => {
              if (char === " ") return " "
              if (frame / frames > i / letters.length) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join("")
        )
        frame++
        if (frame > frames) {
          clearInterval(interval)
          setDisplay(text)
        }
      }, 40)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(startTimeout)
  }, [inView, text, delay, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}
