import { Link } from 'react-router-dom'
import { useShop } from '../store/shop'
import { useProducts } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import { plural } from '../utils/format'
import ProductGrid from '../components/ProductGrid'
import { EmptyState, ErrorState, LoadingState } from '../components/States'
export default function FavoritesPage() {
  usePageTitle('Избранное')
  const favorites = useShop((s) => s.favorites)
  const { data: products, isPending, isError, refetch } = useProducts()
  if (isPending) return <LoadingState />
  if (isError) return <ErrorState retry={() => void refetch()} />
  const selected = products.filter((p) => favorites.includes(p.id))
  return (
    <div className="container page-space">
      <div className="breadcrumbs">
        <Link to="/">Главная</Link>
        <span>/</span>
        <span>Избранное</span>
      </div>
      <div className="page-title-row">
        <div>
          <span className="eyebrow">ВАШ ЛИЧНЫЙ ВЫБОР</span>
          <h1>
            Это по любви<span className="heading-dot">.</span>
          </h1>
        </div>
        <span>{plural(selected.length)}</span>
      </div>
      {selected.length ? (
        <ProductGrid products={selected} />
      ) : (
        <EmptyState
          title="Сохраните то, что вдохновляет"
          description="Нажмите на сердечко у товара — и он останется здесь, пока вы выбираете."
        />
      )}
    </div>
  )
}
