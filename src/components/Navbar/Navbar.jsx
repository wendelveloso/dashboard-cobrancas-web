import "./Navbar.css";
import {
  iconChargeBlack,
  iconChargePink,
  iconClientBlack,
  iconClientPink,
  iconHomeBlack,
  iconHomePink,
} from "../Icons/icons";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">
        <NavLink to="/home">
          {({ isActive }) => (
            <div className="logo-container">
              <img
                src={isActive ? iconHomePink : iconHomeBlack}
                className="logoHome"
                alt="logo home"
              />
              <div
                className={`correctionTop mark ${isActive ? "active" : ""}`}
              ></div>
            </div>
          )}
        </NavLink>
        <NavLink to="/clientes">
          {({ isActive }) => (
            <div className="logo-container">
              <img
                src={isActive ? iconClientPink : iconClientBlack}
                className="logoClientes"
                alt="logo clientes"
              />
              <div className={`mark ${isActive ? "active" : ""}`}></div>
            </div>
          )}
        </NavLink>
        <NavLink to="/cobrancas">
          {({ isActive }) => (
            <div className="logo-container">
              <img
                src={isActive ? iconChargePink : iconChargeBlack}
                className="logoCobrancas"
                alt="logo cobrancas"
              />
              <div className={`mark ${isActive ? "active" : ""}`}></div>
            </div>
          )}
        </NavLink>
      </div>
    </header>
  );
}
