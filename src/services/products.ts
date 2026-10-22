import type { Product } from '../types/product'
import { z } from 'zod'
const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  brand: z.string(),
  category: z.enum(['smartphones', 'laptops', 'audio', 'watches', 'tablets', 'accessories']),
  price: z.number().nonnegative(),
  oldPrice: z.number().optional(),
  rating: z.number(),
  reviews: z.number(),
  popularity: z.number(),
  isNew: z.boolean(),
  tag: z.string().optional(),
  subtitle: z.string(),
  description: z.string(),
  images: z.array(z.string()).min(1),
  specs: z.record(z.string(), z.string()),
  variants: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        price: z.number().nonnegative(),
        stock: z.number().int().nonnegative(),
      }),
    )
    .min(1),
  source: z.string(),
})
export async function fetchProducts(): Promise<Product[]> {
  const { default: data } = await import('../data/products.json')
  // Bundled snapshot: no runtime API, tokens or network integration.
  return z.array(productSchema).parse(data)
}
