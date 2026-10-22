import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { categories } from '../../data/categories'
import ProductImage from '../../components/ProductImage'
import Reveal from '../../components/Reveal'
export default function CategorySection() {
  return (
    <section className="container section category-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">ТЕХНИКА ДЛЯ ВАШЕЙ ЖИЗНИ</span>
          <h2>Найдите свою категорию</h2>
        </div>
        <Link className="text-link" to="/catalog">
          Весь каталог <ArrowRight size={17} />
        </Link>
      </div>
      <div className="category-grid">
        {categories.map((c, index) => (
          <Reveal key={c.id} delay={index * 0.055} distance={16}>
            <Link className="category-card" to={`/catalog?category=${c.id}`}>
              <div className="category-image">
                <ProductImage src={`/images/products/${c.imageId}-1.webp`} alt="" />
              </div>
              <div>
                <h3>{c.name}</h3>
                <ArrowUpRight size={15} />
              </div>
              <span>{c.caption}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
