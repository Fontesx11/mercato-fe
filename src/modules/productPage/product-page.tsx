"use client"

import { useState } from "react"
import { Heart, Star, Plus, Minus, ShoppingCart, ChevronDown, Menu, MapPin, Tag, Search } from "lucide-react"

export default function ProductPage() {
  const [showEmojiModal, setShowEmojiModal] = useState(false)

  return (
    <div className="min-h-screen bg-[#edecb3]">
      {/* Header */}
      <header className="bg-[#31c2b9] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded">
                <ShoppingCart className="w-6 h-6 text-[#31c2b9]" />
              </div>
              <div className="text-white">
                <div className="font-bold text-lg">Mercado</div>
                <div className="text-sm">ONLINE</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-white">
              <a href="#" className="hover:underline">
                Início
              </a>
              <a href="#" className="hover:underline">
                Produtos
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
                Stores
              </a>
            </nav>
          </div>
          <div className="text-white">
            <div className="w-6 h-6 border border-white rounded-full flex items-center justify-center">
              <span className="text-xs">?</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-[#edecb3] px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">San Francisco, California</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="w-4 h-4" />
            <span className="text-sm">Best deals</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for anything..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#31c2b9]"
              />
            </div>
          </div>
          <button className="bg-black text-white p-2 rounded-xl">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-xl p-8">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Lenovo IdeaPad 1"
              className="w-full h-auto rounded-xl"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Lenovo IdeaPad 1</h1>
              <Heart className="w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer" />
            </div>

            <div className="text-3xl font-bold text-gray-900">$409.99</div>

            <p className="text-gray-600 leading-relaxed">
              O IdeaPad 1 eleva sua categoria de notebooks com um processador Intel super eficiente de 12ª geração em
              uma chassi...
            </p>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">4.8 (1,873)</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-xl">
                <button className="p-2 hover:bg-gray-100">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300">1</span>
                <button className="p-2 hover:bg-gray-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                Order Now
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button className="pb-4 border-b-2 border-black font-medium">Description</button>
            <button className="pb-4 text-gray-500 hover:text-gray-700">Reviews</button>
          </div>
        </div>

        {/* Add Review Section */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4">Add a review</h3>
          <p className="text-gray-600 mb-4">Be the first to review "Spectacular views of Queensland"</p>

          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer" />
            ))}
          </div>

          <div className="space-y-4">
            <div className="bg-[#edecb3] rounded-xl p-4 shadow-lg">
              <div className="flex gap-4 items-stretch">
                <div className="relative flex-1" style={{ width: "80%" }}>
                  <textarea
                    placeholder="Share your thoughts"
                    className="w-full p-4 pr-12 border border-gray-300 rounded-xl resize-none bg-[#edecb3] focus:outline-none focus:ring-2 focus:ring-[#31c2b9] h-12"
                  />
                  <div className="absolute right-3 top-3 flex items-center gap-2">
                    <button
                      onClick={() => setShowEmojiModal(true)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      😊
                    </button>
                  </div>
                </div>
                <div style={{ width: "20%" }} className="flex items-center justify-center">
                  <button className="bg-black text-white px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors w-full h-12 flex items-center justify-center">
                    Post It!
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Emoji Modal */}
          {showEmojiModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Choose an emoji</h3>
                  <button onClick={() => setShowEmojiModal(false)} className="text-gray-400 hover:text-gray-600">
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
                  {[
                    "😀",
                    "😃",
                    "😄",
                    "😁",
                    "😆",
                    "😅",
                    "😂",
                    "🤣",
                    "😊",
                    "😇",
                    "🙂",
                    "🙃",
                    "😉",
                    "😌",
                    "😍",
                    "🥰",
                    "😘",
                    "😗",
                    "😙",
                    "😚",
                    "😋",
                    "😛",
                    "😝",
                    "😜",
                    "🤪",
                    "🤨",
                    "🧐",
                    "🤓",
                    "😎",
                    "🤩",
                    "🥳",
                    "😏",
                    "😒",
                    "😞",
                    "😔",
                    "😟",
                    "😕",
                    "🙁",
                    "☹️",
                    "😣",
                    "😖",
                    "😫",
                    "😩",
                    "🥺",
                    "😢",
                    "😭",
                    "😤",
                    "😠",
                    "😡",
                    "🤬",
                    "🤯",
                    "😳",
                    "🥵",
                    "🥶",
                    "😱",
                    "😨",
                    "😰",
                    "😥",
                    "😓",
                    "🤗",
                    "🤔",
                    "🤭",
                    "🤫",
                    "🤥",
                    "😶",
                    "😐",
                    "😑",
                    "😬",
                    "🙄",
                    "😯",
                    "😦",
                    "😧",
                    "😮",
                    "😲",
                    "🥱",
                    "😴",
                    "🤤",
                    "😪",
                    "😵",
                    "🤐",
                    "🥴",
                    "🤢",
                    "🤮",
                    "🤧",
                    "😷",
                    "🤒",
                    "🤕",
                    "🤑",
                    "🤠",
                    "😈",
                    "👿",
                    "👹",
                    "👺",
                    "🤡",
                    "💩",
                    "👻",
                    "💀",
                    "☠️",
                    "👽",
                    "👾",
                    "🤖",
                    "🎃",
                    "😺",
                    "😸",
                    "😹",
                    "😻",
                    "😼",
                    "😽",
                    "🙀",
                    "😿",
                    "😾",
                    "❤️",
                    "🧡",
                    "💛",
                    "💚",
                    "💙",
                    "💜",
                    "🖤",
                    "🤍",
                    "🤎",
                    "💔",
                    "❣️",
                    "💕",
                    "💞",
                    "💓",
                    "💗",
                    "💖",
                    "💘",
                    "💝",
                    "💟",
                    "👍",
                    "👎",
                    "👌",
                    "🤌",
                    "🤏",
                    "✌️",
                    "🤞",
                    "🤟",
                    "🤘",
                    "🤙",
                    "👈",
                    "👉",
                    "👆",
                    "🖕",
                    "👇",
                    "☝️",
                    "👋",
                    "🤚",
                    "🖐️",
                    "✋",
                    "🖖",
                    "👏",
                    "🙌",
                    "🤝",
                    "🙏",
                    "✍️",
                    "💪",
                    "🦾",
                    "🦿",
                    "🦵",
                  ].map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        // Aqui você pode adicionar a lógica para inserir o emoji no textarea
                        setShowEmojiModal(false)
                      }}
                      className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">3 comments</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Newest</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          <div className="space-y-6">
            {/* Comment 1 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Osvaldo Beahan</span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  O notebook é excelente já tivemos um dessa. Só tenho a reclamar uma coisa. Comprei erroneamente a
                  vista e eu queria ter comprado dividido e não consegui cancelar a compra e refazer dividido, nos
                  outros apps eu consigo fazer isso.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>about 1 hour ago</span>
                  <button className="hover:text-gray-700">Like</button>
                  <button className="hover:text-gray-700">Reply</button>
                </div>
              </div>
            </div>

            {/* Comment 2 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Osvaldo Rodolfo</span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-3">
                  Muito confiável, chegou rápido e bem embalado, único problema que eu tive foi com a nota fiscal que
                  não veio com o produto, mas entrou tentando resolver isso, de resto, é ótimo funcionou bem e é de
                  qualidade
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>about 1 hour ago</span>
                  <button className="hover:text-gray-700">Like</button>
                  <button className="hover:text-gray-700">Reply</button>
                </div>
              </div>
            </div>

            {/* Load More Comments Button */}
            <div className="flex items-center justify-center py-4">
              <button className="bg-[#edecb3] border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-[#e5e4a8] transition-colors shadow-lg">
                Load more comments
              </button>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8">You may also like</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product 1 */}
            <div className="bg-[#edecb3] rounded-xl p-4">
              <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Notebook Dell Inspiron 15"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-medium mb-2">Notebook Dell Inspiron 15</h4>
              <div className="text-xl font-bold mb-2">$499.99</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(120)</span>
                </div>
                <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-[#edecb3] rounded-xl p-4">
              <div className="aspect-square bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                <div className="text-gray-400">
                  <div className="w-16 h-16 bg-gray-300 rounded"></div>
                </div>
              </div>
              <h4 className="font-medium mb-2">Chocolate Cheesecake</h4>
              <div className="text-xl font-bold mb-2">$20.99</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(100)</span>
                </div>
                <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-[#edecb3] rounded-xl p-4">
              <div className="aspect-square bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                <div className="text-gray-400">
                  <div className="w-16 h-16 bg-gray-300 rounded"></div>
                </div>
              </div>
              <h4 className="font-medium mb-2">Chocolate Cheesecake</h4>
              <div className="text-xl font-bold mb-2">$20.99</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(100)</span>
                </div>
                <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product 4 */}
            <div className="bg-[#edecb3] rounded-xl p-4">
              <div className="aspect-square bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
                <div className="text-gray-400">
                  <div className="w-16 h-16 bg-gray-300 rounded"></div>
                </div>
              </div>
              <h4 className="font-medium mb-2">Chocolate Cheesecake</h4>
              <div className="text-xl font-bold mb-2">$20.99</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(120)</span>
                </div>
                <button className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#8bb5ca] px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Sweetdeli</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Contato</p>
                <p>sac@mercadoonline.com</p>
                <p>+55 61 92345-0704</p>
                <p>123 Rua, Pernambuco, Brasil</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Outros sites</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Desenvolvedores</p>
                <p>Mercado Pay</p>
                <p>Envios</p>
                <p>Minha Página</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Sobre o</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>Mercado Online</p>
                <p>Sustentabilidade</p>
                <p>Tendências</p>
                <p>Investor relations</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Get the app</h4>
              <div className="space-y-3">
                <div className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <div className="text-xs">
                    <div>Download on the</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </div>
                <div className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <div className="text-xs">
                    <div>GET IT ON</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-gray-300">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
              <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
            </div>
            <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
