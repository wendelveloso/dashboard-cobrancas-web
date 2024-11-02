import "./Client.css";
import {
  iconTools,
  iconGlass,
  iconClient,
  iconTopDown,
  iconChargePlus,
} from "../../components/Icons/icons";
import Header from "../../components/Header/Header";
import ModalFilter from "../../components/ModalFilter/ModalFilter";
import { useModal } from "../../utils/useModal";
import ModalChargeGeneric from "../../components/ModalChargeGeneric/ModalChargeGeneric";
import ModalClientGeneric from "../../components/ModalClientGeneric/ModalClientGeneric";
import { NavLink } from "react-router-dom";

const client = [{ status: "Em dia" }, { status: "Inadimplente" }];

export default function Client({ title }) {
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

  const {
    modalToolsRef,
    modalRef,
    modalClientRef,
    modalTooltsOpen,
    modalSecondOpen,
    modalClientOpen,
    handleToggleToolsModal,
    handleToggleSecondModal,
    handleToggleClientModal,
    onClose,
  } = useModal();

  return (
    <>
      {modalTooltsOpen && (
        <ModalFilter modalRef={modalToolsRef} onClose={onClose} />
      )}
      {modalSecondOpen && (
        <ModalChargeGeneric
          title="Cadastro de Cobrança"
          modalRef={modalRef}
          onClose={onClose}
          handleToggleSecondModal={handleToggleSecondModal}
        />
      )}
      {modalClientOpen && (
        <ModalClientGeneric
          title="Cadastro do Cliente"
          modalRef={modalClientRef}
          onClose={onClose}
          handleToggleClientModal={handleToggleClientModal}
        />
      )}
      <div className="page__container">
        <Header title="Clientes" titleStyle="header__title--client" />
        <main className="main__container_client">
          <div className="list__clients">
            <div className="container1">
              <img src={iconClient} alt="icon-client" />
              <h2>Clientes</h2>
            </div>
            <div className="container2">
              <button onClick={handleToggleClientModal} className="btn">
                + Adicionar cliente
              </button>
              <img
                src={iconTools}
                alt="icon-tools"
                className="icon-tools btn-zoom"
                onClick={handleToggleToolsModal}
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
              {client.map((cliente, index) => (
                <NavLink
                  key={index}
                  to="/clientes/detalhes"
                  className="clients__info"
                >
                  <p className="client__name_size">Nome do Cliente</p>
                  <p>054 365 255 87</p>
                  <p className="client__email_size">email@exemplo.com</p>
                  <p>71 9 9462 8654</p>
                  <p className={getStatusClass(cliente.status)}>
                    {cliente.status}
                  </p>
                  <img
                    className="btn-zoom"
                    src={iconChargePlus}
                    alt="icon-page-charge-plus"
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggleSecondModal();
                    }}
                  />
                </NavLink>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
