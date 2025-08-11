import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Charge from "./pages/Charge/Charge.jsx";
import Client from "./pages/Client/Client.jsx";
import ClientDetails from "./pages/ClientDetails/ClientDetails.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NotFound from "./pages/NotFound/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUpContextProvider } from "./context/SignUpContext.jsx";
import { MenuSideBarColorProvider } from "./context/MenuSideBarColorContext.jsx";
import { AddClientContextProvider } from "./context/AddClienteContext.jsx";
import { ChargesContextProvider } from "./context/ChargesContext.jsx";
import { UnPrivateRoutes } from "./routes/UnPrivateRoutes";
import { PrivateRoutes } from "./routes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      
      { path: "/", element: <UnPrivateRoutes><Login /></UnPrivateRoutes> },
      { path: "/signUp", element: <UnPrivateRoutes><SignUp /></UnPrivateRoutes> },

      { path: "/home", element: <PrivateRoutes><><Navbar /><Home /></></PrivateRoutes> },
      { path: "/clientes", element: <PrivateRoutes><><Navbar /><Client /></></PrivateRoutes> },
      { path: "/clientes/detalhes/:clientId", element: <PrivateRoutes><><Navbar /><ClientDetails /></></PrivateRoutes> },
      { path: "/cobrancas", element: <PrivateRoutes><><Navbar /><Charge /></></PrivateRoutes> },

      { path: "/unauthorized", element: <Unauthorized /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SignUpContextProvider>
      <MenuSideBarColorProvider>
        <AddClientContextProvider>
          <ChargesContextProvider>
            <RouterProvider router={router} />
          </ChargesContextProvider>
        </AddClientContextProvider>
      </MenuSideBarColorProvider>
    </SignUpContextProvider>
  </React.StrictMode>
);
