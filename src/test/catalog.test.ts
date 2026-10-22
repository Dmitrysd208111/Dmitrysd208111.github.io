import { describe, expect, it } from 'vitest'
import { filterProducts, readFilters } from '../utils/catalog'
import { products } from './fixtures'
describe('Каталог и фильтры URL', () => {
  it('комбинирует поиск, категорию, бренд и диапазон', () => {
    const filters = readFilters(
      new URLSearchParams('q=PHONE&category=smartphones&brand=Apple&min=15000&max=25000'),
    )
    expect(filterProducts(products, filters).map((p) => p.id)).toEqual(['1'])
  })
  it('поддерживает несколько категорий и брендов', () => {
    const filters = readFilters(
      new URLSearchParams('category=smartphones&category=laptops&brand=Apple&brand=Dell'),
    )
    expect(filterProducts(products, filters)).toHaveLength(2)
  })
  it('фильтрует наличие и возвращает пустое состояние', () => {
    expect(filterProducts(products, readFilters(new URLSearchParams('stock=1')))).toHaveLength(2)
    expect(filterProducts(products, readFilters(new URLSearchParams('min=70000')))).toEqual([])
  })
  it('сортирует по цене, названию, популярности и новизне', () => {
    const ids = (sort: string) =>
      filterProducts(products, readFilters(new URLSearchParams({ sort }))).map((p) => p.id)
    expect(ids('price-asc')).toEqual(['3', '1', '2'])
    expect(ids('price-desc')).toEqual(['2', '1', '3'])
    expect(ids('name')).toEqual(['3', '2', '1'])
    expect(ids('popular')).toEqual(['2', '1', '3'])
    expect(ids('new')[0]).toBe('2')
  })
  it('безопасно обрабатывает некорректные значения в URL', () => {
    const filters = readFilters(new URLSearchParams('min=oops&max=-2&sort=unknown'))
    expect(filters.min).toBe(0)
    expect(filters.max).toBe(0)
    expect(filters.sort).toBe('popular')
  })
  it('включает граничные цены и не изменяет исходный массив', () => {
    const original = products.map((p) => p.id)
    expect(
      filterProducts(products, readFilters(new URLSearchParams('min=20000&max=20000'))),
    ).toHaveLength(1)
    expect(products.map((p) => p.id)).toEqual(original)
  })
})
