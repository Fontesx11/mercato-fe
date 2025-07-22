'use client';

import {
  ChevronDown,
  Heart,
  MapPin,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Star,
  User,
} from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function HomeScreen() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const StarRating = ({ rating, total }: { rating: number; total?: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        {total && <span className="text-sm text-gray-600 ml-1">({total})</span>}
      </div>
    );
  };

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

      {/* Search Bar */}
      <div className="bg-yellow-50 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4" />
            <span>San Francisco, California</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>Best deals</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search for anything..."
                className="pl-10 bg-white border-gray-300"
              />
            </div>
          </div>
          <Button variant="outline" size="icon" className="bg-black text-white border-black">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-8 shadow-sm"></div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Lenovo IdeaPad 1</h1>
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            <div className="text-3xl font-bold text-gray-900">$409.99</div>

            <p className="text-gray-600 leading-relaxed">
              O IdeaPad 1 eleva sua categoria de notebooks com um processador Intel super eficiente
              de 12ª geração em uma chassi...
            </p>

            <div className="flex items-center gap-2">
              <StarRating rating={4} />
              <span className="text-sm font-medium">4.8</span>
              <span className="text-sm text-gray-500">(1,873)</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decrementQuantity}
                  className="h-10 w-10 rounded-l-lg"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={incrementQuantity}
                  className="h-10 w-10 rounded-r-lg"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1 bg-black text-white hover:bg-gray-800">Order Now</Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-transparent border-b border-gray-200 rounded-none h-auto p-0">
              <TabsTrigger
                value="description"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent"
              >
                Reviews
              </TabsTrigger>
              <TabsTrigger
                value="ingredients"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent"
              >
                Ingredients
              </TabsTrigger>
              <TabsTrigger
                value="hot-deal"
                className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent"
              >
                Hot Deal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="mt-8 space-y-8">
              {/* Add Review Section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Add a review</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Be the first to review "Spectacular views of Queensland"
                </p>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-gray-300 cursor-pointer hover:text-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex gap-4">
                  <Input placeholder="Share your thoughts" className="flex-1" />
                  <Button className="bg-black text-white">Post It!</Button>
                </div>
              </div>

              {/* Comments */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">3 comments</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Newest</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Comment 1 */}
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>OJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">Osvaldo Jesuino</span>
                        <StarRating rating={4} />
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        O notebook é excelente já tivemos um dessa. Só tenho a reclamar uma coisa,
                        comprei erroneamente a vista e eu queria ter comprado dividido e não
                        consegui cancelar a compra e refazer dividido, nos outros apps eu consigo
                        fazer isso.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>about 1 hour ago</span>
                        <button className="hover:underline">Like</button>
                        <button className="hover:underline">Reply</button>
                      </div>
                    </div>
                  </div>

                  {/* Comment 2 */}
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback>OR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">Osvaldo Rodolfo</span>
                        <StarRating rating={5} />
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        Muito confiável, chegou rápido e bem embalado, único problema que eu tive
                        foi com a nota fiscal que não veio com o produto, mas estou tentando
                        resolver isso, de resto, é ótimo funcionou bem e é de qualidade
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>about 1 hour ago</span>
                        <button className="hover:underline">Like</button>
                        <button className="hover:underline">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-8">
                  <Button variant="ghost" className="text-sm">
                    Loading comment
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* You May Also Like */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Notebook Dell Inspiron 15', price: '$499.99', rating: 4, reviews: 120 },
              { name: 'Chocolate Cheesecake', price: '$20.99', rating: 5, reviews: 100 },
              { name: 'Chocolate Cheesecake', price: '$20.99', rating: 4, reviews: 100 },
              { name: 'Chocolate Cheesecake', price: '$20.99', rating: 5, reviews: 120 },
            ].map((product, index) => (
              <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center"></div>
                  <h3 className="font-medium text-sm mb-2">{product.name}</h3>
                  <div className="text-lg font-bold mb-2">{product.price}</div>
                  <div className="flex items-center justify-between">
                    <StarRating rating={product.rating} total={product.reviews} />
                    <Button size="icon" className="bg-gray-800 text-white w-8 h-8">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-400 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Sweetdeli</h3>
              <div className="space-y-2 text-sm">
                <p>Contato</p>
                <p>sac@mercatoonline.com</p>
                <p>+55 61 92345-0704</p>
                <p>123 Rua, Pernambuco, Brasil</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Outros sites</h3>
              <div className="space-y-2 text-sm">
                <p>Desenvolvedores</p>
                <p>Mercato Pay</p>
                <p>Envios</p>
                <p>Minha Página</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Sobre o</h3>
              <div className="space-y-2 text-sm">
                <p>Mercato Online</p>
                <p>Sustentabilidade</p>
                <p>Tendências</p>
                <p>Investor relations</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Get the app</h3>
              <div className="space-y-3">
                <div className="bg-black rounded-lg px-4 py-2 text-xs">
                  <div>Download on the</div>
                  <div className="font-bold">App Store</div>
                </div>
                <div className="bg-black rounded-lg px-4 py-2 text-xs">
                  <div>GET IT ON</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
