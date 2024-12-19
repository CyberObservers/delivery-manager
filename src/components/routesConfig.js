import Dashboard from "./home/Dashboard";
import Home from "./home/Home";
import Login from "./auth/Login";
import NotFound from "./utils/NotFound";
import OrderMainPage from "./order/OrderMainPage";
import Profile from "./profile/Profile";
import Register from "./auth/Register";
import { withAuth, navAuth } from "./utils/WithAuth";
import MakeOrder from "./order/MakeOrder";
import ManageOrder from "./order/ManageOrder";

const routesConfig = [
  {
    path: "/home",
    component: withAuth(Home, "/login"),
    showOnBar: true,
    needsBackground: true,
  },
  {
    path: "/delivery",
    component: withAuth(OrderMainPage, "/login"),
    showOnBar: true,
    needsBackground: true,
  },
  {
    path: "/profile",
    component: withAuth(Profile, "/login"),
    showOnBar: true,
    needsBackground: false,
  },
  {
    path: "/dashboard",
    component: withAuth(Dashboard, "/login"),
    showOnBar: true,
    needsBackground: false,
  },
  {
    path: "/login",
    component: navAuth(Login, "/home"),
    showOnBar: false,
    needsBackground: true,
  },
  {
    path: "/register",
    component: navAuth(Register, "/home"),
    showOnBar: false,
    needsBackground: true,
  },
  {
    path: "/notfound",
    component: NotFound,
    showOnBar: false,
    needsBackground: true,
  },
  {
    path: "/delivery/order",
    component: MakeOrder,
    showOnBar: false,
    needsBackground: false,
  },
  {
    path: "/delivery/manage",
    component: ManageOrder,
    showOnBar: false,
    needsBackground: false,
  },
];

export default routesConfig;
export const defaultRoutePath = "/home";
export const notfoundRoutePath = "/notfound";
