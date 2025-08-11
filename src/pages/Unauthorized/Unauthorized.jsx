import { Link } from "react-router-dom";
import "./Unauthorized.css";

export default function Unauthorized() {
  return (
    <div className="error-page-unauthorized">
      <h1>403</h1>
      <p>Você não tem permissão para acessar esta página</p>
      <Link className="error-link-unauthorized" to="/">
        Fazer login
      </Link>
    </div>
  );
}
