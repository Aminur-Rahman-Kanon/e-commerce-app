"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import products from "@/data/products.json"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)

  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart()
  const { toast } = useToast()

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      })
      return
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      })
      return
    }

    addToCart({
      ...product,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })

    console.log('added')
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:py-12">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to shop
      </Link>

      {/* Product Details */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h1 className="mt-2 text-3xl font-serif tracking-tight sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-2xl font-semibold">${product.price.toFixed(2)}</p>

            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <Label className="text-base">Size</Label>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex h-10 min-w-[3rem] cursor-pointer items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <Label className="text-base">Color</Label>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {product.colors.map((color) => (
                    <div key={color}>
                      <RadioGroupItem value={color} id={`color-${color}`} className="peer sr-only" />
                      <Label
                        htmlFor={`color-${color}`}
                        className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                      >
                        {color}
                        <Check className="h-4 w-4 opacity-0 peer-data-[state=checked]:opacity-100" />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6">
              <Label htmlFor="quantity" className="text-base">
                Quantity
              </Label>
              <div className="mt-3 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-8">
            <Button onClick={handleAddToCart} size="lg" className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
