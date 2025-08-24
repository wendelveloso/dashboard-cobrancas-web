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
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .matches(
      /[^a-zA-Z0-9]/,
      "A senha deve conter pelo menos um caractere especial"
    ),
  repetirSenha: Yup.string()
    .optional()
    .oneOf([Yup.ref("senha"), null], "As senhas devem ser iguais"),
});

export default userSchema;
