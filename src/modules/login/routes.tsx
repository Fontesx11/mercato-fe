import type { RouteObject } from 'react-router-dom';

import LoginScreenM from './screens/LoginScreenM';

export const LoginRoutesEnum = {
  LOGIN: '/',
};

export const loginRoutes: RouteObject[] = [
  {
    path: LoginRoutesEnum.LOGIN,
    element: <LoginScreenM />,
  },
];
