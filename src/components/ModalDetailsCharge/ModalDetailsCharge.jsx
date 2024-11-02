import React from "react";
import "./ModalDetailsCharge.css";
import { iconClose, iconEyes, iconPaper } from "../Icons/icons";

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
export default function ModalDetailsCharge({
  handleToggleClientModal,
  modalClientRef,
  onClose,
  title,
}) {
  return (
    <div className="modal__container-details-charge">
      <div className="modal__box-details-charge" ref={modalClientRef}>
        <button
          className="icon_close-details-charge"
          onClick={handleToggleClientModal}
        >
          <img src={iconClose} alt="Fechar" />
        </button>
        <div className="header__container-details-charge">
          <img src={iconPaper} alt="icon_paper" />
          <h3>Detalhe da Cobrança</h3>
        </div>
        <div className="container__details-charge-info">
          <div className="details-charge-info">
            <p>Nome</p>
            <p>Sara Lage Silva</p>
          </div>
          <div className="details-charge-info">
            <p>Descrição</p>
            <p className="details-desc">
              Lorem ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
              ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem IpsumLorem
        IpsumLorem 
            </p>
          </div>
          <div className="container__details-charge-info-extra">
            <div className="details-charge-info-dif">
              <div className="container1-details">
                <p>Vencimento</p>
                <p>10/12/2021</p>
              </div>
              <div className="container2-details">
                <p>ID cobranças</p>
                <p>248563147</p>
              </div>
            </div>
            <div className="details-charge-info-dif">
              <div className="container1-details">
                <p>Valor</p>
                <p>R$ 300,00</p>
              </div>
              <div className="container2-details">
                <p>Status</p>
                <p className={getStatusClass(client[0].status)}>
                  {client[0].status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
