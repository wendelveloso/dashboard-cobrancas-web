import React from "react";
import "./ModalChargeGeneric.css";
import { iconClose, iconEyes, iconPaper } from "../Icons/icons";

export default function ModalChargeGeneric({
  handleToggleSecondModal,
  modalRef,
  onClose,
  title,
}) {
  return (
    <div className="modal__container-register">
      <div className="modal__box-register" ref={modalRef}>
        <button className="icon_close-register" onClick={handleToggleSecondModal}>
          <img src={iconClose} alt="Fechar" />
        </button>
        <div className="header__container-register">
          <img src={iconPaper} alt="icon_paper" />
          <h3>{title}</h3>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input__container-register">
            <label htmlFor="name">Nome*</label>
            <input type="text" placeholder="Digite seu nome" />
          </div>
          <div className="input__container-register">
            <label htmlFor="text">Descrição*</label>
            <textarea
              className="input__desc-register"
              rows="4"
              placeholder="Digite a descrição"
            ></textarea>
          </div>
          <div className="input__container-register-extra-wrapper">
            <div className="input__container-register-extra">
              <label htmlFor="date">Vencimento*</label>
              <input type="date" placeholder="Data de Vencimento" />
            </div>
            <div className="input__container-register-extra">
              <label htmlFor="number">Valor*</label>
              <input type="number" placeholder="Digite o valor" />
            </div>
          </div>
          <div className="input__container-register">
            <label htmlFor="opcoes">Status*</label>
            <label className="label__radio-register-charge">
              <input type="radio" name="option" value="1" />
              <span className="checkmark"></span>
              Cobrança Paga
            </label>
            <label className="label__radio-register-charge">
              <input type="radio" name="option" value="2" />
              <span className="checkmark"></span>
              Cobrança Pendente
            </label>
            <label className="label__radio-register-charge">
              <input type="radio" name="option" value="3" />
              <span className="checkmark"></span>
              Cobrança Vencida
            </label>
          </div>
          <div className="btn_group-register">
            <button className="btn__clean-register" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn__submit-register" type="submit">
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
