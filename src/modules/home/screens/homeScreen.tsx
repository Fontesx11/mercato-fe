import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { URL_CATEGORY, URL_PRODUCT } from '@/shared/constants/urls';
import { MethodsEnum } from '@/shared/enums/methods.enum';
import { useDataContext } from '@/shared/hooks/useDataContext';
import { useRequest } from '@/shared/hooks/useResquest';
import type { ProductType } from '@/shared/types/ProductType';
import { useEffect } from 'react';

function ProductCard({ product }: { product: ProductType }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
        <div className="space-y-1 mb-3">
          <p className="font-bold text-lg text-green-600">{product.price}</p>
        </div>
        <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
          <ShoppingCart className="w-4 h-4 mr-2" />
          <Link to={'/product'}>Comprar</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Component() {
  const { products, categories, setProducts, setCategories } = useDataContext();
  const { request } = useRequest();

  useEffect(() => {
    if (!products || products.length === 0) {
      request(URL_PRODUCT, MethodsEnum.GET, setProducts);
    }
    if (!categories || categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    }
  }, [products, categories, request, setProducts, setCategories]);

  console.log(products);
  console.log(categories);


  return (
    <div className="min-h-screen bg-yellow-50">
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

        {/* All Products */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">All Product</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
