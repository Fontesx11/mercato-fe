import type { RouteObject } from 'react-router-dom';

import ProductScreen from './screens/productScreen';

export const productScreenRoutesEnum = {
  PRODUCT: '/product',
};

export const productScreenRoutes: RouteObject[] = [
  {
    path: productScreenRoutesEnum.PRODUCT,
    element: <ProductScreen />,
  },
];
