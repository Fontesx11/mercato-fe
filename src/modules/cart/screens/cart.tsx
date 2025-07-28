import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ProductType } from '@/shared/types/ProductType';
import { ArrowLeft, Minus, Plus, ShoppingCart, Tag, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const VALID_PROMO_CODES: Record<string, number> = {
  HAPPY10: 0.1, // 10% de desconto
  SUMMER20: 0.2, // 20% de desconto
  SALE50: 0.5, // 50% de desconto
};

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<ProductType[]>([
    {
      id: 1,
      name: 'Vel pellentesque bibendum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 33.9,
      quantity: 1,
      image: '/public/apple-touch-icon.png',
    },
    {
      id: 2,
      name: 'Magna quis at non',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero.',
      price: 14.9,
      quantity: 1,
      image: '/public/apple-touch-icon.png',
    },
    {
      id: 3,
      name: 'Cursus tortor ac eget',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 16.9,
      quantity: 1,
      image: '/public/apple-touch-icon.png',
    },
  ]);

  const [promoCode, setPromoCode] = useState<{
    input: string;
    promo: { code: string; discount: number } | null;
    error: string | null;
  }>({
    input: '',
    promo: null,
    error: null,
  });

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return removeItem(id);
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleApplyPromoCode = () => {
    const code = promoCode.input.toUpperCase();
    if (VALID_PROMO_CODES[code]) {
      setPromoCode({
        ...promoCode,
        promo: {
          code: code,
          discount: VALID_PROMO_CODES[code],
        },
        error: null,
      });
    } else {
      setPromoCode({
        ...promoCode,
        promo: null,
        error: 'Código promocional inválido ou expirado.',
      });
    }
  };

  const handleRemovePromoCode = () => {
    setPromoCode({ input: '', promo: null, error: null });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = promoCode.promo ? subtotal * promoCode.promo.discount : 0;
  const total = subtotal - discountAmount;

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Cart <span className="text-gray-500">{cartItems.length}</span>
          </h1>

          {/* Cart Empty*/}
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Seu carrinho está vazio</h2>
              <p className="text-gray-500 mb-6">
                Parece que você ainda não adicionou nenhum produto.
              </p>
              <Link to="/home">
                <Button className="bg-black hover:bg-gray-800 text-white px-6">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continuar comprando
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium text-gray-600">
                <div className="col-span-5">Item</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total Price</div>
                <div className="col-span-1"></div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 py-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-4 items-center py-4 border-b border-gray-100"
                  >
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <img
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded-lg"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <span className="font-medium">${item.price.toFixed(1)}</span>
                    </div>

                    <div className="col-span-2 flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="col-span-2 text-center">
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="col-span-1 flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Section */}
              <div className="flex items-center gap-4 py-6">
                <span className="text-gray-600">Código Promocional</span>
                <div className="flex items-center gap-2">
                  <Input
                    value={promoCode.input}
                    onChange={(e) => setPromoCode({ ...promoCode, input: e.target.value })}
                    className="w-32"
                    placeholder="Digite seu cupom"
                    disabled={!!promoCode.promo}
                  />
                  <Button
                    onClick={handleApplyPromoCode}
                    disabled={!!promoCode.promo || !promoCode.input}
                  >
                    Aplicar
                  </Button>
                </div>
                {promoCode.error && <p className="text-red-600 text-sm mt-2">{promoCode.error}</p>}
              </div>

              {promoCode.promo && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm flex-grow">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-semibold">
                        Cupom "{promoCode.promo.code}" aplicado! ({promoCode.promo.discount * 100}%)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                      onClick={handleRemovePromoCode}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t">
                <div className="flex justify-end">
                  {/* Bloco de preços com largura definida e espaçamento vertical */}
                  <div className="w-full max-w-sm space-y-2">
                    {/* LINHA: Subtotal */}
                    <div className="flex justify-between text-md">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                    </div>

                    {/* LINHA: Desconto (condicional) */}
                    {promoCode.promo && (
                      <div className="flex justify-between text-md">
                        <span className="text-gray-600">Desconto</span>
                        <span className="font-medium text-green-600">
                          -${discountAmount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* Separador e LINHA: Total */}
                    <div className="flex justify-between text-xl font-bold pt-3 mt-3 border-t">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-5">
                  <Link to="/home">
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to shopping
                    </Button>
                  </Link>
                  <Link to="/payment">
                    <Button className="bg-black hover:bg-gray-800 text-white px-8">
                      Check out
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
