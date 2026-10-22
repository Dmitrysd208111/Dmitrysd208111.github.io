import { Play, Pause } from 'lucide-react'
import { useMotionSettings } from '../store/motion'
import { useMotionPreference } from '../hooks/useMotionPreference'

export default function MotionControls() {
  const replay = useMotionSettings((state) => state.replay)
  const reduce = useMotionSettings((state) => state.reduce)
  const reduced = useMotionPreference()
  return (
    <div className="motion-controls" aria-label="Настройки анимаций">
      <button type="button" onClick={replay}>
        <Play size={12} /> {reduced ? 'Включить анимации' : 'Повторить анимации'}
      </button>
      {!reduced && (
        <button
          type="button"
          className="motion-reduce"
          aria-label="Уменьшить анимации"
          title="Уменьшить анимации"
          onClick={reduce}
        >
          <Pause size={12} />
        </button>
      )}
    </div>
  )
}
