import type { RouteObject } from 'react-router-dom';

import RegisterScreen from './screens/register';

export const RegisterRoutesEnum = {
  REGISTER: '/register',
};

export const registerRoutes: RouteObject[] = [
  {
    path: RegisterRoutesEnum.REGISTER,
    element: <RegisterScreen />,
  },
];
