import Basket from '../pages/Basket';
import Admin from '../pages/Admin/Admin';
import Shop from '../pages/Shop/Shop';
import Auth from '../pages/Auth/Auth';
import ProductPage from '../pages/ProductPage/ProductPage';
import Main from '../pages/Main';
import FAQ from '../pages/FAQ';
import About from '../pages/About';
import AdminProducts from '../pages/Admin/AdminProducts/AdminProducts';
import AdminCategory from '../pages/Admin/AdminCategory/AdminCategory';
import AdminOrders from '../pages/Admin/AdminOrders/AdminOrders';
import AdminOrder from '../pages/Admin/AdminOrder/AdminOrder';
import {
  ABOUT_ROUTE,
  MAIN_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  FAQ_ROUTE,
} from '../utils/consts';

export const authRoutes = [{ path: BASKET_ROUTE, component: <Basket /> }];

export const adminRoutes = [
  { path: ADMIN_ROUTE, component: <Admin /> },
  {
    path: ADMIN_ROUTE + '/products',
    component: <Admin />,
    name: 'Товары',
  },
  {
    path: ADMIN_ROUTE + '/category',
    component: <Admin />,
    name: 'Категории',
  },
  { path: ADMIN_ROUTE + '/orders', component: <Admin />, name: 'Заказы' },
  { path: ADMIN_ROUTE + '/orders/:id', component: <Admin /> },
];

export const publicRoutes = [
  { path: FAQ_ROUTE, component: <FAQ /> },
  { path: ABOUT_ROUTE, component: <About /> },
  { path: MAIN_ROUTE, component: <Main /> },
  { path: SHOP_ROUTE, component: <Shop /> },
  { path: SHOP_ROUTE + '/:id', component: <Shop /> },
  { path: LOGIN_ROUTE, component: <Auth /> },
  { path: REGISTRATION_ROUTE, component: <Auth /> },
  { path: PRODUCT_ROUTE + '/:id', component: <ProductPage /> },
];
