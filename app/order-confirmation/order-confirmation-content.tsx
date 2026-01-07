"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Order } from "@/lib/types"

export default function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("order")
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    const storedOrder = sessionStorage.getItem("lastOrder")
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder))
    }
  }, [])

  if (!order) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">Loading order details...</div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Success Message */}
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h1 className="mt-6 text-3xl font-serif tracking-tight sm:text-4xl">Order Confirmed!</h1>
        <p className="mt-4 text-lg text-muted-foreground">Thank you for your purchase</p>
      </div>

      {/* Order Details */}
      <Card className="mt-8 border-border">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Confirmation Number</p>
            <p className="mt-1 text-xl font-bold">{order.id}</p>
          </div>

          <div>
            <h3 className="font-semibold">Shipping Information</h3>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <p>{order.customerInfo.name}</p>
              <p>{order.customerInfo.email}</p>
              <p>{order.customerInfo.phone}</p>
              <p>{order.customerInfo.address}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold">Order Items</h3>
            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded border border-border bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedSize && item.selectedColor && <span> • </span>}
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex justify-between text-lg">
            <span className="font-semibold">Total</span>
            <span className="font-bold">${order.total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild size="lg">
          <Link href="/">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="bg-transparent">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    </div>
  )
}
