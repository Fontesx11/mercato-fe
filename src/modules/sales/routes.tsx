import type { RouteObject } from 'react-router-dom';

import SalesScreen from './screens/salesScreen';

export const salesRoutesEnum = {
  sales: '/sales',
};

export const salesRoutes: RouteObject[] = [
  {
    path: salesRoutesEnum.sales,
    element: <SalesScreen />,
  },
];
