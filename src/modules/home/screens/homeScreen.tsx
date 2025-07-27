import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Star, User } from "lucide-react"
import { Link } from "react-router"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  rating: number
  image: string
}

const recommendedProducts: Product[] = [
  {
    id: 1,
    name: "Produto Recomendado 1",
    price: "R$ 99,90",
    originalPrice: "R$ 149,90",
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Produto Recomendado 2",
    price: "R$ 79,90",
    originalPrice: "R$ 119,90",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Produto Recomendado 3",
    price: "R$ 129,90",
    originalPrice: "R$ 179,90",
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Produto Recomendado 4",
    price: "R$ 89,90",
    originalPrice: "R$ 139,90",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
]

const bestSellerProducts: Product[] = [
  {
    id: 5,
    name: "Best Seller 1",
    price: "R$ 159,90",
    originalPrice: "R$ 199,90",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Best Seller 2",
    price: "R$ 119,90",
    originalPrice: "R$ 169,90",
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Best Seller 3",
    price: "R$ 89,90",
    originalPrice: "R$ 129,90",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "Best Seller 4",
    price: "R$ 199,90",
    originalPrice: "R$ 249,90",
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
  },
]

const allProducts: Product[] = Array.from({ length: 28 }, (_, i) => ({
  id: i + 9,
  name: `Produto ${i + 1}`,
  price: `R$ ${(Math.random() * 200 + 50).toFixed(2).replace(".", ",")}`,
  originalPrice: `R$ ${(Math.random() * 100 + 200).toFixed(2).replace(".", ",")}`,
  rating: Math.floor(Math.random() * 2) + 4,
  image: "/placeholder.svg?height=200&width=200",
}))

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <div className="space-y-1 mb-3">
          {product.originalPrice && <p className="text-xs text-gray-500 line-through">{product.originalPrice}</p>}
          <p className="font-bold text-lg text-green-600">{product.price}</p>
        </div>
        <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
          <ShoppingCart className="w-4 h-4 mr-2" />
          <Link to={"/product"}>
            Comprar
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function Component() {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-teal-400 text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <div className="font-bold text-lg">Mercato</div>
                <div className="text-xs">ONLINE</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="hover:underline">
                Home
              </a>
              <a href="#" className="hover:underline">
                Discover
              </a>
              <a href="#" className="hover:underline">
                Blog
              </a>
              <a href="#" className="hover:underline">
                About Us
              </a>
              <a href="#" className="hover:underline">
                Contact
              </a>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <User className="w-5 h-5" />
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-teal-400 text-xs font-bold">?</span>
            </div>
          </div>
        </div>
      </header>

      {/* Promotional Banner */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-4 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-yellow-400">PROMOÇÃO</span>
              <br />
              da semana
            </h1>
            <p className="text-xl md:text-2xl mb-6">até 40% de desconto</p>
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold">
              Ver Ofertas
            </Button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-yellow-400/20 to-transparent"></div>
        <div className="absolute right-10 top-10 w-32 h-32 bg-yellow-400/10 rounded-full"></div>
        <div className="absolute right-20 bottom-10 w-20 h-20 bg-yellow-400/20 rounded-full"></div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Recommended Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Recomendados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Best Seller</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* All Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">All Product</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-600 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Informações</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-teal-300">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-300">
                    Política de privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-300">
                    Termos de uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-300">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Atendimento</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-teal-300">
                    Central de ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-300">
                    Fale conosco
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-300">
                    Trocas e devoluções
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-300">
                    Entrega
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Categorias</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-teal-300">
                    Eletrônicos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-300">
                    Roupas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-300">
                    Casa e jardim
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-teal-300">
                    Esportes
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Pagamento</h3>
              <div className="flex gap-2 mb-4">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-800">VISA</span>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-800">MC</span>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-800">PIX</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-500 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 Loja. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
