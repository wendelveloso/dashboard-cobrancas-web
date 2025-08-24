import { Navigate } from "react-router-dom";
import { getItem } from "../utils/storage";

export function PrivateRoutes({ children }) {
  const token = getItem("token");

  if (!token) return <Navigate to="/unauthorized" replace />;
  return children;
}
