import { FormProvider } from 'react-hook-form'
import type { UseFormReturn, SubmitHandler } from 'react-hook-form'
import type { CheckoutValues } from './schema'
import ContactFields from './ContactFields'
import DeliveryFields from './DeliveryFields'
import OrderNotes from './OrderNotes'
export default function CheckoutForm({
  form,
  onSubmit,
}: {
  form: UseFormReturn<CheckoutValues>
  onSubmit: SubmitHandler<CheckoutValues>
}) {
  return (
    <FormProvider {...form}>
      <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <ContactFields />
        <DeliveryFields />
        <OrderNotes />
      </form>
    </FormProvider>
  )
}
