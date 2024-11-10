import React, { useEffect } from "react";
import "./ModalClientGeneric.css";
import { iconClose, iconClient } from "../Icons/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import clientSchema from "../../validations/clientSchema";
import api from "../../services/api";
import { exibirErro, exibirSucesso } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

export default function ModalClientGeneric({
  handleToggleClientModal,
  modalClientRef,
  onClose,
  title,
  onAddClient,
  clienteParaEditar,
  modoEdicao,
  fetchClients,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clientSchema),
  });

  useEffect(() => {
    if (modoEdicao && clienteParaEditar) {
      for (const [key, value] of Object.entries(clienteParaEditar)) {
        setValue(key, value);
      }
    }
  }, [modoEdicao, clienteParaEditar, setValue]);
  const { clientId } = useParams();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = modoEdicao;
      delete data.usuario_id;
      delete data.status
        ? await api.put(`/updateClient/${clientId}`, data)
        : await api.post("/registerClient", data);

      const newClient = response.data;
      onAddClient(newClient);
      localStorage.setItem(
        "successMessage",
        modoEdicao
          ? "Edições do cadastro concluídas com sucesso"
          : "Cadastro concluído com sucesso"
      );
      reset();
      fetchClients();
      onClose();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          const mensagemErro = error.response.data.mensagem;
          if (mensagemErro.includes("e-mail")) {
            setError("email", { type: "manual", message: mensagemErro });
          }

          if (mensagemErro.includes("cpf")) {
            setError("cpf", { type: "manual", message: mensagemErro });
          }
        }
        if (error.response.status === 500) {
          console.log(error);
          
          exibirErro("Erro inesperado. Tente novamente mais tarde.");
        }
      }
    }
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
            <label htmlFor="nome">Nome*</label>
            <input
              type="text"
              {...register("nome")}
              className={errors.nome ? "error-border" : ""}
              placeholder="Digite seu nome"
            />
          </div>
          {errors.nome && (
            <p className="error-message">{errors.nome.message}</p>
          )}
          <div className="input__container-client">
            <label htmlFor="email">E-mail*</label>
            <input
              type="email"
              {...register("email")}
              className={errors.email ? "error-border" : ""}
              placeholder="Digite o e-mail"
            />
          </div>
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
          <div className="input__container-client-extra-wrapper">
            <div className="input__container-client-extra">
              <label htmlFor="cpf">CPF:*</label>
              <input
                type="text"
                {...register("cpf")}
                className={errors.cpf ? "error-border" : ""}
                placeholder="Digite o CPF"
              />
              {errors.cpf && (
                <p className="error-message">{errors.cpf.message}</p>
              )}
            </div>
            <div className="input__container-client-extra">
              <label htmlFor="text">Telefone:*</label>
              <input
                type="text"
                {...register("telefone")}
                className={errors.telefone ? "error-border" : ""}
                placeholder="Digite o telefone"
              />
              {errors.telefone && (
                <p className="error-message">{errors.telefone.message}</p>
              )}
            </div>
          </div>
          <div className="input__container-client">
            <label htmlFor="name">Endereço</label>
            <input
              {...register("endereco")}
              type="text"
              placeholder="Digite o endereço"
            />
          </div>
          <div className="input__container-client">
            <label htmlFor="name">Complemento</label>
            <input
              {...register("complemento")}
              type="text"
              placeholder="Digite o complemento"
            />
          </div>
          <div className="input__container-client-extra-wrapper">
            <div className="input__container-client-extra">
              <label htmlFor="text">CEP:</label>
              <input
                {...register("cep")}
                type="text"
                placeholder="Digite o CEP"
              />
               {errors.cep && (
                <p className="error-message">{errors.cep.message}</p>
              )}
            </div>
            <div className="input__container-client-extra">
              <label htmlFor="text">Bairro:</label>
              <input
                {...register("bairro")}
                type="text"
                placeholder="Digite o bairro"
              />
            </div>
          </div>
          <div className="input__container-client-extra-wrapper">
            <div className="input__container-client-extra input__city">
              <label htmlFor="text">Cidade</label>
              <input
                {...register("cidade")}
                type="text"
                placeholder="Digite a cidade"
              />
            </div>
            <div className="input__container-client-extra">
              <label htmlFor="uf">UF</label>
              <input
                {...register("uf")}
                type="text"
                placeholder="Digite a UF"
              />
              {errors.uf && (
                <p className="error-message">{errors.uf.message}</p>
              )}
            </div>
          </div>
          <div className="btn_group-client">
            <button
              className="btn__clean-client"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              Cancelar
            </button>
            <button className="btn__submit-client" type="submit">
              Continuar
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
