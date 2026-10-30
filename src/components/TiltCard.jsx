import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function TiltCard({ children, className = '' }) {
  const reduce = useReducedMotion()
  const rotateXTarget = useMotionValue(0)
  const rotateYTarget = useMotionValue(0)
  const rotateX = useSpring(rotateXTarget, { stiffness: 160, damping: 18 })
  const rotateY = useSpring(rotateYTarget, { stiffness: 160, damping: 18 })

  const onMove = (event) => {
    if (reduce || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateYTarget.set(px * 9)
    rotateXTarget.set(-py * 7)
  }

  const onLeave = () => {
    rotateXTarget.set(0)
    rotateYTarget.set(0)
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
