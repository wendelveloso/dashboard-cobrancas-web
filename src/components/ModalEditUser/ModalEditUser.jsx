import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./ModalEditUser.css";
import { iconClose, iconEyes } from "../../components/Icons/icons";
import userSchema from "../../validations/userSchema";

export default function ModalEditUser({ onClose, modalRef }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = (data) => {
    console.log("Dados enviados:", data);
  };

  return (
    <div className="modal__container">
      <div ref={modalRef} className="modal__box">
        <button className="icon_close" onClick={onClose}>
          <img src={iconClose} alt="Fechar" />
        </button>
        <h3>Edite seus dados</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input__container">
            <label htmlFor="name">Nome*</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              {...register("name")}
              className={errors.name ? "error-border" : ""}
            />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
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

          <div className="input__container">
            <label htmlFor="password">Senha*</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
              className={errors.password ? "error-border" : ""}
            />
            <img src={iconEyes} alt="icon-eyes" className="eye-icon" />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="input__container">
            <label htmlFor="repeat-password">Repita a senha*</label>
            <input
              type="password"
              placeholder="Repita sua senha"
              {...register("repeatPassword")}
              className={errors.repeatPassword ? "error-border" : ""}
            />
            <img src={iconEyes} alt="icon-eyes" className="eye-icon" />
            {errors.repeatPassword && (
              <p className="error-message">{errors.repeatPassword.message}</p>
            )}
          </div>

          <button className="btn__submit" type="submit">
            Continuar
          </button>
        </form>
        <p>
          Já possui uma conta? Faça seu <a href="">Login</a>
        </p>
      </div>
    </div>
  );
}
