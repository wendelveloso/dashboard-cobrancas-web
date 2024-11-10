import * as Yup from "yup";

const clientSchema = Yup.object().shape({
  nome: Yup.string()
    .required("Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: Yup.string().required("Email é obrigatório").email("Email inválido"),
  cpf: Yup.string()
    .required("CPF é obrigatório")
    .length(11, "Insira apenas números"),
  uf: Yup.string().length(2, "Apenas duas letras"),
  cep: Yup.string().length(8, "Insira apenas números"),
  telefone: Yup.string()
    .required("Telefone é obrigatório")
    .length(11, "Insira apenas números (DDD + número)"),
});

export default clientSchema;
