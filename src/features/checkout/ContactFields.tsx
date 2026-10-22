import { useFormContext } from 'react-hook-form'
import type { CheckoutValues } from './schema'

export default function ContactFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutValues>()
  return (
    <section className="checkout-section">
      <h2>
        <span>01</span> Контактные данные
      </h2>
      <div className="form-grid">
        {(
          [
            {
              name: 'name',
              label: 'Имя',
              placeholder: 'Александр',
              autoComplete: 'given-name',
              type: 'text',
            },
            {
              name: 'phone',
              label: 'Телефон',
              placeholder: '+7 999 123-45-67',
              autoComplete: 'tel',
              type: 'tel',
            },
            {
              name: 'email',
              label: 'Email',
              placeholder: 'hello@example.com',
              autoComplete: 'email',
              type: 'email',
            },
          ] as const
        ).map((f) => (
          <label key={f.name} className={`form-field ${f.name === 'email' ? 'full' : ''}`}>
            <span>
              {f.label} <b>*</b>
            </span>
            <input
              {...register(f.name)}
              type={f.type}
              placeholder={f.placeholder}
              autoComplete={f.autoComplete}
              aria-invalid={!!errors[f.name]}
              aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
            />
            {errors[f.name] && (
              <span className="field-error" id={`${f.name}-error`}>
                {errors[f.name]?.message}
              </span>
            )}
          </label>
        ))}
      </div>
    </section>
  )
}
