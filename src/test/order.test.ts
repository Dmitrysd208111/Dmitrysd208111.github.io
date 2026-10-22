import { describe, expect, it } from 'vitest'
import { getCartLines, getTotals, validateStock } from '../utils/order'
import { checkoutSchema } from '../features/checkout/schema'
import { products } from './fixtures'
describe('Стоимость заказа', () => {
  it('считает стоимость, доставку и скидку с количеством', () => {
    const lines = getCartLines([{ productId: '1', variantId: 'standard', quantity: 1 }], products)
    expect(getTotals(lines)).toEqual({
      subtotal: 20000,
      shipping: 490,
      total: 20490,
      count: 1,
      savings: 2000,
    })
    expect(getTotals(lines, 'pickup').total).toBe(20000)
    expect(getTotals([{ ...lines[0], quantity: 2 }]).shipping).toBe(0)
  })
  it('использует цену выбранного комплекта', () => {
    const lines = getCartLines([{ productId: '1', variantId: 'gift', quantity: 1 }], products)
    expect(getTotals(lines).total).toBe(21480)
  })
  it('точно учитывает порог бесплатной доставки', () => {
    const lines = getCartLines([{ productId: '1', variantId: 'standard', quantity: 1 }], products)
    expect(
      getTotals([{ ...lines[0], variant: { ...lines[0].variant, price: 30000 } }]).shipping,
    ).toBe(0)
    expect(
      getTotals([{ ...lines[0], variant: { ...lines[0].variant, price: 29999 } }]).shipping,
    ).toBe(490)
  })
  it('пустая корзина не начисляет доставку и пропускает удалённые SKU', () => {
    expect(getTotals([]).total).toBe(0)
    expect(
      getCartLines([{ productId: 'unknown', variantId: 'standard', quantity: 1 }], products),
    ).toEqual([])
  })
  it('перед заказом проверяет запас каждого варианта', () => {
    const lines = getCartLines([{ productId: '1', variantId: 'gift', quantity: 3 }], products)
    expect(validateStock(lines)).toBe(false)
    expect(validateStock([{ ...lines[0], quantity: 2 }])).toBe(true)
  })
})
describe('Валидация заказа', () => {
  const valid = {
    name: 'Александр',
    email: 'demo@example.com',
    phone: '+7 (999) 123-45-67',
    delivery: 'courier',
    city: 'Москва',
    address: 'Примерная, 10',
    comment: '',
    consent: true,
  }
  it('принимает корректные контакты и адрес', () => {
    expect(checkoutSchema.safeParse(valid).success).toBe(true)
  })
  it('проверяет контакты, согласие и адрес курьера', () => {
    const result = checkoutSchema.safeParse({
      ...valid,
      name: '',
      email: 'oops',
      phone: '123',
      city: '',
      address: '',
      consent: false,
    })
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error.issues).toHaveLength(6)
  })
  it('самовывоз не требует адреса', () => {
    expect(
      checkoutSchema.safeParse({ ...valid, delivery: 'pickup', city: '', address: '' }).success,
    ).toBe(true)
  })
})
