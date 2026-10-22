import { useFormContext, useWatch } from 'react-hook-form'
import type { CheckoutValues } from './schema'
import { Truck, MapPin } from 'lucide-react'
export default function DeliveryFields() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CheckoutValues>()
  const delivery = useWatch({ control, name: 'delivery' })
  return (
    <section className="checkout-section">
      <h2>
        <span>02</span> Способ получения
      </h2>
      <div className="delivery-options">
        <label className={delivery === 'courier' ? 'active' : ''}>
          <input {...register('delivery')} type="radio" value="courier" />
          <Truck size={23} />
          <span>
            <strong>Курьером</strong>
            <small>490 ₽ · бесплатно от 30 000 ₽</small>
          </span>
          <span className="radio-indicator" />
        </label>
        <label className={delivery === 'pickup' ? 'active' : ''}>
          <input {...register('delivery')} type="radio" value="pickup" />
          <MapPin size={23} />
          <span>
            <strong>Самовывоз</strong>
            <small>Бесплатно · демо-пункт</small>
          </span>
          <span className="radio-indicator" />
        </label>
      </div>
      {delivery === 'courier' ? (
        <div className="form-grid">
          <label className="form-field full">
            <span>
              Город <b>*</b>
            </span>
            <input
              {...register('city')}
              placeholder="Москва"
              autoComplete="address-level2"
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? 'city-error' : undefined}
            />
            {errors.city && (
              <span className="field-error" id="city-error">
                {errors.city.message}
              </span>
            )}
          </label>
          <label className="form-field full">
            <span>
              Улица, дом, квартира <b>*</b>
            </span>
            <input
              {...register('address')}
              placeholder="ул. Примерная, д. 10, кв. 5"
              autoComplete="street-address"
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? 'address-error' : undefined}
            />
            {errors.address && (
              <span className="field-error" id="address-error">
                {errors.address.message}
              </span>
            )}
          </label>
        </div>
      ) : (
        <div className="pickup-note">
          <MapPin size={19} />
          <p>
            <strong>Демо-пункт VELTRIX, Москва</strong>
            <br />
            Условный адрес: ул. Технологий, 1. Пункт существует только в этом проекте.
          </p>
        </div>
      )}
    </section>
  )
}
