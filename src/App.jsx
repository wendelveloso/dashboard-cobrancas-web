import { useLoading, LoadingProvider } from "./context/LoadingContext";
import { setGlobalLoadingSetter } from "./services/api";
import ModalLoading from "./components/ModalLoading/ModalLoading";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const { setLoading } = useLoading();

  setGlobalLoadingSetter(setLoading);

  return (
    <div className="container-app">
      <ModalLoading />
      <Navigate to="/login" replace />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <LoadingProvider>
      <App />
    </LoadingProvider>
  );
}
