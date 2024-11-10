import React from "react";
import "./ModalDetailsCharge.css";
import { iconClose, iconPaper } from "../Icons/icons";
import { formatarValor, formatarData } from "../../utils/formatting";


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
  cobranca,
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
            <p>{cobranca.nome}</p>
          </div>
          <div className="details-charge-info">
            <p>Descrição</p>
            <p className="details-desc">{cobranca.descricao}</p>
          </div>
          <div className="container__details-charge-info-extra">
            <div className="details-charge-info-dif">
              <div className="container1-details">
                <p>Vencimento</p>
                <p>{formatarData(cobranca.data_venc)}</p>
              </div>
              <div className="container2-details">
                <p>ID cobranças</p>
                <p>{cobranca.id_cob}</p>
              </div>
            </div>
            <div className="details-charge-info-dif">
              <div className="container1-details">
                <p>Valor</p>
                <p>R$ {formatarValor(cobranca.valor)}</p>
              </div>
              <div className="container2-details">
                <p>Status</p>
                <span className={getStatusClass(cobranca.status)}>
                  {cobranca.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
