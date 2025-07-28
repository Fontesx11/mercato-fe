import type { RouteObject } from 'react-router-dom';

import AdminScreen from './screens/adminScreen';

export const adminScreenRoutesEnum = {
  ADMIN: '/admin',
};

export const adminScreenRoutes: RouteObject[] = [
  {
    path: adminScreenRoutesEnum.ADMIN,
    element: <AdminScreen />,
  },
];
