import { useState } from 'react'
import ProductImage from '../../components/ProductImage'
import type { Product } from '../../types/product'
export default function ProductGallery({ product }: { product: Product }) {
  const [image, setImage] = useState(0)
  return (
    <div className="product-gallery">
      <div className="gallery-main">
        <span className="badge badge-blue">{product.tag ?? product.brand}</span>
        <ProductImage
          key={product.images[image] ?? product.images[0]}
          eager
          src={product.images[image] ?? product.images[0]}
          alt={`${product.name} — вид ${image + 1}`}
        />
      </div>
      <div className="gallery-thumbs">
        {product.images.map((src, i) => (
          <button
            className={image === i ? 'active' : ''}
            key={src}
            aria-label={`Фото ${i + 1} из ${product.images.length}`}
            aria-pressed={image === i}
            onClick={() => setImage(i)}
          >
            <ProductImage src={src} alt="" />
          </button>
        ))}
      </div>
    </div>
  )
}
