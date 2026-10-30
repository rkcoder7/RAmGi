import { motion } from 'framer-motion'

export default function Sunrise() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-[42%] aspect-square w-[min(120vw,60rem)] -translate-x-1/2 -translate-y-1/2"
        initial={{ y: '45%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 3.2, ease: [0.22, 0.8, 0.24, 1] }}
      >
        <div className="rays absolute inset-0" />
        <div className="absolute left-1/2 top-1/2 aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#fffbe8_0%,#ffe29a_55%,#ffc27a_100%)] shadow-[0_0_120px_40px_rgba(255,214,140,0.7)]" />
      </motion.div>
      <svg viewBox="0 0 1400 200" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-[34%] w-full" focusable="false">
        <path d="M0 120 C180 70 320 130 520 96 C720 60 860 140 1060 100 C1200 76 1320 110 1400 90 V200 H0 Z" fill="#fbd5b5" opacity="0.9" />
      </svg>
    </div>
  )
}
