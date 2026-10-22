import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import { categories } from '../data/categories'
import { LoadingState, ErrorState } from '../components/States'
import ProductGrid from '../components/ProductGrid'
import NotFoundPage from './NotFoundPage'
import ProductGallery from '../features/product/ProductGallery'
import ProductInfo from '../features/product/ProductInfo'
import ProductDetails from '../features/product/ProductDetails'
export default function ProductPage() {
  const { slug } = useParams()
  const { data: products, isPending, isError, refetch } = useProducts()
  const product = products?.find((p) => p.slug === slug)
  usePageTitle(product?.name ?? 'Товар')
  if (isPending) return <LoadingState />
  if (isError) return <ErrorState retry={() => void refetch()} />
  if (!product) return <NotFoundPage />
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)
  const category = categories.find((c) => c.id === product.category)
  return (
    <div className="container page-space">
      <div className="breadcrumbs">
        <Link to="/">Главная</Link>
        <span>/</span>
        <Link to="/catalog">Каталог</Link>
        <span>/</span>
        <Link to={`/catalog?category=${product.category}`}>{category?.name}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <div className="product-detail">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
      <ProductDetails product={product} />
      {related.length > 0 && (
        <section className="section">
          <div className="section-heading">
            <h2>Вам также понравится</h2>
            <Link className="text-link" to={`/catalog?category=${product.category}`}>
              Больше вариантов <ArrowRight size={17} />
            </Link>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}
