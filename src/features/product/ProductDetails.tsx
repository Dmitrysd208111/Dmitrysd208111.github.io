import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Product } from '../../types/product'
export default function ProductDetails({ product }: { product: Product }) {
  const [tab, setTab] = useState('description')
  return (
    <section className="product-details-section">
      <div className="tabs">
        <button
          className={tab === 'description' ? 'active' : ''}
          aria-pressed={tab === 'description'}
          onClick={() => setTab('description')}
        >
          О товаре
        </button>
        <button
          className={tab === 'specs' ? 'active' : ''}
          aria-pressed={tab === 'specs'}
          onClick={() => setTab('specs')}
        >
          Характеристики
        </button>
        <button
          className={tab === 'delivery' ? 'active' : ''}
          aria-pressed={tab === 'delivery'}
          onClick={() => setTab('delivery')}
        >
          Доставка и гарантия
        </button>
      </div>
      {tab === 'description' ? (
        <div className="description-copy">
          <h2>Продумано для вашей жизни.</h2>
          <p>{product.description}</p>
          <p>
            Фотографии соответствуют модели из открытого демонстрационного набора DummyJSON. Точные
            характеристики реального устройства уточняйте у производителя.
          </p>
        </div>
      ) : tab === 'specs' ? (
        <dl className="spec-table">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="description-copy">
          <h2>Всё важное — заранее.</h2>
          <p>
            В демо-магазине доступны курьерская доставка за 490 ₽ и бесплатный самовывоз. От 30 000
            ₽ курьерская доставка бесплатна. Данные заказа остаются только в текущей сессии
            браузера.
          </p>
          <Link className="text-link" to="/info/warranty">
            Подробнее о гарантии <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  )
}
