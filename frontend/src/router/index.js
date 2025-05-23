import Basket from '../pages/Basket/Basket';
import Admin from '../pages/Admin/Admin';
import Shop from '../pages/Shop/Shop';
import Auth from '../pages/Auth/Auth';
import ProductPage from '../pages/ProductPage/ProductPage';
import Main from '../pages/Main/Main';
import FAQ from '../pages/FAQ/FAQ';
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
  PROFILE_ROUTE,
} from '../utils/consts';
import ChangeProduct from '../pages/Admin/AdminProducts/AdminProductCard/ChangeProduct/ChangeProduct';
import OrderDetailsPage from '../pages/Admin/OrderDetailsPage/OrderDetailsPage';
import AdminShops from '../pages/Admin/AdminShops/AdminShops';
import UserProfile from '../pages/UserProfile/UserProfile';
import AdminStat from '../pages/Admin/AdminStat/AdminStat';

export const authRoutes = [
  { path: BASKET_ROUTE, component: <Basket /> },
  { path: PROFILE_ROUTE, component: <UserProfile />, name: 'Профиль' },
  {
    path: PROFILE_ROUTE + '/orders',
    component: <UserProfile />,
    name: 'История заказов',
  },
];

export const adminRoutes = [
  { path: ADMIN_ROUTE, component: <Admin /> },
  {
    path: ADMIN_ROUTE + '/products',
    component: <Admin />,
    name: 'Товары',
  },
  {
    path: ADMIN_ROUTE + '/products/:id',
    component: <ChangeProduct />,
  },
  {
    path: ADMIN_ROUTE + '/category',
    component: <Admin />,
    name: 'Категории',
  },
  { path: ADMIN_ROUTE + '/orders', component: <Admin />, name: 'Заказы' },
  { path: ADMIN_ROUTE + '/shops', component: <Admin />, name: 'Магазины' },
  { path: ADMIN_ROUTE + '/orders/:id', component: <OrderDetailsPage /> },
  { path: ADMIN_ROUTE + '/stat', component: <Admin/>, name: 'Статистика' },
];

export const publicRoutes = [
  { path: FAQ_ROUTE, component: <FAQ /> },
  { path: MAIN_ROUTE, component: <Main /> },
  { path: SHOP_ROUTE, component: <Shop /> },
  { path: SHOP_ROUTE + '/:id', component: <Shop /> },
  { path: LOGIN_ROUTE, component: <Auth /> },
  { path: REGISTRATION_ROUTE, component: <Auth /> },
  // { path: PRODUCT_ROUTE + '/:id', component: <ProductPage /> },
];
