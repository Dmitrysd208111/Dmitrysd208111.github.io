import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fetchProducts } from '../services/products'
describe('Локальный каталог и изображения', () => {
  it('проходит runtime-валидацию и содержит не менее 30 уникальных товаров', async () => {
    const data = await fetchProducts()
    expect(data.length).toBeGreaterThanOrEqual(30)
    expect(new Set(data.map((p) => p.id)).size).toBe(data.length)
    expect(new Set(data.map((p) => p.slug)).size).toBe(data.length)
  })
  it('содержит все локальные WebP без внешних изображений', async () => {
    const data = await fetchProducts()
    for (const product of data) {
      for (const src of product.images) {
        expect(src).toMatch(/^\/images\/products\/[\w-]+\.webp$/)
        expect(existsSync(resolve(process.cwd(), 'public', src.slice(1))), src).toBe(true)
      }
      expect(product.variants[0].price).toBe(product.price)
    }
  })
})
