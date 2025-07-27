import { useEffect } from 'react';
import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router-dom';

import { homeScreenRoutes } from './modules/home/routes';
import { loginRoutes } from './modules/login/routes';
import { paymentRoutes } from './modules/payment/routes';
import { productScreenRoutes } from './modules/product/routes';
import { registerRoutes } from './modules/register/routes';
import { URL_USER } from './shared/constants/urls';
import { MethodsEnum } from './shared/enums/methods.enum';
import { verifyLoggedIn } from './shared/functions/connection/auth';
import { useGlobalContext } from './shared/hooks/useGlobalContext';
import { useNotification } from './shared/hooks/useNotifcation';
import { useRequest } from './shared/hooks/useResquest';

const routes: RouteObject[] = [...loginRoutes, ...paymentRoutes];
const routesLoggedIn: RouteObject[] = [
  ...homeScreenRoutes,
  ...productScreenRoutes,
  ...paymentRoutes,
].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router = createBrowserRouter([...routes, ...routesLoggedIn, ...registerRoutes]);

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
