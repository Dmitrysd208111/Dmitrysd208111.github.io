import type { CatalogFilters, Product, SortOrder } from '../types/product'
export const PRICE_MAX = 200000
export function readFilters(params: URLSearchParams): CatalogFilters {
  const value = (key: string, fallback: number) => {
    const raw = params.get(key)
    const n = raw === null ? fallback : Number(raw)
    return Number.isFinite(n) ? Math.max(0, Math.min(PRICE_MAX, n)) : fallback
  }
  const sort = params.get('sort') ?? 'popular'
  return {
    query: params.get('q') ?? '',
    categories: params.getAll('category'),
    brands: params.getAll('brand'),
    min: value('min', 0),
    max: value('max', PRICE_MAX),
    sort: (['popular', 'price-asc', 'price-desc', 'name', 'new'].includes(sort)
      ? sort
      : 'popular') as SortOrder,
    inStock: params.get('stock') === '1',
  }
}
export function filterProducts(products: Product[], filters: CatalogFilters) {
  const q = filters.query.toLocaleLowerCase('ru').trim()
  return products
    .filter(
      (p) =>
        (!q || `${p.name} ${p.brand} ${p.subtitle}`.toLocaleLowerCase('ru').includes(q)) &&
        (!filters.categories.length || filters.categories.includes(p.category)) &&
        (!filters.brands.length || filters.brands.includes(p.brand)) &&
        p.price >= filters.min &&
        p.price <= filters.max &&
        (!filters.inStock || p.variants.some((v) => v.stock > 0)),
    )
    .sort((a, b) =>
      filters.sort === 'price-asc'
        ? a.price - b.price
        : filters.sort === 'price-desc'
          ? b.price - a.price
          : filters.sort === 'name'
            ? a.name.localeCompare(b.name, 'ru')
            : filters.sort === 'new'
              ? Number(b.isNew) - Number(a.isNew) || b.popularity - a.popularity
              : b.popularity - a.popularity,
    )
}
