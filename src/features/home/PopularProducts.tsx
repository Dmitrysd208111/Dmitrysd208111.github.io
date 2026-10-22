import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../../data/categories'
import ProductGrid from '../../components/ProductGrid'
import type { Product } from '../../types/product'
export default function PopularProducts({ products }: { products: Product[] }) {
  const [tab, setTab] = useState('all')
  const popular = [...products]
    .sort((a, b) => b.popularity - a.popularity)
    .filter((p) => tab === 'all' || p.category === tab)
    .slice(0, 4)
  return (
    <section className="container section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">ПРОВЕРЕНО ВАШИМ ВЫБОРОМ</span>
          <h2>
            В центре внимания<span className="heading-dot">.</span>
          </h2>
        </div>
        <Link className="text-link" to="/catalog?sort=popular">
          Все популярные <ArrowRight size={17} />
        </Link>
      </div>
      <div className="tabs" aria-label="Популярные товары по категории">
        {[{ id: 'all', name: 'Всё интересное' }, ...categories.slice(0, 4)].map((c) => (
          <button
            key={c.id}
            className={tab === c.id ? 'active' : ''}
            aria-pressed={tab === c.id}
            onClick={() => setTab(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <ProductGrid products={popular} />
    </section>
  )
}
