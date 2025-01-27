import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Home from "@/pages/Home"
import Layout from "./pages/Layout"
import Login from "./pages/Login"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
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
