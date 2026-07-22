"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react"

export interface MotionRevealProps extends Omit<HTMLMotionProps<"div">, "transition"> {
  offset?: number
  duration?: number
  once?: boolean
}

function MotionReveal({ children, offset = 24, duration = 0.6, once = true, className, ...props }: MotionRevealProps) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: offset }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

MotionReveal.displayName = "MotionReveal"

export { MotionReveal }
