import { useState } from 'react'
import { Heart, Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useShop } from '../../store/shop'
import { toast } from '../../store/toasts'
import type { Product, ProductVariant } from '../../types/product'
export default function ProductPurchase({
  product,
  variant,
  onVariantChange,
}: {
  product: Product
  variant: ProductVariant
  onVariantChange: (id: string) => void
}) {
  const variantId = variant.id
  const [quantity, setQuantity] = useState(1)
  const add = useShop((s) => s.add)
  const toggle = useShop((s) => s.toggleFavorite)
  const favorite = useShop((s) => s.favorites.includes(product.id))
  return (
    <>
      <fieldset className="variant-field">
        <legend>
          Комплект: <strong>{variant.label}</strong>
        </legend>
        <div className="variant-options">
          {product.variants.map((v) => (
            <button
              key={v.id}
              aria-pressed={variantId === v.id}
              className={variantId === v.id ? 'active' : ''}
              onClick={() => {
                onVariantChange(v.id)
              }}
            >
              {v.label}
              {variantId === v.id && <Check size={15} />}
            </button>
          ))}
        </div>
        <p>
          {variantId === 'gift'
            ? 'Фирменная подарочная упаковка и открытка · +990 ₽'
            : 'Оригинальная упаковка и базовая комплектация устройства'}
        </p>
      </fieldset>
      <div className="detail-add">
        <div className="quantity-control">
          <button
            aria-label="Уменьшить количество"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => q - 1)}
          >
            <Minus size={16} />
          </button>
          <span aria-live="polite">{quantity}</span>
          <button
            aria-label="Увеличить количество"
            disabled={quantity >= variant.stock}
            onClick={() => setQuantity((q) => q + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          disabled={!variant.stock}
          className="btn btn-primary"
          onClick={() => {
            const result = add(product, variantId, quantity)
            toast(
              result === 'added'
                ? 'Отличный выбор! Товар в корзине'
                : result === 'limit'
                  ? 'В корзине уже доступный остаток этого комплекта'
                  : 'Товара нет в наличии',
              result === 'added' ? 'success' : 'error',
            )
          }}
        >
          <ShoppingBag size={19} />В корзину
        </button>
        <button
          className={`icon-btn detail-heart ${favorite ? 'is-favorite' : ''}`}
          aria-pressed={favorite}
          aria-label={favorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          onClick={() => {
            toggle(product.id)
            toast(favorite ? 'Удалено из избранного' : 'Сохранено в избранном')
          }}
        >
          <Heart size={22} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
    </>
  )
}
