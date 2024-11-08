import * as Yup from "yup";


const clientSchema = Yup.object().shape({
    nome: Yup.string()
      .required("Nome é obrigatório")
      .min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: Yup.string()
      .required("Email é obrigatório")
      .email("Email inválido"),
    cpf: Yup.string()
      .required("CPF é obrigatório"),
    telefone: Yup.string()
      .required("Telefone é obrigatório"),
  });

  export default clientSchema;