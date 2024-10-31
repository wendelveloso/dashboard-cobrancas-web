import "./Client.css";
import {
  iconTools,
  iconGlass,
  iconClient,
  iconTopDown,
  iconChargePlus,
} from "../../components/Icons/icons";
import Header from "../../components/Header/Header";
import { useState, useRef, useEffect } from "react";
import ModalFilter from "../../components/ModalFilter/ModalFilter";
// import { NavLink } from "react-router-dom";

const client = [
  {
    status: "Em dia",
  },
  {
    status: "Inadimplente",
  },
];

export default function Home() {
  const getStatusClass = (status) => {
    switch (status) {
      case "Inadimplente":
        return "status-inadimplente";
      case "Em dia":
        return "status-emdia";
      default:
        return "";
    }
  };

  const modalRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleToggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
        {modalOpen && <ModalFilter ref={modalRef} onClose={closeModal} />}
      <div className="page__container">
        <Header title="Clientes" titleStyle="header__title--client" />
        <main className="main__container_client">
          <div className="list__clients">
            <div className="container1">
              <img src={iconClient} alt="icon-client" />
              <h2>Clientes</h2>
            </div>
            <div className="container2">
              <button className="btn">+ Adicionar cliente</button>
              <img
                src={iconTools}
                alt="icon-tools"
                className="icon-tools"
                onClick={handleToggleModal}
              />
              <div className="search-container">
                <input type="search" placeholder="Pesquisa" />
                <img
                  src={iconGlass}
                  alt="Ícone de busca"
                  className="icon-glass"
                />
              </div>
            </div>
          </div>
          <div className="clients_container">
            <div className="clients__header_info">
              <div className="client_order">
                <img src={iconTopDown} alt="arrow-top-down" />
                <p>Cliente</p>
              </div>
              <p>CPF</p>
              <p>E-mail</p>
              <p>Telefone</p>
              <p>Status</p>
              <p>Criar Cobrança</p>
            </div>
            <div className="clients__info_container">
              <div className="clients__info">
                <p className="client__name_size">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>054 365 255 87</p>
                <p className="client__email_size">
                  wendel.m.veloso@hotmail.com
                </p>
                <p>71 9 9462 8654</p>
                <p className={getStatusClass(client[1].status)}>
                  {client[1].status}
                </p>
                <img src={iconChargePlus} alt="icon-page-charge-plus" />
              </div>
              <div className="clients__info">
                <p className="client__name_size">
                  Wendel Mordfffffffffffffffffff
                </p>
                <p>054 365 255 87</p>
                <p className="client__email_size">
                  wendel.m.veloso@hotmail.com
                </p>
                <p>71 9 9462 8654</p>
                <p className={getStatusClass(client[0].status)}>
                  {client[0].status}
                </p>
                <img src={iconChargePlus} alt="icon-page-charge-plus" />
              </div>
              <div className="clients__info">
                <p className="client__name_size">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>054 365 255 87</p>
                <p className="client__email_size">sarasilva@cubos.io</p>
                <p>71 9 9462 8654</p>
                <p className={getStatusClass(client[1].status)}>
                  {client[1].status}
                </p>
                <img src={iconChargePlus} alt="icon-page-charge-plus" />
              </div>
              <div className="clients__info">
                <p className="client__name_size">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>054 365 255 87</p>
                <p className="client__email_size">sarasilva@cubos.io</p>
                <p>71 9 9462 8654</p>
                <p className={getStatusClass(client[1].status)}>
                  {client[1].status}
                </p>
                <img src={iconChargePlus} alt="icon-page-charge-plus" />
              </div>
              <div className="clients__info">
                <p className="client__name_size">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>054 365 255 87</p>
                <p className="client__email_size">sarasilva@cubos.io</p>
                <p>71 9 9462 8654</p>
                <p className={getStatusClass(client[1].status)}>
                  {client[1].status}
                </p>
                <img src={iconChargePlus} alt="icon-page-charge-plus" />
              </div>
              <div className="clients__info">
                <p className="client__name_size">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>054 365 255 87</p>
                <p className="client__email_size">sarasilva@cubos.io</p>
                <p>71 9 9462 8654</p>
                <p className={getStatusClass(client[0].status)}>
                  {client[0].status}
                </p>
                <img src={iconChargePlus} alt="icon-page-charge-plus" />
              </div>
              <div className="clients__info">
                <p className="client__name_size">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>054 365 255 87</p>
                <p className="client__email_size">sarasilva@cubos.io</p>
                <p>71 9 9462 8654</p>
                <p className={getStatusClass(client[1].status)}>
                  {client[1].status}
                </p>
                <img src={iconChargePlus} alt="icon-page-charge-plus" />
              </div>
              <div className="clients__info">
                <p className="client__name_size">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>054 365 255 87</p>
                <p className="client__email_size">sarasilva@cubos.io</p>
                <p>71 9 9462 8654</p>
                <p className={getStatusClass(client[1].status)}>
                  {client[1].status}
                </p>
                <img src={iconChargePlus} alt="icon-page-charge-plus" />
              </div>
              <div className="clients__info">
                <p className="client__name_size">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>054 365 255 87</p>
                <p className="client__email_size">sarasilva@cubos.io</p>
                <p>71 9 9462 8654</p>
                <p className={getStatusClass(client[0].status)}>
                  {client[0].status}
                </p>
                <img src={iconChargePlus} alt="icon-page-charge-plus" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
