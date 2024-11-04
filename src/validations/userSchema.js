import * as Yup from "yup";

const userSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: Yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  repeatPassword: Yup
    .string()
    .oneOf([Yup.ref("password"), null], "As senhas devem ser iguais")
    .required("Repetir a senha é obrigatório"),
});

export default userSchema;
