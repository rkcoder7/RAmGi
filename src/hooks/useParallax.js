import { useScroll, useTransform, useReducedMotion } from 'framer-motion'

export default function useParallax(ref, distance = 60) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance])
}
