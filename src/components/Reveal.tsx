import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useMotionPreference } from '../hooks/useMotionPreference'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
  layout?: boolean | 'position'
}

/** Reveal once, near the viewport. Keep content visible without observer support. */
export default function Reveal({
  children,
  className,
  delay = 0,
  distance = 38,
  layout,
}: RevealProps) {
  const reducedMotion = useMotionPreference()
  const canObserve = typeof IntersectionObserver !== 'undefined'
  return (
    <motion.div
      className={`reveal-block ${className ?? ''}`}
      layout={layout}
      initial={reducedMotion || !canObserve ? false : 'hidden'}
      whileInView={canObserve ? 'visible' : undefined}
      animate={!canObserve ? 'visible' : undefined}
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reducedMotion ? 0 : 0.9,
            delay: reducedMotion ? 0 : delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      transition={{ layout: { duration: reducedMotion ? 0 : 0.35 } }}
    >
      {children}
    </motion.div>
  )
}
