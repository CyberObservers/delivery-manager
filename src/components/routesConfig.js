import Dashboard from "./home/Dashboard";
import Home from "./home/Home";
import Login from "./auth/Login";
import NotFound from "./utils/NotFound";
import Order from "./order/Order";
import Profile from "./profile/Profile";
import Register from "./auth/Register";
import { withAuth, navAuth } from "./utils/WithAuth";

const routesConfig = [
  {
    path: "/home",
    component: withAuth(Home, "/login"),
    isProtected: true,
  },
  {
    path: "/order",
    component: withAuth(Order, "/login"),
    isProtected: true,
  },
  {
    path: "/profile",
    component: withAuth(Profile, "/login"),
    isProtected: true,
  },
  {
    path: "/dashboard",
    component: withAuth(Dashboard, "/login"),
    isProtected: true,
  },
  {
    path: "/login",
    component: navAuth(Login, "/home"),
    isProtected: false,
  },
  {
    path: "/register",
    component: navAuth(Register, "/home"),
    isProtected: false,
  },
  {
    path: "/notfound",
    component: NotFound,
    isProtected: false,
  },
];

export default routesConfig;
export const defaultRoutePath = "/home";
export const notfoundRoutePath = "/notfound";
