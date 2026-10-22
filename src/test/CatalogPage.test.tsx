import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom'
import CatalogPage from '../pages/CatalogPage'
import { products } from './fixtures'
function Location() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <>
      <output aria-label="Текущий URL">{location.search}</output>
      <button onClick={() => navigate('?q=Laptop&brand=Dell')}>Внешняя навигация</button>
    </>
  )
}
function mount(initial = '/catalog') {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  client.setQueryData(['products'], products)
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[initial]}>
        <CatalogPage />
        <Location />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}
describe('Каталог: поиск и навигация', () => {
  it('сохраняет категорию и бренд при поиске', async () => {
    mount('/catalog?brand=Apple&category=smartphones')
    await userEvent.type(screen.getByRole('textbox', { name: 'Поиск по каталогу' }), 'Phone')
    await waitFor(() =>
      expect(screen.getByLabelText('Текущий URL').textContent).toContain('q=Phone'),
    )
    expect(screen.getByLabelText('Текущий URL').textContent).toContain('brand=Apple')
    expect(screen.getByLabelText('Текущий URL').textContent).toContain('category=smartphones')
  })
  it('показывает сохранённые фильтры из URL и сортирует', async () => {
    mount('/catalog?brand=Apple&category=smartphones')
    expect(screen.getByText('Найдено: 1 товар')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Test Phone' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Laptop Pro' })).not.toBeInTheDocument()
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'Сортировка' }),
      'price-desc',
    )
    expect(screen.getByLabelText('Текущий URL').textContent).toContain('sort=price-desc')
  })
  it('поиск с debounce меняет URL и восстанавливается при навигации', async () => {
    mount()
    const user = userEvent.setup()
    const input = screen.getByRole('textbox', { name: 'Поиск по каталогу' })
    await user.type(input, 'Phone')
    expect(screen.getByLabelText('Текущий URL').textContent).not.toContain('q=Phone')
    await waitFor(() =>
      expect(screen.getByLabelText('Текущий URL').textContent).toContain('q=Phone'),
    )
    expect(screen.getByText('Найдено: 2 товара')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Внешняя навигация' }))
    await waitFor(() => expect(input).toHaveValue('Laptop'))
    await new Promise((resolve) => setTimeout(resolve, 350))
    expect(screen.getByLabelText('Текущий URL').textContent).toContain('q=Laptop')
    expect(screen.getByText('Найдено: 1 товар')).toBeInTheDocument()
  })
  it('сбрасывает пустую выдачу без потери управления', async () => {
    mount('/catalog?q=Unknown')
    expect(screen.getByRole('heading', { name: 'Пока ничего не нашлось' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Сбросить фильтры' }))
    expect(screen.getByText('Найдено: 3 товара')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Поиск по каталогу' })).toHaveValue('')
  })
})
