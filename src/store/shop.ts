import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from '../types/product'
type CartResult = 'added' | 'limit' | 'unavailable'
interface ShopState {
  items: CartItem[]
  favorites: string[]
  add: (product: Product, variantId?: string, quantity?: number) => CartResult
  setQuantity: (product: Product, variantId: string, quantity: number) => boolean
  remove: (productId: string, variantId: string) => void
  clear: () => void
  toggleFavorite: (id: string) => void
}
export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      items: [],
      favorites: [],
      add: (product, variantId = 'standard', quantity = 1) => {
        const variant = product.variants.find((v) => v.id === variantId)
        if (!variant || variant.stock < 1 || !Number.isInteger(quantity) || quantity < 1)
          return 'unavailable'
        const existing = get().items.find(
          (i) => i.productId === product.id && i.variantId === variantId,
        )
        if ((existing?.quantity ?? 0) + quantity > variant.stock) return 'limit'
        set((s) => ({
          items: existing
            ? s.items.map((i) => (i === existing ? { ...i, quantity: i.quantity + quantity } : i))
            : [...s.items, { productId: product.id, variantId, quantity }],
        }))
        return 'added'
      },
      setQuantity: (product, variantId, quantity) => {
        const variant = product.variants.find((v) => v.id === variantId)
        if (!variant || !Number.isInteger(quantity) || quantity < 1 || quantity > variant.stock)
          return false
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === product.id && i.variantId === variantId ? { ...i, quantity } : i,
          ),
        }))
        return true
      },
      remove: (productId, variantId) =>
        set((s) => ({
          items: s.items.filter((i) => !(i.productId === productId && i.variantId === variantId)),
        })),
      clear: () => set({ items: [] }),
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((v) => v !== id)
            : [...s.favorites, id],
        })),
    }),
    {
      name: 'veltrix-shop-v1',
      version: 1,
      partialize: (s) => ({ items: s.items, favorites: s.favorites }),
      merge: (persisted, current) => {
        const stored = persisted as Partial<ShopState> | undefined
        return {
          ...current,
          items: Array.isArray(stored?.items)
            ? stored.items.filter(
                (i) =>
                  i &&
                  typeof i.productId === 'string' &&
                  typeof i.variantId === 'string' &&
                  Number.isInteger(i.quantity) &&
                  i.quantity > 0,
              )
            : [],
          favorites: Array.isArray(stored?.favorites)
            ? stored.favorites.filter((id): id is string => typeof id === 'string')
            : [],
        }
      },
    },
  ),
)
