import { toast } from "react-toastify";

function exibirSucesso(mensagem) {
  toast.success(mensagem, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    style: {
      backgroundColor: "#E9F7EF",
      color: "#1E4620",
      fontSize: "14px",
      fontWeight: 500,
      padding: "12px 16px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      width: "360px",
    },
    progressStyle: {
      background: "#27AE60",
    },
  });
}

function exibirErro(mensagem) {
  toast.error(mensagem, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    style: {
      backgroundColor: "#FDEDEC",
      color: "#641E16",
      fontSize: "14px",
      fontWeight: 500,
      padding: "12px 16px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      width: "360px",
    },
    progressStyle: {
      background: "#C0392B",
    },
  });
}

export { exibirErro, exibirSucesso };
