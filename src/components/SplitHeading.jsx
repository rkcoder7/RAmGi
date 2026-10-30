import { Fragment } from 'react'
import { motion } from 'framer-motion'

const parent = (delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: delay } },
})

const word = {
  hidden: { y: '115%', opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.85, ease: [0.22, 0.8, 0.24, 1] } },
}

export default function SplitHeading({ text, as = 'h1', className = '', delay = 0 }) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      aria-label={text}
      variants={parent(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {words.map((item, index) => (
        <Fragment key={index}>
          <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span variants={word} className="inline-block">
              {item}
            </motion.span>
          </span>
          {index < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  )
}
