import type { RouteObject } from 'react-router-dom';

import CartScreen from './screens/cart';

export const CartRoutesEnum = {
  CART: '/cart',
};

export const cartRoutes: RouteObject[] = [
  {
    path: CartRoutesEnum.CART,
    element: <CartScreen />,
  },
];
