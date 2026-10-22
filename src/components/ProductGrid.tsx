import type { Product } from '../types/product'
import ProductCard from './ProductCard'
import Reveal from './Reveal'
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <Reveal
          key={product.id}
          className="product-card-reveal"
          delay={(index % 4) * 0.065}
          distance={20}
          layout="position"
        >
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  )
}
