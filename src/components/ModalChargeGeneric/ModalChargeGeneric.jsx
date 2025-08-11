import "./ModalChargeGeneric.css";
import api from "../../services/api";
import chargeSchema from "../../validations/chargeSchema";
import { format } from "date-fns";
import { iconClose, iconPaper } from "../Icons/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { exibirSucesso, exibirErro  } from "../../utils/toast";

export default function ModalChargeGeneric({
  handleToggleSecondModal,
  modalRef,
  onClose,
  charge,
  title,
  selectedClientNome,
  selectedClientId,
  onSuccess,
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(chargeSchema),
    defaultValues: {
      nome: charge?.nome || selectedClientNome || "",
      valor: charge?.valor || "",
      data_venc: charge?.data_venc
        ? format(new Date(charge?.data_venc), "yyyy-MM-dd")
        : "",
      status: charge?.status || "",
      descricao: charge?.descricao || "",
    },
  });

  const { clientId } = useParams();
  const onSubmit = async (data) => {
    try {
      if (!charge) {
        delete data.nome;
        const requestData = {
          ...data,
          cliente_id: selectedClientId || clientId || charge.id,
        };
        await api.post("/addCharge", requestData);
        exibirSucesso("Cobrança adicionada com sucesso!");
      } else {
        delete data.nome;
        const requestData = {
          ...data,
          cliente_id: clientId || selectedClientId || charge.id,
          id_cob: charge.id_cob,
        };

        await api.put("/updateCharge", requestData);
        exibirSucesso("Cobrança atualizada com sucesso!");
      }

      if (onSuccess) {
        await onSuccess();
      }
      onClose();
      reset();
    } catch (error) {
      exibirErro("Não foi possível salvar a cobrança. Por favor, tente novamente.");

      if (error.response) {
        if (error.response.status === 400) {
          const mensagemErro = error.response.data.mensagem;
          if (mensagemErro.includes("e-mail")) {
            setError("email", { type: "manual", message: mensagemErro });
          }

          if (mensagemErro.includes("CPF")) {
            setError("cpf", { type: "manual", message: mensagemErro });
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
    <div className="modal__container-register">
      <div className="modal__box-register" ref={modalRef}>
        <button
          className="icon_close-register"
          onClick={handleToggleSecondModal}
        >
          <img src={iconClose} alt="Fechar" />
        </button>
        <div className="header__container-register">
          <img src={iconPaper} alt="icon_paper" />
          <h3>{title}</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input__container-register">
            <label htmlFor="nome">Nome*</label>
            <input
              type="text"
              disabled
              {...register("nome")}
              placeholder="Digite seu nome"
              className={errors.nome ? "error-border" : ""}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>
          <div className="input__container-register">
            <label htmlFor="text">Descrição*</label>
            <textarea
              className={`input__desc-register ${
                errors.descricao ? "error-border" : ""
              }`}
              rows="4"
              {...register("descricao")}
              placeholder="Digite a descrição"
            ></textarea>
            {errors.descricao && (
              <p className="error-message">{errors.descricao.message}</p>
            )}
          </div>
          <div className="input__container-register-extra-wrapper">
            <div className="input__container-register-extra">
              <label htmlFor="date">Vencimento*</label>
              <input
                type="date"
                {...register("data_venc")}
                placeholder="Digite o valor"
                className={errors.data_venc ? "error-border" : ""}
              />
              {errors.vencimento && (
                <p className="error-message">{errors.vencimento.message}</p>
              )}
            </div>
            <div className="input__container-register-extra">
              <label htmlFor="number">Valor*</label>
              <input
                type="number"
                {...register("valor")}
                placeholder="Digite o valor"
                className={errors.valor ? "error-border" : ""}
              />
              {errors.valor && (
                <p className="error-message">{errors.valor.message}</p>
              )}
            </div>
          </div>
          <div className="input__container-register">
            <label htmlFor="opcoes">Status*</label>
            <label className="label__radio-register-charge">
              <input type="radio" {...register("status")} value="Paga" />
              <span className="checkmark"></span>
              Cobrança Paga
            </label>
            <label className="label__radio-register-charge">
              <input type="radio" {...register("status")} value="Pendente" />
              <span className="checkmark"></span>
              Cobrança Pendente
            </label>
          </div>
          <div className="btn_group-register">
            <button
              className="btn__clean-register"
              onClick={(event) => {
                event.preventDefault();
                onClose();
              }}
            >
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
