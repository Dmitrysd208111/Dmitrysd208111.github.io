import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type MotionPreference = 'system' | 'full' | 'reduced'
interface MotionState {
  preference: MotionPreference
  revision: number
  replay: () => void
  reduce: () => void
}

export const useMotionSettings = create<MotionState>()(
  persist(
    (set) => ({
      preference: 'system',
      revision: 0,
      replay: () => set((state) => ({ preference: 'full', revision: state.revision + 1 })),
      reduce: () => set({ preference: 'reduced' }),
    }),
    { name: 'veltrix-motion-v1', partialize: (state) => ({ preference: state.preference }) },
  ),
)
