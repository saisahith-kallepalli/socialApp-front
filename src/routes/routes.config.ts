import { lazy } from "react";

// Lazy load your page components
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login/login"));
const forgotPassword = lazy(
  () => import("../pages/auth/forgot-password/forgot-password")
);
const resetPassword = lazy(
  () => import("../pages/auth/reset-password/reset-password")
);
const Signup = lazy(() => import("../pages/auth/signup/index"));
const Saved = lazy(() => import("../pages/saved/saved"));

/*
 * Route path: URLs
 */
export const paths = {
  home: "/home",
  login: "/auth/login",
  signup: "/auth/signup",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  saved: "/saved",
};

/*
 * Routes: path & lazy loaded component
 */
export const routes: any[] = [
  {
    path: paths.home,
    component: Home,
  },
  {
    path: paths.login,
    component: Login,
  },
  {
    path: paths.signup,
    component: Signup,
  },
  {
    path: paths.forgotPassword,
    component: forgotPassword,
  },
  {
    path: paths.resetPassword,
    component: resetPassword,
  },
  {
    path: paths.saved,
    component: Saved,
  },
];
