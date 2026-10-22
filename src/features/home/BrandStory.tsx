import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
export default function BrandStory() {
  return (
    <section className="container section">
      <div className="about-strip">
        <span className="about-number">V.</span>
        <div>
          <span className="eyebrow">ТЕХНОЛОГИИ С ХАРАКТЕРОМ</span>
          <h2>
            Хорошая техника.
            <br />
            Правильное место.
          </h2>
        </div>
        <div>
          <p>
            Мы собрали технику, которой хочется пользоваться. Для работы, открытий и маленьких
            радостей каждый день.
          </p>
          <Link className="text-link" to="/info/about">
            Знакомьтесь, VELTRIX <ArrowUpRight size={17} />
          </Link>
          <span className="verified-note">
            <Check size={14} /> Продумано до последней детали
          </span>
        </div>
      </div>
    </section>
  )
}
