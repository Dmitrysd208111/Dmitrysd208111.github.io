import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, X, SlidersHorizontal, ArrowRight } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import { useDebounce } from '../hooks/useDebounce'
import { filterProducts, readFilters } from '../utils/catalog'
import { plural } from '../utils/format'
import { categories } from '../data/categories'
import FilterPanel from '../features/catalog/FilterPanel'
import ProductGrid from '../components/ProductGrid'
import { ErrorState, LoadingState } from '../components/States'
export default function CatalogPage() {
  usePageTitle('Каталог')
  const { data: products, isPending, isError, refetch } = useProducts()
  const [params, setParams] = useSearchParams()
  const filters = readFilters(params)
  const [query, setQuery] = useState(filters.query)
  const debounced = useDebounce(query)
  const [mobileFilters, setMobileFilters] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const lastUrlQuery = useRef(filters.query)
  const editing = useRef(false)
  // URL is the source of truth, including browser Back/Forward.
  useEffect(() => {
    if (filters.query !== lastUrlQuery.current) {
      editing.current = false
      lastUrlQuery.current = filters.query
      setQuery(filters.query)
    }
  }, [filters.query])
  useEffect(() => {
    if (!editing.current || debounced === lastUrlQuery.current || query !== debounced) return
    editing.current = false
    lastUrlQuery.current = debounced.trim()
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (debounced.trim()) next.set('q', debounced.trim())
        else next.delete('q')
        return next
      },
      { replace: true },
    )
  }, [debounced, query, setParams])
  useEffect(() => {
    const dialog = dialogRef.current
    if (mobileFilters && !dialog?.open) dialog?.showModal()
    if (!mobileFilters && dialog?.open) dialog.close()
  }, [mobileFilters])
  const setParam = (key: string, value: string | string[]) => {
    const next = new URLSearchParams(params)
    next.delete(key)
    if (Array.isArray(value)) value.forEach((v) => next.append(key, v))
    else if (value) next.set(key, value)
    setParams(next, { replace: true })
  }
  const clear = () => {
    editing.current = false
    lastUrlQuery.current = ''
    setQuery('')
    setParams({}, { replace: true })
  }
  if (isPending) return <LoadingState />
  if (isError) return <ErrorState retry={() => void refetch()} />
  const results = filterProducts(products, filters)
  const activeCount =
    filters.categories.length +
    filters.brands.length +
    Number(filters.min > 0) +
    Number(filters.max < 200000) +
    Number(filters.inStock)
  const panel = (
    <FilterPanel filters={filters} products={products} setParam={setParam} clear={clear} />
  )
  return (
    <div className="container page-space">
      <div className="breadcrumbs">
        <Link to="/">Главная</Link>
        <span>/</span>
        <span>Каталог</span>
      </div>
      <div className="page-title-row">
        <div>
          <span className="eyebrow">НАЙДИТЕ СВОЙ СЛЕДУЮЩИЙ УРОВЕНЬ</span>
          <h1>
            Каталог<span className="heading-dot">.</span>
          </h1>
        </div>
        <span className="catalog-total">{plural(products.length)} для ваших идей</span>
      </div>
      <div className="catalog-category-pills">
        <button
          className={!filters.categories.length ? 'active' : ''}
          onClick={() => setParam('category', [])}
        >
          Вся техника
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            className={filters.categories.includes(c.id) ? 'active' : ''}
            onClick={() =>
              setParam(
                'category',
                filters.categories.includes(c.id)
                  ? filters.categories.filter((id) => id !== c.id)
                  : [...filters.categories, c.id],
              )
            }
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="catalog-layout">
        <aside className="desktop-filters">{panel}</aside>
        <div>
          <div className="catalog-toolbar">
            <label className="catalog-search">
              <Search size={18} />
              <input
                placeholder="Что вы ищете?"
                aria-label="Поиск по каталогу"
                value={query}
                onChange={(e) => {
                  editing.current = true
                  setQuery(e.target.value)
                }}
              />
              {query && (
                <button
                  aria-label="Очистить поиск"
                  onClick={() => {
                    editing.current = true
                    setQuery('')
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </label>
            <button
              className="btn btn-outline mobile-filter-button"
              onClick={() => setMobileFilters(true)}
            >
              <SlidersHorizontal size={17} /> Фильтры{activeCount ? ` · ${activeCount}` : ''}
            </button>
            <label className="sort-label">
              <span className="sr-only">Сортировка</span>
              <select
                aria-label="Сортировка"
                value={filters.sort}
                onChange={(e) => setParam('sort', e.target.value)}
              >
                <option value="popular">По популярности</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
                <option value="name">По названию А–Я</option>
                <option value="new">Сначала новинки</option>
              </select>
            </label>
          </div>
          <div className="results-count" role="status">
            Найдено: {plural(results.length)}
            {(activeCount > 0 || filters.query) && (
              <button onClick={clear}>
                Сбросить всё <X size={13} />
              </button>
            )}
          </div>
          {results.length ? (
            <ProductGrid products={results} />
          ) : (
            <div className="empty-state">
              <Search size={38} strokeWidth={1.3} />
              <h2>Пока ничего не нашлось</h2>
              <p>Попробуйте другой запрос или измените фильтры.</p>
              <button className="btn btn-primary" onClick={clear}>
                Сбросить фильтры <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="filter-dialog"
        onCancel={() => setMobileFilters(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileFilters(false)
        }}
      >
        <div className="dialog-top">
          <strong>Подберите своё</strong>
          <button
            className="icon-btn"
            aria-label="Закрыть фильтры"
            onClick={() => setMobileFilters(false)}
          >
            <X />
          </button>
        </div>
        {panel}
        <button className="btn btn-primary filter-apply" onClick={() => setMobileFilters(false)}>
          Показать {plural(results.length)}
        </button>
      </dialog>
    </div>
  )
}
