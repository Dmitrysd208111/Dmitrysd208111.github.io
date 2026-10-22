import type { CartItem, CartLine, Product } from '../types/product'
import { cartKey } from './format'
export const FREE_DELIVERY_FROM = 30000
export const DELIVERY_FEE = 490
export type DeliveryMethod = 'courier' | 'pickup'
export function getCartLines(items: CartItem[], products: Product[]): CartLine[] {
  return items.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId)
    const variant = product?.variants.find((v) => v.id === item.variantId)
    return product && variant
      ? [
          {
            product,
            variant,
            quantity: item.quantity,
            key: cartKey(item.productId, item.variantId),
          },
        ]
      : []
  })
}
export function getTotals(lines: CartLine[], delivery: DeliveryMethod = 'courier') {
  const subtotal = lines.reduce((sum, l) => sum + l.variant.price * l.quantity, 0)
  const shipping =
    subtotal === 0 || delivery === 'pickup' || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    count: lines.reduce((sum, l) => sum + l.quantity, 0),
    savings: lines.reduce(
      (sum, l) =>
        sum + Math.max(0, (l.product.oldPrice ?? l.product.price) - l.product.price) * l.quantity,
      0,
    ),
  }
}
export function validateStock(lines: CartLine[]) {
  return lines.every(
    (l) => Number.isInteger(l.quantity) && l.quantity > 0 && l.quantity <= l.variant.stock,
  )
}
