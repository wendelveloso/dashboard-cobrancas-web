import "./ModalClientGeneric.css";
import api from "../../services/api";
import clientSchema from "../../validations/clientSchema";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { iconClose, iconClient } from "../Icons/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { exibirErro, exibirSucesso } from "../../utils/toast";

export default function ModalClientGeneric({
  handleToggleClientModal,
  modalClientRef,
  onClose,
  title,
  onAddClient,
  clienteParaEditar,
  modoEdicao,
  onSuccess,
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
    try {
      if (data.uf) {
        data.uf = data.uf.toUpperCase();
      }
      if (modoEdicao) {
        delete data.usuario_id;
        delete data.status;
        const response = await api.put(`/updateClient/${clientId}`, data);
        exibirSucesso("Cliente atualizado com sucesso!");
        const updatedClient = response.data;
        if (onSuccess) {
          await onSuccess();
        }
        onClose();
        onAddClient(updatedClient);
        reset();
      } else {
        const response = await api.post("/registerClient", data);
        exibirSucesso("Cliente adicionado com sucesso!");
        const newClient = response.data;
        if (onSuccess) {
          await onSuccess();
        }
        onClose();
        onAddClient(newClient);
        reset();
      }
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
                {...register("cpf", {
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/[.,;:\-_]/g, "");
                  },
                })}
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
                {...register("telefone", {
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/[.,;:\-_]/g, "");
                  },
                })}
                className={errors.telefone ? "error-border" : ""}
                placeholder="Digite o Telefone"
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
                type="text"
                {...register("cep", {
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/[.,;:\-_]/g, "");
                  },
                })}
                className={errors.cep ? "error-border" : ""}
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
