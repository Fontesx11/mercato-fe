import type { RouteObject } from 'react-router-dom';

import HomeScreen from './screens/homeScreen';

export const homeScreenRoutesEnum = {
  HOME: '/home',
};

export const homeScreenRoutes: RouteObject[] = [
  {
    path: homeScreenRoutesEnum.HOME,
    element: <HomeScreen />,
  },
];
