import * as Yup from "yup";

const userSchema = Yup.object().shape({
  nome: Yup.string().required("Este campo deve ser preenchido"),
  email: Yup.string()
    .required("Este campo deve ser preenchido")
    .email("E-mail inválido"),
  senha: Yup.string()
    .required("Este campo deve ser preenchido")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  repetirSenha: Yup.string()
    .required("Este campo deve ser preenchido")
    .oneOf([Yup.ref("senha"), null], "As senhas devem ser iguais"),
});

export default userSchema;
