import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import products from "@/data/products.json"

export default function HomePage() {
  // Get unique categories
  const categories = Array.from(new Set(products.map((p) => p.category)))

  return (
    <div className="w-full flex flex-col">
      <div className="relative w-full h-[60vh] flex justify-center align-items">
        <div className="w-full h-full flex justify-center align-items">
          <Image src={'/hero.jpg'}
                  alt="stylemate limited"
                  fill
                  style={{objectFit: 'cover', filter: 'brightness(50%)'}} />
        </div>
        <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform w-[750px] flex items-center justify-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-serif tracking-tight text-white sm:text-5xl lg:text-6xl">
              Timeless Style for the Modern Wardrobe
            </h1>
            <p className="mt-6 text-lg text-white leading-relaxed text-pretty">
              Discover carefully curated pieces that blend elegance with everyday comfort. Quality craftsmanship meets
              contemporary design.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="#categories">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Categories Section */}
      <section id="categories" className="scroll-mt-20 px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-serif tracking-tight sm:text-4xl">Shop by Category</h2>
            <p className="mt-4 text-muted-foreground">Find exactly what you're looking for</p>
          </div>

          {/* Category Grid */}
          <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`#${category.toLowerCase()}`}
                className="group rounded-lg border border-border bg-card px-4 py-6 text-center transition-colors hover:border-foreground/20 hover:bg-accent"
              >
                <span className="text-sm font-medium">{category}</span>
              </Link>
            ))}
          </div>

          {/* Products by Category */}
          {categories.map((category) => {
            const categoryProducts = products.filter((p) => p.category === category)
            return (
              <div key={category} id={category.toLowerCase()} className="mb-16 scroll-mt-24">
                <h3 className="mb-6 text-2xl font-serif tracking-tight">{category}</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
