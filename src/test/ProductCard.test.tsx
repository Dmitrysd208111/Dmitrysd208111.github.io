import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useShop } from '../store/shop'
import { product } from './fixtures'
describe('Карточка товара', () => {
  beforeEach(() => useShop.setState({ items: [], favorites: [] }))
  it('добавляет товар и переключает избранное с клавиатуры', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    )
    const add = screen.getByRole('button', { name: 'Добавить в корзину: Test Phone' })
    add.focus()
    await user.keyboard('{Enter}')
    expect(useShop.getState().items[0].quantity).toBe(1)
    const favorite = screen.getByRole('button', { name: 'Добавить в избранное: Test Phone' })
    await user.click(favorite)
    expect(favorite).toHaveAttribute('aria-pressed', 'true')
    expect(useShop.getState().favorites).toEqual(['1'])
  })
  it('блокирует добавление отсутствующего товара', () => {
    render(
      <MemoryRouter>
        <ProductCard product={{ ...product, variants: [{ ...product.variants[0], stock: 0 }] }} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('button', { name: 'Добавить в корзину: Test Phone' })).toBeDisabled()
    expect(screen.getByText('Нет в наличии')).toBeInTheDocument()
  })
})
