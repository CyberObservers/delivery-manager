import Dashboard from "./home/Dashboard";
import Home from "./home/Home";
import Login from "./auth/Login";
import NotFound from "./utils/NotFound";
import OrderMainPage from "./order/OrderMainPage";
import Profile from "./profile/Profile";
import Register from "./auth/Register";
import { withAuth, navAuth } from "./utils/WithAuth";

const routesConfig = [
  {
    path: "/home",
    component: withAuth(Home, "/login"),
    isProtected: true,
    needsBackground: true,
  },
  {
    path: "/delivery",
    component: withAuth(OrderMainPage, "/login"),
    isProtected: true,
    needsBackground: true,
  },
  {
    path: "/profile",
    component: withAuth(Profile, "/login"),
    isProtected: true,
    needsBackground: false,
  },
  {
    path: "/dashboard",
    component: withAuth(Dashboard, "/login"),
    isProtected: true,
    needsBackground: false,
  },
  {
    path: "/login",
    component: navAuth(Login, "/home"),
    isProtected: false,
    needsBackground: true,
  },
  {
    path: "/register",
    component: navAuth(Register, "/home"),
    isProtected: false,
    needsBackground: true,
  },
  {
    path: "/notfound",
    component: NotFound,
    isProtected: false,
    needsBackground: true,
  },
];

export default routesConfig;
export const defaultRoutePath = "/home";
export const notfoundRoutePath = "/notfound";
