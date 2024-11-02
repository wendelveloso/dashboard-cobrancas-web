import React from "react";
import "./ModalClientGeneric.css";
import { iconClose, iconClient } from "../Icons/icons";

export default function ModalClientGeneric({
  handleToggleClientModal,
  modalClientRef,
  onClose,
  title,
}) {
  return (
    <div className="modal__container-client">
      <div className="modal__box-client" ref={modalClientRef}>
        <button className="icon_close-client" onClick={handleToggleClientModal}>
          <img src={iconClose} alt="Fechar" />
        </button>
        <div className="header__container-client">
          <img src={iconClient} alt="icon_paper" />
          <h3>{title}</h3>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input__container-client">
            <label htmlFor="name">Nome*</label>
            <input type="text" placeholder="Digite o nome" />
          </div>
          <div className="input__container-client">
            <label htmlFor="text">E-mail*</label>
            <input type="email" placeholder="Digite o e-mail" />
          </div>
          <div className="input__container-client-extra-wrapper">
            <div className="input__container-client-extra">
              <label htmlFor="number">CPF:*</label>
              <input type="number" placeholder="Digite o CPF" />
            </div>
            <div className="input__container-client-extra">
              <label htmlFor="number">Telefone:*</label>
              <input type="number" placeholder="Digite o Telefone" />
            </div>
          </div>
          <div className="input__container-client">
            <label htmlFor="name">Endereço</label>
            <input type="text" placeholder="Digite o endereço" />
          </div>
          <div className="input__container-client">
            <label htmlFor="name">Complemento</label>
            <input type="text" placeholder="Digite o complemento" />
          </div>
          <div className="input__container-client-extra-wrapper">
            <div className="input__container-client-extra">
              <label htmlFor="text">CEP:</label>
              <input type="text" placeholder="Digite o CEP" />
            </div>
            <div className="input__container-client-extra">
              <label htmlFor="text">Bairro:</label>
              <input type="text" placeholder="Digite o bairro" />
            </div>
          </div>
          <div className="input__container-client-extra-wrapper">
            <div className="input__container-client-extra input__city">
              <label htmlFor="text">Cidade</label>
              <input type="text" placeholder="Digite a cidade" />
            </div>
            <div className="input__container-client-extra">
              <label htmlFor="text">UF</label>
              <input type="text" placeholder="Digite a UF" />
            </div>
          </div>
          <div className="btn_group-client">
            <button className="btn__clean-client" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn__submit-client" type="submit">
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
