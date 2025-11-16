import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import Layout from "./components/layout/Layout/Layout"
import Login from "./pages/Login/Login"
import Index from "./pages/Index/Index"
import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore"

export default function App() {
  const { checkIsLoggedIn, userData } = useAuthStore()

  useEffect(() => {
    checkIsLoggedIn()
  }, [checkIsLoggedIn])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
        </Route>
        {!userData && <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
        </Route>}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}