import { useReducedMotion } from 'motion/react'
import { useMotionSettings } from '../store/motion'

export function useMotionPreference() {
  const systemReduced = useReducedMotion()
  const preference = useMotionSettings((state) => state.preference)
  return preference === 'reduced' || (preference === 'system' && !!systemReduced)
}
