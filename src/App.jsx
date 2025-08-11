import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="container-app">
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
