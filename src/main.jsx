import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUpContextProvider } from "./context/SignUpContext.jsx";
import { MenuSideBarColorProvider } from "./context/MenuSideBarColorContext.jsx";
import App from "./App.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import { UnPrivateRoutes } from "./routes/unPrivateRoutes.jsx";
import { AddClientContextProvider } from "./context/AddClienteContext.jsx";
import { ChargesContextProvider } from "./context/ChargesContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <UnPrivateRoutes>
            <Login />
          </UnPrivateRoutes>
        ),
      },
      {
        path: "/signup",
        element: (
          <UnPrivateRoutes>
            <SignUp />
          </UnPrivateRoutes>
        ),
      },
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
