import * as Yup from "yup";

const userSchema = Yup.object().shape({
  nome: Yup.string().required("Este campo deve ser preenchido"),
  email: Yup.string()
    .required("Este campo deve ser preenchido")
    .email("E-mail inválido"),
  telefone: Yup.string().optional(),
  cpf: Yup.string().optional(),
  senha: Yup.string()
  .nullable()
  .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  repetirSenha: Yup.string()
    .optional()
    .oneOf([Yup.ref("senha"), null], "As senhas devem ser iguais"),
});

export default userSchema;
