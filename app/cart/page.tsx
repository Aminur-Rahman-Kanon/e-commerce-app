"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, total, isLoaded } = useCart()

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">Loading cart...</div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-center py-16">
          <ShoppingBag className="h-24 w-24 text-muted-foreground/30" />
          <h2 className="mt-6 text-2xl font-serif">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Add some items to get started</p>
          <Button asChild className="mt-6" size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:py-12">
      <h1 className="text-3xl font-serif tracking-tight sm:text-4xl">Shopping Cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <Card
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="overflow-hidden border-border"
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">
                              <Link href={`/product/${item.id}`} className="hover:text-primary">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                              {item.selectedSize && item.selectedColor && <span> • </span>}
                              {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                            </p>
                          </div>
                          <p className="font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)
                            }
                          >
                            +
                          </Button>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-border">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button asChild className="mt-6 w-full" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button asChild variant="outline" className="mt-3 w-full bg-transparent">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
