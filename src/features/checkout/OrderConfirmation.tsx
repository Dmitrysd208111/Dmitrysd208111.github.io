import { Link } from 'react-router-dom'
import { Check, Info, ArrowRight } from 'lucide-react'
import { money } from '../../utils/format'
export interface Confirmation {
  id: string
  name: string
  total: number
  count: number
  delivery: string
}
export default function OrderConfirmation({ confirmation }: { confirmation: Confirmation }) {
  return (
    <div className="container confirmation page-space">
      <span className="confirmation-icon">
        <Check size={40} />
      </span>
      <span className="eyebrow">ОТЛИЧНЫЙ ВЫБОР</span>
      <h1>{confirmation.name}, всё готово!</h1>
      <p>
        Демонстрационный заказ <strong>{confirmation.id}</strong> оформлен.
      </p>
      <div className="confirmation-card">
        <div>
          <span>Товаров</span>
          <strong>{confirmation.count}</strong>
        </div>
        <div>
          <span>Получение</span>
          <strong>{confirmation.delivery}</strong>
        </div>
        <div>
          <span>Итого</span>
          <strong>{money(confirmation.total)}</strong>
        </div>
      </div>
      <div className="demo-notice">
        <Info size={20} />
        <span>
          Это демо: оплата не списана, заказ никуда не отправлен, письмо не рассылается. Контактные
          данные не сохранены.
        </span>
      </div>
      <Link className="btn btn-primary" to="/catalog">
        За новыми открытиями <ArrowRight size={18} />
      </Link>
    </div>
  )
}
