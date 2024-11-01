import React from "react";
import "./ModalChargeGeneric.css";
import { iconClose, iconEyes, iconPaper } from "../Icons/icons";

export default function ModalChargeGeneric({ onClose, modalRef, title }) {
  return (
    <div className="modal__container-register">
      <div ref={modalRef} className="modal__box-register">
        <button className="icon_close-register" onClick={onClose}>
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
              class="input__desc-register"
              rows="4"
              placeholder="Digite seu texto aqui..."
            ></textarea>

            {/* <input
              className="input__desc-register"
              type="text"
              placeholder="Digite a descrição"
              wrap="soft"
            /> */}
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
            <label for="opcoes">Status*</label>
            <label className="label__radio-register-charge">
              <input type="radio" name="option" value="1" />
              <span class="checkmark"></span>
              Cobrança Paga
            </label>
            <label className="label__radio-register-charge">
              <input type="radio" name="option" value="1" />
              <span class="checkmark"></span>
              Cobrança Pendente
            </label>
            <label className="label__radio-register-charge">
              <input type="radio" name="option" value="1" />
              <span class="checkmark"></span>
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
