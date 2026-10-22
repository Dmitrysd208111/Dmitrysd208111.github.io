import { ShieldCheck, ArrowRight, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CartLine } from '../types/product'
import { getTotals, FREE_DELIVERY_FROM } from '../utils/order'
import type { DeliveryMethod } from '../utils/order'
import { money, plural } from '../utils/format'
export default function OrderSummary({
  lines,
  delivery = 'courier',
  checkout = false,
  submitting = false,
}: {
  lines: CartLine[]
  delivery?: DeliveryMethod
  checkout?: boolean
  submitting?: boolean
}) {
  const totals = getTotals(lines, delivery)
  return (
    <aside className="order-summary">
      <span className="eyebrow">ОТЛИЧНЫЙ ВЫБОР</span>
      <h2>Ваш заказ</h2>
      <dl>
        <div>
          <dt>{plural(totals.count)}</dt>
          <dd>{money(totals.subtotal)}</dd>
        </div>
        <div>
          <dt>Доставка</dt>
          <dd>{totals.shipping ? money(totals.shipping) : 'Бесплатно'}</dd>
        </div>
        {totals.savings > 0 && (
          <div className="savings">
            <dt>Ваша выгода</dt>
            <dd>{money(totals.savings)}</dd>
          </div>
        )}
      </dl>
      <div className="summary-total">
        <span>Итого</span>
        <strong>{money(totals.total)}</strong>
      </div>
      {totals.subtotal < FREE_DELIVERY_FROM && delivery === 'courier' && (
        <div className="shipping-progress">
          <span>
            <Truck size={15} /> До бесплатной доставки {money(FREE_DELIVERY_FROM - totals.subtotal)}
          </span>
          <div>
            <i
              style={{ width: `${Math.min(100, (totals.subtotal / FREE_DELIVERY_FROM) * 100)}%` }}
            />
          </div>
        </div>
      )}
      {checkout ? (
        <button
          className="btn btn-primary"
          type="submit"
          form="checkout-form"
          disabled={submitting}
        >
          {submitting ? 'Оформляем…' : 'Подтвердить демо-заказ'}
          <ArrowRight size={18} />
        </button>
      ) : (
        <Link className="btn btn-primary" to="/checkout">
          Оформить заказ <ArrowRight size={18} />
        </Link>
      )}
      <p className="summary-note">
        <ShieldCheck size={16} />
        {checkout ? 'Без оплаты и отправки данных на сервер' : 'Безопасное демо-оформление'}
      </p>
      {checkout && (
        <p className="demo-hint">
          Нажимая кнопку, вы создаёте только демонстрационный заказ. Списание денег не производится.
        </p>
      )}
    </aside>
  )
}
