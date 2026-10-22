import CheckoutForm from '../features/checkout/CheckoutForm'
import OrderConfirmation from '../features/checkout/OrderConfirmation'
import type { Confirmation } from '../features/checkout/OrderConfirmation'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Info } from 'lucide-react'
import { checkoutSchema } from '../features/checkout/schema'
import type { CheckoutValues } from '../features/checkout/schema'
import { useShop } from '../store/shop'
import { useProducts } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import { getCartLines, getTotals, validateStock } from '../utils/order'
import { toast } from '../store/toasts'
import OrderSummary from '../components/OrderSummary'
import { EmptyState, ErrorState, LoadingState } from '../components/States'

export default function CheckoutPage() {
  usePageTitle('Оформление заказа')
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null)
  const { data: products, isPending, isError, refetch } = useProducts()
  const items = useShop((s) => s.items)
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      delivery: 'courier',
      city: '',
      address: '',
      comment: '',
      consent: false,
    },
  })
  const delivery = form.watch('delivery')
  const { isSubmitting } = form.formState
  const submit = (values: CheckoutValues) => {
    if (!products) return
    const currentItems = useShop.getState().items
    const currentLines = getCartLines(currentItems, products)
    if (
      !currentLines.length ||
      currentLines.length !== currentItems.length ||
      !validateStock(currentLines)
    ) {
      toast('Состав корзины изменился. Проверьте доступное количество.', 'error')
      return
    }
    const totals = getTotals(currentLines, values.delivery)
    setConfirmation({
      id: `VX-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      name: values.name,
      total: totals.total,
      count: totals.count,
      delivery: values.delivery === 'pickup' ? 'Самовывоз' : 'Курьерская доставка',
    })
    useShop.getState().clear()
    window.scrollTo(0, 0)
  }
  if (isPending) return <LoadingState />
  if (isError) return <ErrorState retry={() => void refetch()} />
  if (confirmation) return <OrderConfirmation confirmation={confirmation} />
  const lines = getCartLines(items, products)
  return (
    <div className="container page-space">
      <div className="breadcrumbs">
        <Link to="/">Главная</Link>
        <span>/</span>
        <Link to="/cart">Корзина</Link>
        <span>/</span>
        <span>Оформление</span>
      </div>
      <div className="page-title-row">
        <h1>
          Почти у вас<span className="heading-dot">.</span>
        </h1>
        <span>Оформление заказа</span>
      </div>
      {!lines.length ? (
        <EmptyState
          title="Сначала найдём что-то для вас"
          description="Добавьте товары в корзину, чтобы оформить демонстрационный заказ."
        />
      ) : (
        <>
          <div className="demo-notice">
            <Info size={20} />
            <span>
              <strong>Демонстрационное оформление.</strong> Используйте вымышленные данные. Реальной
              оплаты и доставки нет.
            </span>
          </div>
          <div className="cart-layout checkout-layout">
            <CheckoutForm form={form} onSubmit={submit} />
            <OrderSummary lines={lines} delivery={delivery} checkout submitting={isSubmitting} />
          </div>
        </>
      )}
    </div>
  )
}
