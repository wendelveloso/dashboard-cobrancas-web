import { Link } from "react-router-dom";
import { getItem } from "../../utils/storage";

export default function NotFound() {
  const token = getItem("token");

  return (
    <div className="error-page-notfound">
      <h1>404</h1>
      <p>Página não encontrada</p>
      <Link to={token ? "/home" : "/login"}>Voltar para uma página válida</Link>
    </div>
  );
}
