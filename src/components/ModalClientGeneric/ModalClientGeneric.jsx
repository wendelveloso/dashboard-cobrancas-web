import React from "react";
import "./ModalClientGeneric.css";
import { iconClose, iconClient } from "../Icons/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import clientSchema from "../../validations/clientSchema";

export default function ModalClientGeneric({
  handleToggleClientModal,
  modalClientRef,
  onClose,
  title,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clientSchema),
  });

  const onSubmit = (data) => {
    console.log("Dados do formulário:", data);
  };
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input__container-client">
            <label htmlFor="name">Nome*</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Digite seu nome"
              className={errors.name ? 'error-border' : ''}
            />
          </div>
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          <div className="input__container-client">
            <label htmlFor="text">E-mail*</label>
            <input
              type="text"
              {...register("email")}
              placeholder="Digite o e-mail"
              className={errors.email ? 'error-border' : ''}
            />
          </div>
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          <div className="input__container-client-extra-wrapper">
            <div className="input__container-client-extra">
              <label htmlFor="number">CPF:*</label>
              <input
                type="text"
                {...register("cpf")}
                placeholder="Digite o CPF"
                className={errors.cpf ? 'error-border' : ''}
                />
                {errors.cpf && (
                  <p className="error-message">{errors.cpf.message}</p>
                )}
            </div>
            <div className="input__container-client-extra">
              <label htmlFor="number">Telefone:*</label>
              <input
                type="text"
                {...register("telefone")}
                placeholder="Digite o telefone"
                className={errors.telefone ? 'error-border' : ''}
              />
              {errors.telefone && (
                <p className="error-message">{errors.telefone.message}</p>
              )}
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
