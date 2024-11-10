import { toast } from "react-toastify";
function exibirSucesso(mensagem) {
  toast.success(mensagem, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    style: {
      backgroundColor: "#C3D4FE",
      color: "#243F80",
      width: "354px",
    },
  });
}

function exibirErro(mensagem) {
  toast.error(mensagem, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    style: {
      backgroundColor: "#F2D6D0",
      color: "#AE1100",
      width: "354px",
    },
  });
}

export { exibirErro, exibirSucesso };
