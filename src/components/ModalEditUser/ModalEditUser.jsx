import React, { useState } from "react";
import "./ModalEditUser.css";
import userSchema from "../../validations/userSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { iconClose, iconEyes } from "../../components/Icons/icons";
import api from "../../services/api.js";

export default function ModalEditUser({ onClose, modalRef, onAddUser }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data) => {
    delete data.repetirSenha;
    if (!data.cpf) {
      delete data.cpf;
    }
    if (!data.senha) {
      delete data.senha;
    }
    if (!data.telefone) {
      delete data.telefone;
    }
    try {
      const response = await api.patch("/updateUser", data);

      onClose();      
      onAddUser(response.data.usuario.nome);
      reset();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          const mensagemErro = error.response.data.mensagem;
          if (mensagemErro.includes("Email")) {
            setError("email", { type: "manual", message: mensagemErro });
          }

          if (mensagemErro.includes("CPF")) {
            setError("cpf", { type: "manual", message: mensagemErro });
          }
          if (mensagemErro.includes("@")) {
            setError("senha", { type: "manual", message: mensagemErro });
          }
        }
      } else {
        setError("form", {
          type: "manual",
          message: "Erro inesperado. Tente novamente mais tarde.",
        });
      }
    }
  };

  return (
    <div className="modal__container">
      <div ref={modalRef} className="modal__box">
        <button className="icon_close" onClick={onClose}>
          <img src={iconClose} alt="Fechar" />
        </button>
        <h3>Edite seu cadastro</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input__container">
            <label htmlFor="nome">Nome*</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              {...register("nome")}
              className={errors.nome ? "error-border" : ""}
            />
            {errors.nome && (
              <p className="error-message">{errors.nome.message}</p>
            )}
          </div>
          <div className="input__container">
            <label htmlFor="email">E-mail*</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              {...register("email")}
              className={errors.email ? "error-border" : ""}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="input__container-user-extra-wrapper">
            <div className="input__container-user-extra">
              <label htmlFor="number">CPF</label>
              <input
                type="text"
                {...register("cpf")}
                placeholder="Digite seu CPF"
                className={errors.cpf ? "error-border" : ""}
              />
              {errors.cpf && (
                <p className="error-message">{errors.cpf.message}</p>
              )}
            </div>
            <div className="input__container-user-extra">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                {...register("telefone")}
                placeholder="Digite seu Telefone"
                className={errors.telefone ? "error-border" : ""}
              />
              {errors.telefone && (
                <p className="error-message">{errors.telefone.message}</p>
              )}
            </div>
          </div>
          <div className="input__container">
            <label htmlFor="senha">Nova Senha*</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              {...register("senha")}
              className={errors.senha ? "error-border" : ""}
            />
            <img
              onClick={() => setShowPassword(!showPassword)}
              src={iconEyes}
              alt="icon-eyes"
              className="eye-icon"
            />
            {errors.senha && (
              <p className="error-message">{errors.senha.message}</p>
            )}
          </div>

          <div className="input__container">
            <label htmlFor="repetirSenha">Confirmar Senha*</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Repita sua senha"
              {...register("repetirSenha")}
              className={errors.repetirSenha ? "error-border" : ""}
            />
            <img
              onClick={() => setShowPassword(!showPassword)}
              src={iconEyes}
              alt="icon-eyes"
              className="eye-icon"
            />
            {errors.repetirSenha && (
              <p className="error-message">{errors.repetirSenha.message}</p>
            )}
          </div>

          <button className="btn__submit" type="submit">
            Aplicar
          </button>
        </form>
      </div>
    </div>
  );
}
