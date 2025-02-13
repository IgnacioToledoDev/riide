import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { Payment } from "@/pages/Payment";
import DashboardPage from "@/pages/Dashboard";
import ForgotPasswordPage from "@/pages/ResetPassword";
import ResetPasswordPage from "@/pages/ForgotPassword";
import NotFound from "@/pages/NotFound";

interface RouteHandle {
  hideHeader?: boolean;
  showLogo?: boolean;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Home />} />
      <Route
        path="/login"
        element={<Login />}
        handle={{ hideHeader: true } as RouteHandle}
      />
      <Route
        path="/signup"
        element={<Register />}
        handle={{ hideHeader: true } as RouteHandle}
      />
      <Route
        path="/payment"
        element={<Payment />}
        handle={{ hideHeader: true } as RouteHandle}
      />
      <Route
        path="/dashboard"
        element={<DashboardPage />}
        handle={{ hideHeader: true } as RouteHandle}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
        handle={{ hideHeader: true } as RouteHandle}
      />
      <Route
        path="/reset-password"
        element={<ResetPasswordPage />}
        handle={{ hideHeader: true } as RouteHandle}
      />
      <Route
        path="*"
        element={<NotFound />}
        handle={{ hideHeader: true } as RouteHandle}
      />
    </Route>
  )
);

export default router;
