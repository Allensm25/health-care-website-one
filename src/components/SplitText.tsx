"use client"

import { motion } from "framer-motion"

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  stagger?: number
  once?: boolean
}

export default function SplitText({
  text,
  className,
  style,
  delay = 0,
  stagger = 0.065,
  once = true,
}: Props) {
  const words = text.split(" ")

  return (
    <span className={className} style={{ display: "inline", ...style }} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "105%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once }}
            transition={{
              duration: 0.62,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && (
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  )
}
