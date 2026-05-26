"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, MessageCircle, X } from "lucide-react"

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="white" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const pill: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  paddingTop: "13px",
  paddingBottom: "13px",
  paddingLeft: "24px",
  paddingRight: "24px",
  borderRadius: "9999px",
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: 1,
  whiteSpace: "nowrap",
  textDecoration: "none",
  cursor: "pointer",
}

export default function FloatingActions() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: "fixed", bottom: "80px", right: "20px", zIndex: 9989, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}
          >
            <a
              href="https://wa.me/14045551234"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{ ...pill, backgroundColor: "#25D366", boxShadow: "0 4px 16px rgba(37,211,102,0.45)" }}
            >
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>

            <a
              href="sms:+14045551234"
              aria-label="Send Text"
              style={{ ...pill, backgroundColor: "#4E7A28", boxShadow: "0 4px 16px rgba(78,122,40,0.45)" }}
            >
              <MessageCircle width={16} height={16} color="white" style={{ flexShrink: 0 }} />
              <span>Send Text</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phone — always visible */}
      <a
        href="tel:+14045551234"
        aria-label="Call us"
        style={{ width: "52px", height: "52px", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #86B060, #4E7A28)", boxShadow: "0 4px 20px rgba(78,122,40,0.45)", flexShrink: 0 }}
      >
        <Phone width={22} height={22} color="white" />
      </a>

      {/* Toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close" : "More contact options"}
        style={{ width: "44px", height: "44px", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", background: open ? "rgba(27,46,9,0.15)" : "rgba(134,176,96,0.18)", border: "1.5px solid rgba(134,176,96,0.45)", cursor: "pointer", flexShrink: 0 }}
      >
        {open
          ? <X width={18} height={18} color="#86B060" />
          : <MessageCircle width={18} height={18} color="#86B060" />
        }
      </button>
    </div>
  )
}
