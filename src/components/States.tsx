import { Link } from 'react-router-dom'
import { ArrowRight, PackageOpen, RotateCw } from 'lucide-react'
export function LoadingState() {
  return (
    <div className="container page-space" role="status" aria-label="Загрузка">
      <div className="skeleton skeleton-title" />
      <div className="product-grid">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton skeleton-image" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
          </div>
        ))}
      </div>
      <span className="sr-only">Загрузка товаров…</span>
    </div>
  )
}
export function ErrorState({ retry }: { retry: () => void }) {
  return (
    <div className="empty-state" role="alert">
      <RotateCw size={36} />
      <h2>Не удалось загрузить товары</h2>
      <p>Проверьте соединение и попробуйте ещё раз.</p>
      <button className="btn btn-primary" onClick={retry}>
        Повторить загрузку
      </button>
    </div>
  )
}
export function EmptyState({
  title,
  description,
  action = 'Открыть каталог',
  to = '/catalog',
}: {
  title: string
  description: string
  action?: string
  to?: string
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <PackageOpen size={36} strokeWidth={1.4} />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link className="btn btn-primary" to={to}>
        {action}
        <ArrowRight size={17} />
      </Link>
    </div>
  )
}
