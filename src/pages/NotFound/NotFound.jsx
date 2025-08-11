import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="error-page-notfound">
      <h1>404</h1>
      <p>Página não encontrada</p>
      <Link className="error-link-notfound" to="/home">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
