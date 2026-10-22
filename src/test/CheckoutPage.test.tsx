import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import CheckoutPage from '../pages/CheckoutPage'
import { useShop } from '../store/shop'
import { product, products } from './fixtures'
function mount() {
  const client = new QueryClient()
  client.setQueryData(['products'], products)
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}
describe('Оформление демо-заказа', () => {
  beforeEach(() => {
    useShop.setState({ items: [], favorites: [] })
    useShop.getState().add(product)
  })
  it('показывает ошибки, принимает самовывоз и очищает корзину', async () => {
    mount()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Подтвердить демо-заказ' }))
    expect(await screen.findByText('Укажите имя, минимум 2 символа')).toBeInTheDocument()
    expect(screen.getByText('Укажите город')).toBeInTheDocument()
    await user.type(screen.getByLabelText(/^Имя/), 'Демо')
    await user.type(screen.getByLabelText(/^Телефон/), '+79991234567')
    await user.type(screen.getByLabelText(/^Email/), 'demo@example.com')
    await user.click(screen.getByRole('radio', { name: /Самовывоз/ }))
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Подтвердить демо-заказ' }))
    expect(await screen.findByRole('heading', { name: 'Демо, всё готово!' })).toBeInTheDocument()
    expect(useShop.getState().items).toEqual([])
    expect(screen.getByText(/оплата не списана/)).toBeInTheDocument()
    expect(screen.getByText('20 000 ₽', { exact: false })).toBeInTheDocument()
  })
  it('блокирует заказ, если сохранённое количество больше остатка', async () => {
    useShop.setState({ items: [{ productId: '1', variantId: 'standard', quantity: 9 }] })
    mount()
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(/^Имя/), 'Демо')
    await user.type(screen.getByLabelText(/^Телефон/), '+79991234567')
    await user.type(screen.getByLabelText(/^Email/), 'demo@example.com')
    await user.click(screen.getByRole('radio', { name: /Самовывоз/ }))
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Подтвердить демо-заказ' }))
    await waitFor(() =>
      expect(screen.queryByRole('heading', { name: 'Демо, всё готово!' })).not.toBeInTheDocument(),
    )
    expect(useShop.getState().items[0].quantity).toBe(9)
  })
})
