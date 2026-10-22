import { create } from 'zustand'
interface Toast {
  id: number
  message: string
  kind: 'success' | 'error'
}
export const useToasts = create<{ toasts: Toast[]; remove: (id: number) => void }>((set) => ({
  toasts: [],
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
let nextId = 0
export function toast(message: string, kind: Toast['kind'] = 'success') {
  const id = ++nextId
  useToasts.setState((s) => ({ toasts: [...s.toasts.slice(-2), { id, message, kind }] }))
  setTimeout(() => useToasts.getState().remove(id), 4000)
}
