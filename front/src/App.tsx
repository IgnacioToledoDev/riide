import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Home from "@/pages/Home"
import Layout from "./pages/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Payment } from "./pages/Payment"
import DashboardPage from "./pages/Dashboard"

interface RouteHandle {
  hideHeader?: boolean;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<Login />} handle={{ hideHeader: true} as RouteHandle} />
      <Route path="/register" element={<Register />} handle={{ hideHeader: true} as RouteHandle} />
      <Route path="/payment" element={<Payment />} handle={{ hideHeader: true} as RouteHandle} />
      <Route path="/dashboard" element={<DashboardPage />} handle={{ hideHeader: true} as RouteHandle} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
