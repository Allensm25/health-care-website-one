"use client"

import { motion } from "framer-motion"

const reasons = [
  {
    number: "01",
    title: "Licensed & Insured Caregivers",
    description:
      "Every caregiver is thoroughly background-checked, licensed, and continuously trained to meet Georgia state standards.",
  },
  {
    number: "02",
    title: "Personalized Care Plans",
    description:
      "No two patients are the same. We build individualized care plans in partnership with families, physicians, and case managers.",
  },
  {
    number: "03",
    title: "GAPP Program Specialists",
    description:
      "We are experienced navigators of the Georgia Pediatric Program — helping families access and maximize their benefits without the stress.",
  },
  {
    number: "04",
    title: "Family-Centered Approach",
    description:
      "We believe family is the backbone of healing. Our caregivers integrate seamlessly with your household and keep you informed every step of the way.",
  },
  {
    number: "05",
    title: "Available When You Need Us",
    description:
      "Care doesn't run on a 9-to-5 schedule. Our team is available around the clock to respond to your family's needs.",
  },
  {
    number: "06",
    title: "Deep Roots in Atlanta",
    description:
      "We are a local Atlanta company — not a national franchise. We know this community and we genuinely care about the families we serve here.",
  },
]

export default function WhyUsSection() {
  return (
    <section id="about" className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #020817 0%, #050d1a 100%)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Decorative orb */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Header + trust badge */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-28"
          >
            <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">
              Why Families Choose Us
            </span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white leading-tight">
              We Put{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                People First
              </span>
              {" "}— Always
            </h2>
            <p className="mt-5 text-zinc-400 text-lg leading-relaxed">
              Choosing a home health care provider is one of the most important decisions a family can make. At First Choice Care, we earn that trust every single day through consistency, compassion, and clinical excellence.
            </p>

            {/* Trust badge */}
            <div className="mt-8 flex items-center gap-4 bg-white/[0.04] border border-cyan-500/20 rounded-2xl p-5 w-fit">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl flex-shrink-0">
                ✓
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Georgia State Licensed</p>
                <p className="text-zinc-500 text-xs mt-0.5">Fully certified home health care provider serving the Atlanta metro area</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Reasons list */}
          <div className="flex flex-col gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.number}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group flex gap-5 bg-white/[0.02] border border-white/8 hover:border-cyan-500/30 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04]"
              >
                <span className="text-cyan-500/40 font-bold text-2xl leading-none flex-shrink-0 group-hover:text-cyan-400/70 transition-colors">
                  {r.number}
                </span>
                <div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-300 transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                    {r.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
