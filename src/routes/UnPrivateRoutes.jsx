import { Navigate } from "react-router-dom";
import { getItem } from "../utils/storage";

export function UnPrivateRoutes({ children }) {
  const token = getItem("token");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
