import { z } from 'zod'
export const checkoutSchema = z
  .object({
    name: z.string().trim().min(2, 'Укажите имя, минимум 2 символа').max(80, 'Слишком длинное имя'),
    email: z.email('Введите корректный email'),
    phone: z
      .string()
      .trim()
      .refine((value) => {
        const digits = value.replace(/\D/g, '')
        return digits.length === 11 && /^[78]/.test(digits)
      }, 'Укажите российский номер из 11 цифр'),
    delivery: z.enum(['courier', 'pickup']),
    city: z.string().trim().max(100),
    address: z.string().trim().max(200),
    comment: z.string().max(500, 'Не более 500 символов'),
    consent: z.boolean().refine(Boolean, 'Подтвердите демонстрационный характер заказа'),
  })
  .superRefine((data, ctx) => {
    if (data.delivery === 'courier') {
      if (data.city.length < 2)
        ctx.addIssue({ code: 'custom', path: ['city'], message: 'Укажите город' })
      if (data.address.length < 5)
        ctx.addIssue({
          code: 'custom',
          path: ['address'],
          message: 'Укажите улицу, дом и квартиру',
        })
    }
  })
export type CheckoutValues = z.infer<typeof checkoutSchema>
