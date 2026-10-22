import { Link } from 'react-router-dom'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import ProductImage from '../../components/ProductImage'
export default function AudioCollection() {
  return (
    <section className="container section">
      <div className="editorial-banner">
        <div className="editorial-copy">
          <span className="eyebrow light">
            <Sparkles size={14} /> МЕНЬШЕ ШУМА. БОЛЬШЕ ВАС.
          </span>
          <h2>
            Услышьте
            <br />
            самое главное.
          </h2>
          <p>
            Наушники и колонки, с которыми
            <br />
            каждый момент звучит по-новому.
          </p>
          <Link className="btn btn-white" to="/catalog?category=audio">
            Открыть мир звука <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="editorial-image">
          <ProductImage src="/images/products/103-1.webp" alt="Apple HomePod mini" />
          <span>ЗВУК, КОТОРЫЙ ЧУВСТВУЕШЬ.</span>
        </div>
        <div className="editorial-caption">
          VELTRIX SELECTED <span>01 — AUDIO</span>
        </div>
      </div>
    </section>
  )
}
