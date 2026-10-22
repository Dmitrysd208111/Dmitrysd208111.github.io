import { useFormContext } from 'react-hook-form'
import type { CheckoutValues } from './schema'

export default function OrderNotes() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutValues>()
  return (
    <section className="checkout-section">
      <h2>
        <span>03</span> Последние детали
      </h2>
      <label className="form-field">
        <span>
          Комментарий <small>необязательно</small>
        </span>
        <textarea
          {...register('comment')}
          rows={3}
          placeholder="Что нам стоит учесть?"
          maxLength={500}
        />
        {errors.comment && <span className="field-error">{errors.comment.message}</span>}
      </label>
      <label className="consent-label">
        <input
          type="checkbox"
          {...register('consent')}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
        />
        <span>
          Я понимаю, что это демонстрационный заказ без оплаты, реальной доставки и передачи
          контактных данных.
        </span>
      </label>
      {errors.consent && (
        <p className="field-error" id="consent-error">
          {errors.consent.message}
        </p>
      )}
    </section>
  )
}
