import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import ProductGrid from '../components/ProductGrid'
import { ErrorState, LoadingState } from '../components/States'
import HeroSection from '../features/home/HeroSection'
import CategorySection from '../features/home/CategorySection'
import PopularProducts from '../features/home/PopularProducts'
import AudioCollection from '../features/home/AudioCollection'
import BrandStory from '../features/home/BrandStory'
import Reveal from '../components/Reveal'
export default function HomePage() {
  usePageTitle('Технологии на вашей волне')
  const { data: products, isPending, isError, refetch } = useProducts()
  if (isPending) return <LoadingState />
  if (isError) return <ErrorState retry={() => void refetch()} />
  return (
    <>
      <HeroSection />
      <Reveal>
        <CategorySection />
      </Reveal>
      <Reveal>
        <PopularProducts products={products} />
      </Reveal>
      <Reveal>
        <AudioCollection />
      </Reveal>
      <Reveal>
        <section className="container section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">НОВОЕ В НАШЕЙ КОЛЛЕКЦИИ</span>
              <h2>Повод обновиться</h2>
            </div>
            <Link className="text-link" to="/catalog?sort=new">
              Все поступления <ArrowRight size={17} />
            </Link>
          </div>
          <ProductGrid products={products.filter((p) => p.isNew).slice(0, 4)} />
        </section>
      </Reveal>
      <Reveal>
        <BrandStory />
      </Reveal>
    </>
  )
}
