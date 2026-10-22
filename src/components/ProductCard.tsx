import { Link } from 'react-router-dom'
import { Heart, Plus, Star, Check } from 'lucide-react'
import type { Product } from '../types/product'
import { useShop } from '../store/shop'
import { toast } from '../store/toasts'
import { money } from '../utils/format'
import ProductImage from './ProductImage'
export default function ProductCard({ product: p }: { product: Product }) {
  const favorite = useShop((s) => s.favorites.includes(p.id))
  const inCart = useShop((s) =>
    s.items.some((i) => i.productId === p.id && i.variantId === 'standard'),
  )
  const add = useShop((s) => s.add)
  const toggle = useShop((s) => s.toggleFavorite)
  const stock = p.variants[0].stock
  return (
    <article className="product-card">
      <div className="product-visual">
        <Link to={`/product/${p.slug}`} aria-label={`Подробнее о ${p.name}`}>
          <ProductImage src={p.images[0]} alt={p.name} />
        </Link>
        <div className="product-badges">
          {p.tag ? (
            <span className="badge badge-blue">Выбор VELTRIX</span>
          ) : p.isNew ? (
            <span className="badge">Новинка</span>
          ) : p.oldPrice ? (
            <span className="badge badge-sale">
              −{Math.round((1 - p.price / p.oldPrice) * 100)}%
            </span>
          ) : null}
        </div>
        <button
          className={`icon-btn favorite-button ${favorite ? 'is-favorite' : ''}`}
          aria-label={`${favorite ? 'Убрать из' : 'Добавить в'} избранное: ${p.name}`}
          aria-pressed={favorite}
          onClick={() => {
            toggle(p.id)
            toast(favorite ? 'Удалено из избранного' : 'Добавлено в избранное')
          }}
        >
          <Heart size={19} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-body">
        <div className="product-meta">
          <span>{p.brand}</span>
          <span className="rating">
            <Star size={12} fill="currentColor" />
            {p.rating.toFixed(1)} <span>({p.reviews})</span>
          </span>
        </div>
        <Link className="product-name" to={`/product/${p.slug}`}>
          {p.name}
        </Link>
        <p className="product-subtitle">{p.subtitle}</p>
        <div className="product-bottom">
          <div>
            <span className="old-price">{p.oldPrice ? money(p.oldPrice) : ' '}</span>
            <strong>{money(p.price)}</strong>
          </div>
          <button
            className={`add-button ${inCart ? 'added' : ''}`}
            disabled={!stock}
            aria-label={`Добавить в корзину: ${p.name}`}
            onClick={() => {
              const result = add(p)
              toast(
                result === 'added'
                  ? `${p.name} в корзине`
                  : result === 'limit'
                    ? 'Достигнут доступный остаток'
                    : 'Товара нет в наличии',
                result === 'added' ? 'success' : 'error',
              )
            }}
          >
            {inCart ? <Check size={20} /> : <Plus size={21} />}
          </button>
        </div>
        <span className={`stock-label ${!stock ? 'out' : ''}`}>
          {stock ? 'В наличии' : 'Нет в наличии'}
        </span>
      </div>
    </article>
  )
}
