"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, total, clearCart, isLoaded } = useCart()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      setIsProcessing(false)
      return
    }

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate order confirmation number
    const confirmationNumber = `SM-${Date.now().toString().slice(-8)}`

    // Store order info in session storage for confirmation page
    sessionStorage.setItem(
      "lastOrder",
      JSON.stringify({
        confirmationNumber,
        customerInfo: formData,
        items: cart,
        total,
        date: new Date().toISOString(),
      }),
    )

    // Clear cart
    clearCart()

    // Redirect to confirmation
    router.push(`/order-confirmation?order=${confirmationNumber}`)
  }

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-center py-16">
          <h2 className="text-2xl font-serif">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Add some items before checking out</p>
          <Button asChild className="mt-6" size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:py-12">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to cart
      </Link>

      <h1 className="mt-6 text-3xl font-serif tracking-tight sm:text-4xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-2 bg-transparent"
                  />
                </div>

                <div>
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-2 bg-transparent"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-2 bg-transparent"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="address">
                    Street Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-2 bg-transparent"
                  />
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-2 bg-transparent"
                  />
                </div>

                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="mt-2 bg-transparent"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="mt-2 bg-transparent"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-border">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Cart Items */}
                <div className="max-h-[300px] space-y-3 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded border border-border bg-muted">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 text-sm">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>

                <Button type="submit" disabled={isProcessing} className="w-full" size="lg">
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
