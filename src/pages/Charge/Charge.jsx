import "./Charge.css";
import {
  iconTools,
  iconGlass,
  iconTopDown,
  iconPaper,
  iconDelete,
  iconEdit,
} from "../../components/Icons/icons";
import Header from "../../components/Header/Header";
// import { NavLink } from "react-router-dom";

const client = [
  {
    status: "Paga",
  },
  {
    status: "Vencida",
  },
  {
    status: "Pendente",
  },
];

export default function Home() {
  const getStatusClass = (status) => {
    switch (status) {
      case "Vencida":
        return "status-vencida";
      case "Pendente":
        return "status-pendente";
      case "Paga":
        return "status-paga";
      default:
        return "";
    }
  };

  return (
    <div className="page__container">
      <Header title="Cobranças" titleStyle="header__title--charge" />
      <main className="main__container_charges">
        <div className="list__charges">
          <div className="container1">
            <img src={iconPaper} alt="icon-paper-charge" />
            <h2>Cobranças</h2>
          </div>
          <div className="container2">
            <img src={iconTools} alt="icon-tools" class="icon-tools" />
            <div class="search-container">
              <input type="search" placeholder="Pesquisa" />
              <img src={iconGlass} alt="Ícone de busca" class="icon-glass" />
            </div>
          </div>
        </div>
        <div className="charges_container">
          <div className="charges__header_info">
            <div className="client_order">
              <img src={iconTopDown} alt="arrow-top-down" />
              <p>Cliente</p>
            </div>
            <div className="ID_order">
              <img src={iconTopDown} alt="arrow-top-down" />
              <p>ID Cob.</p>
            </div>
            <p>Valor</p>
            <p>Data de venc.</p>
            <p>Status</p>
            <p>Descrição</p>
          </div>
          <div className="charges__info_container">
            <div className="charges__info">
              <p className="charges__name_size">Sara Silva</p>
              <p>248563147</p>
              <p>R$ 500,00</p>
              <p>26/01/2021</p>
              <p className={getStatusClass(client[0].status)}>
                {client[0].status}
              </p>
              <p className="charges__desc_size">ipsum lorem ipsum lorem lorem ipsumlorem ipsumlorem ipsumlorem ipsum... </p>
              <div className="icon_container">
                <img src={iconEdit} alt="icon-delete" />
                <img src={iconDelete} alt="icon-edit" />
              </div>
            </div>
            <div className="charges__info">
              <p className="charges__name_size">Wendel Moreira Velosodddfffggggg</p>
              <p>248563147</p>
              <p>R$ 500,00</p>
              <p>26/01/2021</p>
              <p className={getStatusClass(client[1].status)}>
                {client[1].status}
              </p>
              <p className="charges__desc_size">ipsum lorem ipsum lorem lorem ipsumlorem ipsumlorem ipsumlorem ipsum...</p>
              <div className="icon_container">
                <img src={iconEdit} alt="icon-delete" />
                <img src={iconDelete} alt="icon-edit" />
              </div>
            </div>
            <div className="charges__info">
              <p className="charges__name_size">Wendel Moreira Velosodddfffggggg</p>
              <p>248563147</p>
              <p>R$ 500,00</p>
              <p>26/01/2021</p>
              <p className={getStatusClass(client[2].status)}>
                {client[2].status}
              </p>
              <p className="charges__desc_size">ipsum lorem ipsum lorem lorem ipsumlorem ipsumlorem ipsumlorem ipsum...</p>
              <div className="icon_container">
                <img src={iconEdit} alt="icon-delete" />
                <img src={iconDelete} alt="icon-edit" />
              </div>
            </div>
            <div className="charges__info">
              <p className="charges__name_size">Wendel Moreira Velosodddfffggggg</p>
              <p>248563147</p>
              <p>R$ 500,00</p>
              <p>26/01/2021</p>
              <p className={getStatusClass(client[0].status)}>
                {client[0].status}
              </p>
              <p className="charges__desc_size">ipsum lorem ipsum lorem lorem ipsumlorem ipsumlorem ipsumlorem ipsum... </p>
              <div className="icon_container">
                <img src={iconEdit} alt="icon-delete" />
                <img src={iconDelete} alt="icon-edit" />
              </div>
            </div>
            <div className="charges__info">
              <p className="charges__name_size">Wendel Moreira Velosodddfffggggg</p>
              <p>248563147</p>
              <p>R$ 500,00</p>
              <p>26/01/2021</p>
              <p className={getStatusClass(client[1].status)}>
                {client[1].status}
              </p>
              <p className="charges__desc_size">ipsum lorem ipsum lorem lorem ipsumlorem ipsumlorem ipsumlorem ipsum... </p>
              <div className="icon_container">
                <img src={iconEdit} alt="icon-delete" />
                <img src={iconDelete} alt="icon-edit" />
              </div>
            </div>
            <div className="charges__info">
              <p className="charges__name_size">Wendel Moreira Velosodddfffggggg</p>
              <p>248563147</p>
              <p>R$ 500,00</p>
              <p>26/01/2021</p>
              <p className={getStatusClass(client[2].status)}>
                {client[2].status}
              </p>
              <p className="charges__desc_size">ipsum lorem ipsum lorem lorem ipsumlorem ipsumlorem ipsumlorem ipsum...</p>
              <div className="icon_container">
                <img src={iconEdit} alt="icon-delete" />
                <img src={iconDelete} alt="icon-edit" />
              </div>
            </div>
            <div className="charges__info">
              <p className="charges__name_size">Wendel Moreira Velosodddfffggggg</p>
              <p>248563147</p>
              <p>R$ 500,00</p>
              <p>26/01/2021</p>
              <p className={getStatusClass(client[1].status)}>
                {client[1].status}
              </p>
              <p className="charges__desc_size">ipsum lorem ipsum lorem lorem ipsumlorem ipsumlorem ipsumlorem ipsum... </p>
              <div className="icon_container">
                <img src={iconEdit} alt="icon-delete" />
                <img src={iconDelete} alt="icon-edit" />
              </div>
            </div>
            <div className="charges__info">
              <p className="charges__name_size">Wendel Moreira Velosodddfffggggg</p>
              <p>248563147</p>
              <p>R$ 500,00</p>
              <p>26/01/2021</p>
              <p className={getStatusClass(client[0].status)}>
                {client[0].status}
              </p>
              <p className="charges__desc_size">ipsum lorem ipsum lorem lorem ipsumlorem ipsumlorem ipsumlorem ipsum... </p>
              <div className="icon_container">
                <img src={iconEdit} alt="icon-delete" />
                <img src={iconDelete} alt="icon-edit" />
              </div>
            </div>
            <div className="charges__info">
              <p className="charges__name_size">Wendel Moreira Velosodddfffggggg</p>
              <p>248563147</p>
              <p>R$ 500,00</p>
              <p>26/01/2021</p>
              <p className={getStatusClass(client[1].status)}>
                {client[1].status}
              </p>
              <p className="charges__desc_size">ipsum lorem ipsum lorem lorem ipsumlorem ipsumlorem ipsumlorem ipsum...</p>
              <div className="icon_container">
                <img src={iconEdit} alt="icon-delete" />
                <img src={iconDelete} alt="icon-edit" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
