import React from "react";
import "./ModalEditUser.css";
import { iconClose, iconEyes } from "../../components/Icons/icons";

export default function ModalEditUser({ onClose, modalRef }) {
  return (
    <div className="modal__container">
      <div ref={modalRef} className="modal__box">
        <button className="icon_close" onClick={onClose}>
          <img src={iconClose} alt="Fechar" />
        </button>
        <h3>Edite seus dados</h3>
        <form onSubmit="">
          <div className="input__container">
            <label htmlFor="name">Nome*</label>
            <input type="text" placeholder="Digite seu nome" />
          </div>
          <div className="input__container">
            <label htmlFor="email">E-mail*</label>
            <input type="email" placeholder="Digite seu e-mail" />
          </div>
          <div className="input__container">
            <label htmlFor="password">Senha*</label>
            <input type="password" placeholder="Digite sua senha" />
            <img src={iconEyes} alt="icon-eyes" className="eye-icon" />
          </div>
          <div className="input__container">
            <label htmlFor="repeat-password">Repita a senha*</label>
            <input type="password" placeholder="Repita sua senha" />
            <img src={iconEyes} alt="icon-eyes" className="eye-icon" />
          </div>
          <button className="btn__submit" type="submit">Continuar</button>
        </form>
        <p>
          Já possui uma conta? Faça seu <a href="">Login</a>
        </p>
      </div>
    </div>
  );
}

