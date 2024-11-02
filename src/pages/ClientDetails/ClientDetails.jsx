import "./ClientDetails.css";
import {
  iconTools,
  iconGlass,
  iconClient,
  iconTopDown,
  iconChargePlus,
  iconEdit,
  iconDelete,
} from "../../components/Icons/icons";
import Header from "../../components/Header/Header";
import { useState, useRef, useEffect } from "react";
import ModalFilter from "../../components/ModalFilter/ModalFilter";
import ModalChargeGeneric from "../../components/ModalChargeGeneric/ModalChargeGeneric";
import ModalClientGeneric from "../../components/ModalClientGeneric/ModalClientGeneric";
import { useModal } from "../../utils/useModal";

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

export default function ClientDetails({ title }) {
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

  const clientName = "Sara Lage Silva";
  return (
    <>
      {modalSecondOpen && (
        <ModalChargeGeneric
          title="Cadastro de Cobrança"
          modalRef={modalRef}
          onClose={onClose}
          handleToggleSecondModal={handleToggleSecondModal}
        />
      )}
      {modalTooltsOpen && (
        <ModalChargeGeneric
          title="Edição de Cobrança"
          modalRef={modalToolsRef}
          onClose={onClose}
          handleToggleSecondModal={handleToggleToolsModal}
        />
      )}
      {modalClientOpen && (
        <ModalClientGeneric
          title="Editar Cliente"
          modalRef={modalClientRef}
          onClose={onClose}
          handleToggleClientModal={handleToggleClientModal}
        />
      )}
      <div className="page__container">
        <Header
          title="Clientes"
          subTitle=" >    Detalhes do cliente"
          titleStyle2="header__subtitle"
          titleStyle="header__title--client"
        />
        <main className="main__container_client-details">
          <div className="list__clients-details">
            <div className="container1">
              <img src={iconClient} alt="icon-client" />
              <h2>{clientName}</h2>
            </div>
          </div>
          <div className="clients_container-data">
            <div className="first__header-data">
              <h3>Dados do cliente</h3>
              <button onClick={handleToggleClientModal} className="btn-data">
                Editar Cliente
              </button>
            </div>
            <div className="clients__header_info-data">
              <div className="clients__header_data">
                <p>E-mail*</p>
                <p>Telefone*</p>
                <p>CPF</p>
              </div>
              <div className="clients__data">
                <p>sarasilva@gmail.com</p>
                <p>71 9 9462 8654</p>
                <p>054 365 255 87</p>
              </div>
            </div>
            <div className="clients__header_info-data2">
              <div className="clients__header_data2">
                <p>Endereço*</p>
                <p>Bairro</p>
                <p>Complemento</p>
                <p>CEP</p>
                <p>Cidade</p>
                <p>UF</p>
              </div>
              <div className="clients__data2">
                <p>Rua das Cornélias, nº 512</p>
                <p>Oliveiras</p>
                <p>Ap: 502</p>
                <p>031 654 524 04</p>
                <p>Salvador</p>
                <p>BA</p>
              </div>
            </div>
          </div>
          <div className="clients_container-details">
            <div className="first__header-details">
              <h3>Cobranças do Cliente</h3>
              <button onClick={handleToggleSecondModal} className="btn-details">
                + Nova cobrança
              </button>
            </div>
            <div className="clients__header_info-details">
              <div className="ID_order-details">
                <img src={iconTopDown} alt="arrow-top-down" />
                <p>ID Cob.</p>
              </div>
              <div className="client_order-details">
                <img src={iconTopDown} alt="arrow-top-down" />
                <p>Data de venc.</p>
              </div>
              <p className="clients__header_info-valor">Valor</p>
              <p className="clients__header_info-status">Status</p>
              <p>Descrição</p>
            </div>
            <div className="clients__info_container-details">
              <div className="clients__info-details" >
                <p className="client__name_size-details">248563147</p>
                <p>26/01/2021</p>
                <p className="client__name_size-details">R$ 500,00</p>
                <p className={getStatusClass(client[1].status)}>
                  {client[1].status}
                </p>
                <p className="clients__desc_size-details">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti optio quibusdam, veniam provident similique deserunt
                  possimus quos quidem nisi assumenda culpa eius voluptas harum!
                  Expedita doloremque adipisci aut quisquam facilis.
                </p>
                <div className="icon_container-details">
                  <img className="btn-zoom" src={iconEdit} alt="icon-edit" onClick={handleToggleToolsModal}/>
                  <img className="btn-zoom" src={iconDelete} alt="icon-delete" />
                </div>
              </div>
            </div>
            <div className="clients__info_container-details">
              <div className="clients__info-details">
                <p className="client__name_size-details">248563147</p>
                <p>26/01/2021</p>
                <p className="client__name_size-details">R$ 5000,00</p>
                <p className={getStatusClass(client[2].status)}>
                  {client[2].status}
                </p>
                <p className="clients__desc_size-details">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti optio quibusdam, veniam provident similique deserunt
                  possimus quos quidem nisi assumenda culpa eius voluptas harum!
                  Expedita doloremque adipisci aut quisquam facilis.
                </p>
                <div className="icon_container-details">
                  <img src={iconEdit} alt="icon-delete" />
                  <img src={iconDelete} alt="icon-edit" />
                </div>
              </div>
            </div>
            <div className="clients__info_container-details">
              <div className="clients__info-details">
                <p className="client__name_size-details">248563147</p>
                <p>26/01/2021</p>
                <p className="client__name_size-details">R$ 500,00</p>
                <p className={getStatusClass(client[0].status)}>
                  {client[0].status}
                </p>
                <p className="clients__desc_size-details">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti optio quibusdam, veniam provident similique deserunt
                  possimus quos quidem nisi assumenda culpa eius voluptas harum!
                  Expedita doloremque adipisci aut quisquam facilis.
                </p>
                <div className="icon_container-details">
                  <img src={iconEdit} alt="icon-delete" />
                  <img src={iconDelete} alt="icon-edit" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
