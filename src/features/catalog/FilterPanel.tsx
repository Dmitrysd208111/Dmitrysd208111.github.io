import { categories } from '../../data/categories'
import type { CatalogFilters, Product } from '../../types/product'
import { PRICE_MAX } from '../../utils/catalog'
interface Props {
  filters: CatalogFilters
  products: Product[]
  setParam: (key: string, value: string | string[]) => void
  clear: () => void
}
export default function FilterPanel({ filters: f, products, setParam, clear }: Props) {
  const toggle = (key: 'category' | 'brand', current: string[], value: string) =>
    setParam(
      key,
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    )
  return (
    <div className="filter-panel">
      <div className="filter-heading">
        <h2>Фильтры</h2>
        <button onClick={clear}>Сбросить</button>
      </div>
      <fieldset>
        <legend>Категория</legend>
        {categories.map((c) => (
          <label className="check-label" key={c.id}>
            <input
              type="checkbox"
              checked={f.categories.includes(c.id)}
              onChange={() => toggle('category', f.categories, c.id)}
            />
            <span>{c.name}</span>
            <small>{products.filter((p) => p.category === c.id).length}</small>
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Цена, ₽</legend>
        <div className="price-inputs">
          <label>
            <span>от</span>
            <input
              aria-label="Цена от"
              type="number"
              min="0"
              max={PRICE_MAX}
              value={f.min}
              onChange={(e) => setParam('min', e.target.value)}
            />
          </label>
          <span>—</span>
          <label>
            <span>до</span>
            <input
              aria-label="Цена до"
              type="number"
              min="0"
              max={PRICE_MAX}
              value={f.max}
              onChange={(e) => setParam('max', e.target.value)}
            />
          </label>
        </div>
        <input
          className="price-range"
          aria-label="Максимальная цена"
          type="range"
          min="0"
          max={PRICE_MAX}
          step="1000"
          value={f.max}
          onChange={(e) => setParam('max', e.target.value)}
        />
        {f.min > f.max && <p className="field-error">Минимальная цена больше максимальной</p>}
      </fieldset>
      <fieldset>
        <legend>Бренд</legend>
        {[...new Set(products.map((p) => p.brand))].sort().map((b) => (
          <label className="check-label" key={b}>
            <input
              type="checkbox"
              checked={f.brands.includes(b)}
              onChange={() => toggle('brand', f.brands, b)}
            />
            <span>{b}</span>
          </label>
        ))}
      </fieldset>
      <label className="check-label stock-check">
        <input
          type="checkbox"
          checked={f.inStock}
          onChange={() => setParam('stock', f.inStock ? '' : '1')}
        />
        <span>Только в наличии</span>
      </label>
      <div className="filter-service">
        <span>
          Хороший выбор начинается
          <br />с правильных деталей.
        </span>
        <strong>VELTRIX SELECTED ↗</strong>
      </div>
    </div>
  )
}
