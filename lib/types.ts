export interface Product {
  id: string
  name: string
  category: string
  price: number
  description: string
  image: string
  sizes?: string[]
  colors?: string[]
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
  }
  date: string
}
