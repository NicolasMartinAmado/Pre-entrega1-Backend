import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "./context/ContextUser"

const ProtectedRoute = () => {

  const { token } = useUserContext()

  if (!token) {
    return <Navigate to="/login" replace />
  }


  return (
    <Outlet />
  )
}

export default ProtectedRoute