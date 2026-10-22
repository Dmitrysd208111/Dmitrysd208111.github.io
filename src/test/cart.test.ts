import { beforeEach, describe, expect, it } from 'vitest'
import { useShop } from '../store/shop'
import { product } from './fixtures'
describe('Корзина и остатки', () => {
  beforeEach(() => {
    useShop.setState({ items: [], favorites: [] })
    localStorage.clear()
  })
  it('объединяет одинаковый товар и сохраняет количество', () => {
    expect(useShop.getState().add(product)).toBe('added')
    useShop.getState().add(product)
    expect(useShop.getState().items).toEqual([
      { productId: '1', variantId: 'standard', quantity: 2 },
    ])
    const saved = JSON.parse(localStorage.getItem('veltrix-shop-v1') ?? '{}')
    expect(saved.state.items[0].quantity).toBe(2)
  })
  it('проверяет остаток при добавлении и изменении', () => {
    useShop.getState().add(product, 'standard', 3)
    expect(useShop.getState().add(product)).toBe('limit')
    expect(useShop.getState().setQuantity(product, 'standard', 4)).toBe(false)
    expect(useShop.getState().items[0].quantity).toBe(3)
  })
  it('не принимает отсутствующий вариант, нулевое и дробное количество', () => {
    expect(useShop.getState().add(product, 'missing')).toBe('unavailable')
    expect(useShop.getState().add(product, 'standard', 0)).toBe('unavailable')
    expect(useShop.getState().add(product, 'standard', 1.5)).toBe('unavailable')
    expect(useShop.getState().items).toHaveLength(0)
  })
  it('хранит комплекты независимо и проверяет каждый остаток', () => {
    useShop.getState().add(product)
    useShop.getState().add(product, 'gift', 2)
    expect(useShop.getState().items).toHaveLength(2)
    expect(useShop.getState().add(product, 'gift')).toBe('limit')
    useShop.getState().remove('1', 'standard')
    expect(useShop.getState().items[0].variantId).toBe('gift')
  })
  it('удаляет, изменяет количество и очищает корзину', () => {
    useShop.getState().add(product, 'standard', 2)
    expect(useShop.getState().setQuantity(product, 'standard', 1)).toBe(true)
    expect(useShop.getState().setQuantity(product, 'standard', -1)).toBe(false)
    useShop.getState().clear()
    expect(useShop.getState().items).toEqual([])
  })
  it('переключает избранное и восстанавливает данные из localStorage', async () => {
    useShop.getState().toggleFavorite('1')
    useShop.getState().add(product)
    await useShop.persist.rehydrate()
    expect(useShop.getState().favorites).toEqual(['1'])
    expect(useShop.getState().items[0].quantity).toBe(1)
    useShop.getState().toggleFavorite('1')
    expect(useShop.getState().favorites).toEqual([])
  })
  it('не добавляет товар без остатка', () => {
    expect(
      useShop.getState().add({ ...product, variants: [{ ...product.variants[0], stock: 0 }] }),
    ).toBe('unavailable')
  })
})
