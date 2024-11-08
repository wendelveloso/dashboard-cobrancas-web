const formatarValor = (valor) => {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const calcularCobranca = ({
  pagas,
  vencidas,
  pendentes,
  inadimplentes,
  emDia,
}) => {
  const primeirasCobrancasPagas = pagas.slice(0, 4);
  const totalPagas = pagas.reduce((acc, cobranca) => {
    const valorNumerico = parseFloat(
      cobranca.valor
        .toString()
        .replace("R$ ", "")
        .replace(".", "")
        .replace(",", ".")
    );
    return acc + valorNumerico;
  }, 0);
  const valorTotalPagas = formatarValor(totalPagas);

  const primeirasCobrancasPendentes = pendentes.slice(0, 4);
  const totalPendentes = pendentes.reduce((acc, cobranca) => {
    const valorNumerico = parseFloat(
      cobranca.valor
        .toString()
        .replace("R$ ", "")
        .replace(".", "")
        .replace(",", ".")
    );
    return acc + valorNumerico;
  }, 0);
  const valorTotalPendentes = formatarValor(totalPendentes);

  const cobrancasPendentesVencidas = pendentes.filter((cobranca) => {
    const dataVencimento = new Date(cobranca.data_venc);
    return dataVencimento < new Date();
  });
  const primeirasCobrancasVencidas = vencidas.slice(0, 4);
  const totalVencidas = vencidas.reduce((acc, cobranca) => {
    const valorNumerico = parseFloat(
      cobranca.valor
        .toString()
        .replace("R$ ", "")
        .replace(".", "")
        .replace(",", ".")
    );
    return acc + valorNumerico;
  }, 0);
  const valorTotalVencidas = formatarValor(totalVencidas);

  const primeirosClientesInadimplentes = inadimplentes.slice(0, 4);
  const primeirosClientesEmDia = emDia.slice(0, 4);

  return {
    valorTotalPagas,
    valorTotalVencidas,
    valorTotalPendentes,
    primeirasCobrancasPendentes,
    primeirasCobrancasVencidas,
    primeirasCobrancasPagas,
    formatarValor,
    primeirosClientesInadimplentes,
    primeirosClientesEmDia,
  };
};

export default calcularCobranca;
