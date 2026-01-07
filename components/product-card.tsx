import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group overflow-hidden border-border transition-shadow hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <div className="w-full">
            <p className="text-xs text-muted-foreground">{product.category}</p>
            <h3 className="font-medium text-foreground">{product.name}</h3>
          </div>
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
