import { motion } from 'framer-motion'

export default function Reveal({ as = 'div', delay = 0, y = 26, x = 0, className = '', children, ...rest }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.85, ease: [0.22, 0.8, 0.24, 1], delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
