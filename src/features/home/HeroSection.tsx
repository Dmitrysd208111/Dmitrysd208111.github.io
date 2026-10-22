import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useMotionPreference } from '../../hooks/useMotionPreference'
import MotionControls from '../../components/MotionControls'
import { ArrowUpRight, Truck, ShieldCheck, RefreshCw, Headset } from 'lucide-react'
import ProductImage from '../../components/ProductImage'
export default function HeroSection() {
  const reducedMotion = useMotionPreference()
  const entrance = (delay: number) => ({
    duration: reducedMotion ? 0 : 1.1,
    delay: reducedMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as const,
  })
  return (
    <section className="container hero-section">
      <div className="hero-grid">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={entrance(0)}
          className="hero-main"
        >
          <motion.div
            className="hero-copy"
            initial={reducedMotion ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={entrance(0.18)}
          >
            <span className="eyebrow">
              <span className="blue-dot" /> ВАШ СЛЕДУЮЩИЙ УРОВЕНЬ
            </span>
            <h1>
              Технологии.
              <br />
              На вашей
              <br />
              <span>волне.</span>
            </h1>
            <p>
              Больше возможностей.
              <br />
              Больше вдохновения. Каждый день.
            </p>
            <Link className="btn btn-dark" to="/catalog">
              Найти своё <ArrowUpRight size={19} />
            </Link>
            <div className="hero-social">
              <div className="mini-stars">★★★★★</div>
              <span>Продуманный выбор. Без компромиссов.</span>
            </div>
          </motion.div>
          <motion.div
            className="hero-product"
            initial={reducedMotion ? false : { opacity: 0, x: 70, rotate: 7 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={entrance(0.35)}
          >
            <span className="hero-orbit" />
            <ProductImage
              eager
              src="/images/products/101-1.webp"
              alt="Серебристые наушники Apple AirPods Max"
            />
            <div className="floating-label">
              <span className="floating-dot" />
              <div>
                <strong>AirPods Max</strong>
                <span>Погрузитесь в свой мир</span>
              </div>
              <Link to="/product/apple-airpods-max-silver" aria-label="Открыть AirPods Max">
                <ArrowUpRight size={20} />
              </Link>
            </div>
          </motion.div>
          <div className="hero-pagination">
            <MotionControls />
          </div>
        </motion.div>
        <motion.div
          className="hero-side"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={entrance(0.18)}
        >
          <Link className="hero-phone" to="/catalog?category=smartphones">
            <span className="eyebrow light">БЛИЖЕ К ВАЖНОМУ</span>
            <h2>
              Всё в ваших
              <br />
              руках.
            </h2>
            <span className="hero-side-link">
              Выбрать смартфон <ArrowUpRight size={18} />
            </span>
            <ProductImage eager src="/images/products/123-1.webp" alt="iPhone 13 Pro" />
            <span className="phone-annotation">SMARTPHONES / 2026</span>
          </Link>
          <Link className="hero-small" to="/catalog?category=laptops">
            <div>
              <span className="eyebrow">ДЛЯ БОЛЬШИХ ИДЕЙ</span>
              <h3>
                Создавайте.
                <br />
                Без границ.
              </h3>
              <span>
                Ноутбуки <ArrowUpRight size={16} />
              </span>
            </div>
            <ProductImage eager src="/images/products/78-1.webp" alt="MacBook Pro" />
          </Link>
        </motion.div>
      </div>
      <div className="benefits-strip">
        {[
          { Icon: Truck, title: 'Бережная доставка', text: 'Бесплатно от 30 000 ₽' },
          { Icon: ShieldCheck, title: 'Только оригиналы', text: 'Гарантия до 12 месяцев' },
          { Icon: RefreshCw, title: 'Простой возврат', text: 'В течение 14 дней' },
          { Icon: Headset, title: 'Поможем с выбором', text: 'Всё о технике — понятно' },
        ].map(({ Icon, title, text }) => (
          <div key={title}>
            <Icon size={23} strokeWidth={1.5} />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
