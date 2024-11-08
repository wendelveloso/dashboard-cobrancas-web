const formatarValor = (valor) => {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length === 11) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return cpf;
};

const formatarData = (dataString) => {
  const data = new Date(dataString);
  const day = data.getUTCDate().toString().padStart(2, "0");
  const month = (data.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = data.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

function formatarTelefone(numero) {
    const numeroLimpo = numero.replace(/\D/g, "");

    if (numeroLimpo.length === 11) {
        return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (numeroLimpo.length === 10) {
        return numeroLimpo.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
        return numero;
    }
}

export {
  formatarValor,
  formatarCPF,
  formatarData,
  formatarTelefone
};
