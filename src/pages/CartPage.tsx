import { Link } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, Trash2, Heart } from 'lucide-react'
import { useShop } from '../store/shop'
import { useProducts } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import { getCartLines } from '../utils/order'
import { money, plural } from '../utils/format'
import { toast } from '../store/toasts'
import { ErrorState, EmptyState, LoadingState } from '../components/States'
import ProductImage from '../components/ProductImage'
import OrderSummary from '../components/OrderSummary'
export default function CartPage() {
  usePageTitle('Корзина')
  const shop = useShop()
  const { data: products, isPending, isError, refetch } = useProducts()
  if (isPending) return <LoadingState />
  if (isError) return <ErrorState retry={() => void refetch()} />
  const lines = getCartLines(shop.items, products)
  return (
    <div className="container page-space">
      <div className="breadcrumbs">
        <Link to="/">Главная</Link>
        <span>/</span>
        <span>Корзина</span>
      </div>
      <div className="page-title-row">
        <h1>
          Ваша корзина<span className="heading-dot">.</span>
        </h1>
        <span>{plural(lines.reduce((n, l) => n + l.quantity, 0))}</span>
      </div>
      {!lines.length ? (
        <EmptyState
          title="Здесь начинается отличный выбор"
          description="Добавьте то, что вам понравилось. Мы сохраним ваши находки в корзине."
        />
      ) : (
        <div className="cart-layout">
          <div>
            <div className="cart-list">
              {lines.map(({ product: p, variant, quantity, key }) => (
                <article key={key} className="cart-item">
                  <Link className="cart-item-image" to={`/product/${p.slug}`}>
                    <ProductImage src={p.images[0]} alt={p.name} />
                  </Link>
                  <div className="cart-item-info">
                    <span className="eyebrow">{p.brand}</span>
                    <Link to={`/product/${p.slug}`}>
                      <h2>{p.name}</h2>
                    </Link>
                    <p>{variant.label} комплект</p>
                    <span className={variant.stock >= quantity ? 'stock-label' : 'field-error'}>
                      {variant.stock >= quantity
                        ? 'В наличии'
                        : `Доступно ${variant.stock} шт. — уменьшите количество`}
                    </span>
                    <div className="cart-item-actions">
                      <button
                        onClick={() => {
                          shop.toggleFavorite(p.id)
                          toast(
                            shop.favorites.includes(p.id)
                              ? 'Удалено из избранного'
                              : 'Сохранено в избранном',
                          )
                        }}
                        aria-label={`В избранное: ${p.name}`}
                      >
                        <Heart
                          size={15}
                          fill={shop.favorites.includes(p.id) ? 'currentColor' : 'none'}
                        />
                        <span>Сохранить</span>
                      </button>
                      <button
                        onClick={() => {
                          shop.remove(p.id, variant.id)
                          toast('Товар удалён из корзины')
                        }}
                        aria-label={`Удалить из корзины: ${p.name}`}
                      >
                        <Trash2 size={15} />
                        <span>Удалить</span>
                      </button>
                    </div>
                  </div>
                  <div className="quantity-control">
                    <button
                      aria-label={`Уменьшить количество: ${p.name}`}
                      disabled={quantity <= 1}
                      onClick={() =>
                        shop.setQuantity(p, variant.id, Math.min(quantity - 1, variant.stock))
                      }
                    >
                      <Minus size={15} />
                    </button>
                    <span>{quantity}</span>
                    <button
                      aria-label={`Увеличить количество: ${p.name}`}
                      disabled={quantity >= variant.stock}
                      onClick={() => shop.setQuantity(p, variant.id, quantity + 1)}
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <div className="cart-item-price">
                    <strong>{money(variant.price * quantity)}</strong>
                    {quantity > 1 && <span>{money(variant.price)} / шт.</span>}
                  </div>
                </article>
              ))}
            </div>
            <Link className="text-link continue-shopping" to="/catalog">
              <ArrowLeft size={17} /> Продолжить выбирать
            </Link>
          </div>
          <OrderSummary lines={lines} />
        </div>
      )}
    </div>
  )
}
