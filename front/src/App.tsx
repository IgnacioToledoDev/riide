import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Home from "@/pages/Home"
import Layout from "./pages/Layout"
import Login from "./pages/Login"

interface RouteHandle {
  hideHeader?: boolean;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<Login />} handle={{ hideHeader: true} as RouteHandle} />
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
