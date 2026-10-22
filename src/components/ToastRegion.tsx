import { AnimatePresence, motion } from 'motion/react'
import { Check, X, CircleAlert } from 'lucide-react'
import { useToasts } from '../store/toasts'
export default function ToastRegion() {
  const { toasts, remove } = useToasts()
  return (
    <div className="toast-region" aria-live="polite" aria-atomic="false">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 30 }}
            className={`toast ${t.kind}`}
            role="status"
          >
            {t.kind === 'success' ? <Check size={19} /> : <CircleAlert size={19} />}
            <span>{t.message}</span>
            <button aria-label="Закрыть уведомление" onClick={() => remove(t.id)}>
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
