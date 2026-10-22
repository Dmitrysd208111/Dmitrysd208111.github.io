import { useState } from 'react'
import { Star } from 'lucide-react'
import { money } from '../../utils/format'
import { categories } from '../../data/categories'
import ProductPurchase from './ProductPurchase'
import ProductServices from './ProductServices'
import type { Product } from '../../types/product'
export default function ProductInfo({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState('standard')
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]
  const category = categories.find((c) => c.id === product.category)
  return (
    <div className="product-info">
      <span className="eyebrow">
        {product.brand} / {category?.name}
      </span>
      <h1>{product.name}</h1>
      <p className="detail-subtitle">{product.subtitle}</p>
      <div className="detail-rating">
        <Star size={16} fill="currentColor" />
        {product.rating.toFixed(1)}
        <span>Демонстрационный рейтинг · {product.reviews} оценок</span>
      </div>
      <div className="detail-price">
        <strong>{money(variant.price)}</strong>
        {product.oldPrice && <s>{money(product.oldPrice + (variant.price - product.price))}</s>}
      </div>
      <div className="detail-stock">
        <span className={`status-dot ${!variant.stock ? 'unavailable' : ''}`} />
        {variant.stock ? `В наличии · осталось ${variant.stock} шт.` : 'Временно нет в наличии'}
      </div>

      <ProductPurchase
        key={variant.id}
        product={product}
        variant={variant}
        onVariantChange={setVariantId}
      />
      <ProductServices variant={variant} />
      <p className="demo-hint">
        Демонстрационный каталог. Цены, наличие и комплектации — пример, продажа не осуществляется.
      </p>
    </div>
  )
}
