import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { useMotionPreference } from '../hooks/useMotionPreference'
import { useMotionSettings } from '../store/motion'

export default function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useMotionPreference()
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full'
  }, [reduced])
  useEffect(() => {
    // Explicit preview link: opt into full motion and replay on page load.
    if (new URLSearchParams(window.location.search).get('motion') === 'full') {
      useMotionSettings.getState().replay()
    }
  }, [])
  return <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{children}</MotionConfig>
}
