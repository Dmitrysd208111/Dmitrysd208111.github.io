import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../App'
import { useShop } from '../store/shop'
import { products } from './fixtures'
function mount(path = '/catalog') {
  window.history.replaceState({}, '', path)
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  client.setQueryData(['products'], products)
  return render(
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>,
  )
}
describe('Маршруты и пользовательский путь', () => {
  beforeEach(() => {
    useShop.setState({ items: [], favorites: [] })
    localStorage.clear()
  })
  it('проходит путь каталог → вариант товара → корзина → заказ курьером', async () => {
    const user = userEvent.setup()
    mount()
    await user.click(await screen.findByRole('link', { name: 'Test Phone' }))
    expect(await screen.findByRole('heading', { name: 'Test Phone', level: 1 })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Подарочный' }))
    await user.click(screen.getByRole('button', { name: 'Увеличить количество' }))
    expect(screen.getByRole('button', { name: 'Увеличить количество' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'В корзину' }))
    expect(useShop.getState().items).toEqual([{ productId: '1', variantId: 'gift', quantity: 2 }])
    await user.click(screen.getByRole('link', { name: 'Корзина, 2 товаров' }))
    expect(await screen.findByRole('heading', { name: /^Ваша корзина/ })).toBeInTheDocument()
    expect(screen.getByText('Подарочный комплект')).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'Оформить заказ' }))
    expect(await screen.findByRole('heading', { name: /^Почти у вас/ })).toBeInTheDocument()
    await user.type(screen.getByLabelText(/^Имя/), 'Покупатель')
    await user.type(screen.getByLabelText(/^Email/), 'test@example.com')
    await user.type(screen.getByLabelText(/^Телефон/), '+79991234567')
    await user.type(screen.getByLabelText(/^Город/), 'Москва')
    await user.type(screen.getByLabelText(/^Улица/), 'Тестовая, 10')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: 'Подтвердить демо-заказ' }))
    expect(
      await screen.findByRole('heading', { name: 'Покупатель, всё готово!' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Курьерская доставка')).toBeInTheDocument()
    expect(useShop.getState().items).toHaveLength(0)
  })
  it('открывает вложенный маршрут напрямую и показывает 404 для неизвестного товара', async () => {
    mount('/product/not-a-product')
    expect(
      await screen.findByRole('heading', { name: 'Здесь пока ничего нет.' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Перейти в каталог' })).toHaveAttribute(
      'href',
      '/catalog',
    )
  })
  it('открывает избранное и возвращает в каталог из пустого состояния', async () => {
    mount('/favorites')
    expect(
      await screen.findByRole('heading', { name: 'Сохраните то, что вдохновляет' }),
    ).toBeInTheDocument()
    await userEvent.click(screen.getByRole('link', { name: 'Открыть каталог' }))
    expect(await screen.findByRole('heading', { name: /^Каталог/ })).toBeInTheDocument()
  })
})
