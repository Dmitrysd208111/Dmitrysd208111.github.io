export const money = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
export const cartKey = (productId: string, variantId: string) => `${productId}:${variantId}`
export function plural(
  value: number,
  words: [string, string, string] = ['товар', 'товара', 'товаров'],
) {
  const n = Math.abs(value) % 100
  return `${value} ${words[n > 10 && n < 20 ? 2 : n % 10 === 1 ? 0 : n % 10 > 1 && n % 10 < 5 ? 1 : 2]}`
}
