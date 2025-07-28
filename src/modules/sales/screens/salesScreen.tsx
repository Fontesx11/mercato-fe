import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Star } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-teal-400 px-4 py-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Product Image */}
            <div className="bg-gray-400 rounded-lg aspect-square flex items-center justify-center">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="Product placeholder"
                className="w-48 h-48 opacity-60"
              />
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-sm text-gray-600">
                  Nome
                </Label>
                <Input id="nome" placeholder="Digite seu nome" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-gray-600">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="Digite seu email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoria" className="text-sm text-gray-600">
                  Categoria
                </Label>
                <Input id="categoria" placeholder="Selecione categoria" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao" className="text-sm text-gray-600">
                  Descrição
                </Label>
                <Input id="descricao" placeholder="Digite descrição" />
              </div>
              <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">Adicionar</Button>
            </div>

            {/* Welcome Text */}
            <div className="text-white">
              <h1 className="text-4xl font-bold text-yellow-300 mb-4">Bem Vindo!</h1>
              <p className="text-sm leading-relaxed">
                Criamos a loja de chocolates que você sempre sonhou! Aqui você encontra os produtos mais deliciosos e
                saborosos, com sabores únicos preparados por confeiteiros experientes. Venha conhecer nossa loja!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-yellow-100 px-4 py-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Seus Produtos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="bg-gray-300 rounded-lg aspect-square mb-4 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=120&width=120"
                    alt="Chocolate Cheesecake"
                    className="w-30 h-30 opacity-60"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Chocolate Cheesecake</h3>
                <p className="text-lg font-bold text-gray-800 mb-2">$20.99</p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`w-4 h-4 ${starIndex < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(12)</span>
                </div>
                <Button size="sm" className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" className="px-8 bg-transparent">
              Load more (24)
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
