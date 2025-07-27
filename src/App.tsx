import { useEffect } from 'react';
import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router-dom';

import { MainLayout } from './components/layout/MainLayout';
import { adminScreenRoutes } from './modules/admin/routes';
import { homeScreenRoutes } from './modules/home/routes';
import { loginRoutes } from './modules/login/routes';
import { paymentRoutes } from './modules/payment/routes';
import { productScreenRoutes } from './modules/product/routes';
import { registerRoutes } from './modules/register/routes';
import { URL_USER } from './shared/constants/urls';
import { MethodsEnum } from './shared/enums/methods.enum';
import { useGlobalContext } from './shared/hooks/useGlobalContext';
import { useNotification } from './shared/hooks/useNotifcation';
import { useRequest } from './shared/hooks/useResquest';

const routesWithLayout: RouteObject[] = [
  ...homeScreenRoutes,
  ...productScreenRoutes,
  ...paymentRoutes,
];

const router = createBrowserRouter([
  // Rotas (sem Header/Footer)
  ...loginRoutes,
  ...registerRoutes,
  ...adminScreenRoutes,

  // Rota de Layout: envolve as outras rotas
  {
    //loader: verifyLoggedIn,
    element: <MainLayout />,
    children: routesWithLayout,
  },
]);

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalContext();
  const { request } = useRequest();

  useEffect(() => {
    request(URL_USER, MethodsEnum.GET, setUser);
  }, []);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
