"use client"

import { motion } from "framer-motion"

export default function ProgramsSection() {
  return (
    <section className="relative py-28 bg-[#020817] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">
            Our Programs
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Coverage Options for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Every Family
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            We work with Georgia Medicaid programs and private pay arrangements to make sure cost is never a barrier to excellent care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* GAPP Card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative group rounded-3xl p-8 border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-600/5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/40 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 text-xs font-semibold tracking-widest uppercase">Medicaid Covered</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Georgia Pediatric Program
                <span className="block text-cyan-400 text-xl mt-1">(GAPP)</span>
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                GAPP is a Georgia Medicaid waiver that provides skilled nursing and personal care services for children with complex medical needs — in the home rather than a hospital or facility. First Choice Care are seasoned GAPP providers, helping families navigate the enrollment process and delivering consistent, high-quality care once services begin.
              </p>
              <ul className="space-y-3">
                {[
                  "Skilled nursing visits at home",
                  "Personal care assistance for children",
                  "Family caregiver support and training",
                  "Care coordination with physicians",
                  "No out-of-pocket cost for qualifying families",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-300 text-sm">
                    <span className="text-cyan-400 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-white hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
                Ask About GAPP Eligibility
              </button>
            </div>
          </motion.div>

          {/* Private Pay Card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative group rounded-3xl p-8 border border-white/10 bg-white/[0.03] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/40 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-indigo-300 text-xs font-semibold tracking-widest uppercase">Flexible Payment</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Private Pay
                <span className="block text-indigo-400 text-xl mt-1">Personalized Plans</span>
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                For families who pay privately or through long-term care insurance, we offer flexible scheduling and fully customized care packages. You choose the level of care and hours that work for your family — with no program restrictions.
              </p>
              <ul className="space-y-3">
                {[
                  "Hourly, daily, or live-in care options",
                  "Custom care schedules and plans",
                  "Long-term care insurance coordination",
                  "Senior and adult care services",
                  "Transparent, upfront pricing",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-300 text-sm">
                    <span className="text-indigo-400 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full py-3.5 border border-indigo-500/40 rounded-full font-semibold text-indigo-300 hover:bg-indigo-500/10 hover:scale-105 transition-all duration-300">
                Get a Custom Quote
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
