import { expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import CartPage from '../pages/CartPage'
import { useShop } from '../store/shop'
import { products } from './fixtures'

it('позволяет исправить сохранённое количество, если остаток уменьшился', async () => {
  useShop.setState({
    items: [{ productId: '1', variantId: 'standard', quantity: 9 }],
    favorites: [],
  })
  const client = new QueryClient()
  client.setQueryData(['products'], products)
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )
  expect(screen.getByText(/Доступно 3 шт./)).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: 'Уменьшить количество: Test Phone' }))
  expect(useShop.getState().items[0].quantity).toBe(3)
  expect(screen.queryByText(/уменьшите количество/)).not.toBeInTheDocument()
})
