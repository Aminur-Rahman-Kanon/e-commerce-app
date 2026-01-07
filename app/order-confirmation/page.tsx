import { Suspense } from "react"
import OrderConfirmationContent from "./order-confirmation-content"

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">Loading order details...</div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  )
}
