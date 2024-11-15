import * as Yup from "yup";

const chargeSchema = Yup.object().shape({
  descricao: Yup.string()
    .required("Este campo deve ser preenchido")
    .min(10, "A descrição precisa ter pelo menos 10 caracteres"),

    data_venc: Yup.date()
    .nullable()
    .transform((curr, originalValue) => (originalValue === "" ? null : curr))
    .required("Este campo deve ser preenchido"),
  valor: Yup.number()
    .typeError("Este campo deve ser preenchido")
    .required(" Este campo deve ser preenchido")
    .positive("Valor deve ser positivo")
    .integer("Valor deve ser um número inteiro"),
});

export default chargeSchema;
