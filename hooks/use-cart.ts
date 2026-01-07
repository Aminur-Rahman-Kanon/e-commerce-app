"use client"

import { useState, useEffect } from "react"
import type { CartItem } from "@/lib/types"
import { cartStorage } from "@/lib/cart-storage"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setCart(cartStorage.getCart())
    setIsLoaded(true)
  }, [])

  const addToCart = (item: CartItem) => {
    cartStorage.addItem(item)
    setCart(cartStorage.getCart())
  }

  const removeFromCart = (productId: string, selectedSize?: string, selectedColor?: string) => {
    cartStorage.removeItem(productId, selectedSize, selectedColor)
    setCart(cartStorage.getCart())
  }

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => {
    cartStorage.updateQuantity(productId, quantity, selectedSize, selectedColor)
    setCart(cartStorage.getCart())
  }

  const clearCart = () => {
    cartStorage.clearCart()
    setCart([])
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0)

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    isLoaded,
  }
}
