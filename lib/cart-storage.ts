import type { CartItem } from "./types"

const CART_KEY = "stylemate_cart"

export const cartStorage = {
  getCart: (): CartItem[] => {
    if (typeof window === "undefined") return []
    try {
      const cart = localStorage.getItem(CART_KEY)
      return cart ? JSON.parse(cart) : []
    } catch {
      return []
    }
  },

  setCart: (cart: CartItem[]): void => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
    } catch (error) {
      console.error("Failed to save cart:", error)
    }
  },

  addItem: (product: CartItem): void => {
    const cart = cartStorage.getCart()
    const existingIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.selectedSize === product.selectedSize &&
        item.selectedColor === product.selectedColor,
    )

    if (existingIndex > -1) {
      cart[existingIndex].quantity += product.quantity
    } else {
      cart.push(product)
    }

    cartStorage.setCart(cart)
  },

  removeItem: (productId: string, selectedSize?: string, selectedColor?: string): void => {
    const cart = cartStorage.getCart()
    const filteredCart = cart.filter(
      (item) => !(item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor),
    )
    cartStorage.setCart(filteredCart)
  },

  updateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string): void => {
    const cart = cartStorage.getCart()
    const item = cart.find(
      (item) => item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor,
    )

    if (item) {
      item.quantity = quantity
      if (quantity <= 0) {
        cartStorage.removeItem(productId, selectedSize, selectedColor)
      } else {
        cartStorage.setCart(cart)
      }
    }
  },

  clearCart: (): void => {
    cartStorage.setCart([])
  },

  getTotal: (): number => {
    const cart = cartStorage.getCart()
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  getItemCount: (): number => {
    const cart = cartStorage.getCart()
    return cart.reduce((count, item) => count + item.quantity, 0)
  },
}
