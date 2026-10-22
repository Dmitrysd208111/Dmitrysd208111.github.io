export type CategoryId = 'smartphones' | 'laptops' | 'audio' | 'watches' | 'tablets' | 'accessories'
export interface ProductVariant {
  id: string
  label: string
  price: number
  stock: number
}
export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: CategoryId
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  popularity: number
  isNew: boolean
  tag?: string
  subtitle: string
  description: string
  images: string[]
  specs: Record<string, string>
  variants: ProductVariant[]
  source: string
}
export interface CartItem {
  productId: string
  variantId: string
  quantity: number
}
export interface CartLine {
  product: Product
  variant: ProductVariant
  quantity: number
  key: string
}
export type SortOrder = 'popular' | 'price-asc' | 'price-desc' | 'name' | 'new'
export interface CatalogFilters {
  query: string
  categories: string[]
  brands: string[]
  min: number
  max: number
  sort: SortOrder
  inStock: boolean
}
