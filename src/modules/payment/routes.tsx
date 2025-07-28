import type { RouteObject } from 'react-router-dom';

import PaymentScreen from './screens/paymentScreen';

export const PaymentRoutesEnum = {
  PAYMENT: '/payment',
};

export const paymentRoutes: RouteObject[] = [
  {
    path: PaymentRoutesEnum.PAYMENT,
    element: <PaymentScreen />,
  },
];
