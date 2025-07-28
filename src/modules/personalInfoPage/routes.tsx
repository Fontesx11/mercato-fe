import type { RouteObject } from 'react-router-dom';

import PersonalInfoPage from './personal-info-page';

export const personalInfoRoutesEnum = {
  PERSONAL: '/personal-info',
};

export const personalInfoScreenRoutes: RouteObject[] = [
  {
    path: personalInfoRoutesEnum.PERSONAL,
    element: <PersonalInfoPage />,
  },
];
