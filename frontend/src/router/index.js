import Basket from '../pages/Basket';
import Admin from '../pages/Admin';
import Shop from '../pages/Shop/Shop';
import Auth from '../pages/Auth/Auth';
import ProductPage from '../pages/ProductPage/ProductPage';
import Main from '../pages/Main';
import FAQ from '../pages/FAQ';
import About from '../pages/About';
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

export const authRoutes = [
  { path: BASKET_ROUTE, component: <Basket /> },
  { path: ADMIN_ROUTE, component: <Admin /> },
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
