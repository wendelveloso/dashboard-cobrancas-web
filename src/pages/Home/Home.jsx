import "./Home.css";
import {
  iconPaperBrown,
  iconPaperGreen,
  iconPaperYellow,
  iconClientGreen,
  iconClientRed,
} from "../../components/Icons/icons";
import Header from "../../components/Header/Header";
import api from "../../services/api";
import calcularCobrancas from "../../utils/resumeCharge";
import ModalLoading from "../../components/ModalLoading/ModalLoading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatarValor, formatarCPF } from "../../utils/formatting";
import { exibirErro } from "../../utils/toast";

export default function Home() {
  const [cobrancasPagas, setCobrancasPagas] = useState([]);
  const [cobrancasVencidas, setCobrancasVencidas] = useState([]);
  const [cobrancasPendentes, setCobrancasPendentes] = useState([]);
  const [clientesInadimplentes, setclientesInadimplentes] = useState([]);
  const [clientesEmDia, setclientesEmDia] = useState([]);

  const navigate = useNavigate();

  const handleViewAllClients = (status) => {
    navigate("/clientes", { state: { status } });
  };
  const handleViewAllCharges = (status) => {
    navigate("/cobrancas", { state: { status } });
  };

  useEffect(() => {
    const buscarTodasCobrancas = async () => {
      try {
        const [
          cobrancasPagas,
          cobrancasVencidas,
          cobrancasPendentes,
          clientesInadimplentes,
          clientesEmDia,
        ] = await Promise.all([
          api.get(`/allCharges?status=Paga`),
          api.get(`/allCharges?status=Vencida`),
          api.get(`/allCharges?status=Pendente`),
          api.get(`/consultClient?status=Inadimplente`),
          api.get(`/consultClient?status=Em dia`),
        ]);
        setCobrancasPagas(cobrancasPagas.data);
        setCobrancasVencidas(cobrancasVencidas.data);
        setCobrancasPendentes(cobrancasPendentes.data);
        setclientesInadimplentes(clientesInadimplentes.data);
        setclientesEmDia(clientesEmDia.data);
      } catch (error) {
        exibirErro("Erro ao carregar dados. Por favor, tente novamente.");
      } finally {
      }
    };

    buscarTodasCobrancas();
  }, []);

  const {
    valorTotalPagas,
    valorTotalVencidas,
    valorTotalPendentes,
    primeirasCobrancasPendentes,
    primeirasCobrancasVencidas,
    primeirasCobrancasPagas,
    primeirosClientesInadimplentes,
    primeirosClientesEmDia,
  } = calcularCobrancas({
    pagas: cobrancasPagas,
    vencidas: cobrancasVencidas,
    pendentes: cobrancasPendentes,
    inadimplentes: clientesInadimplentes,
    emDia: clientesEmDia,
  });
  return (
    <div className="page__container">
      <Header title="Resumo das cobranças" titleStyle="header__title--home" />
      <main className="main__container">
        <section className="total__values">
          <div className="total__paid">
            <div className="charges paid">
              <img src={iconPaperGreen} alt="icon-paper-green" />
              <div className="text__container">
                <p>Cobraças Pagas</p>
                <p>R$ {valorTotalPagas}</p>
              </div>
            </div>
          </div>
          <div className="total__expired">
            <div className="charges expired">
              <img src={iconPaperBrown} alt="icon-paper-green" />
              <div className="text__container">
                <p>Cobranças Vencidas</p>
                <p>R$ {valorTotalVencidas}</p>
              </div>
            </div>
          </div>
          <div className="total__expected">
            <div className="charges expected">
              <img src={iconPaperYellow} alt="icon-paper-green" />
              <div className="text__container">
                <p>Cobranças Previstas</p>
                <p>R$ {valorTotalPendentes}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="details__values">
          <div className="details__expired">
            <div className="details__header">
              <h3>Cobranças Pagas</h3>
              <p className="details_p-green">
                {String(cobrancasPagas.length).padStart(2, "0")}
              </p>
            </div>
            <div className="details__header_info">
              <p>Cliente</p>
              <p>ID da cob.</p>
              <p>Valor</p>
            </div>
            <div className="details__info_container">
              {primeirasCobrancasPagas.map((cobranca) => (
                <div className="details__info" key={cobranca.id}>
                  <p>{cobranca.nome}</p>
                  <p>{cobranca.id_cob}</p>
                  <p>R$ {formatarValor(cobranca.valor)}</p>
                </div>
              ))}
            </div>
            <button
              className="btn-viewall"
              onClick={() => handleViewAllCharges("Paga")}
            >
              Ver todos
            </button>
          </div>
          <div className="details__expired">
            <div className="details__header ">
              <h3>Cobranças Vencidas</h3>
              <p className="details_p-red">
                {String(cobrancasVencidas.length).padStart(2, "0")}
              </p>
            </div>
            <div className="details__header_info">
              <p>Cliente</p>
              <p>ID da cob.</p>
              <p>Valor</p>
            </div>
            <div className="details__info_container">
              {primeirasCobrancasVencidas.map((cobranca) => (
                <div className="details__info" key={cobranca.id}>
                  <p>{cobranca.nome}</p>
                  <p>{cobranca.id_cob}</p>
                  <p>R$ {formatarValor(cobranca.valor)}</p>
                </div>
              ))}
            </div>
            <button
              className="btn-viewall"
              onClick={() => handleViewAllCharges("Vencida")}
            >
              Ver todos
            </button>
          </div>
          <div className="details__expired">
            <div className="details__header">
              <h3>Cobranças Previstas</h3>
              <p className="details_p-yellow">
                {String(cobrancasPendentes.length).padStart(2, "0")}
              </p>
            </div>
            <div className="details__header_info">
              <p>Cliente</p>
              <p>ID da cob.</p>
              <p>Valor</p>
            </div>
            <div className="details__info_container">
              {primeirasCobrancasPendentes.map((cobranca) => (
                <div className="details__info" key={cobranca.id}>
                  <p>{cobranca.nome}</p>
                  <p>{cobranca.id_cob}</p>
                  <p>R$ {formatarValor(cobranca.valor)}</p>
                </div>
              ))}
            </div>
            <button
              className="btn-viewall"
              onClick={() => handleViewAllCharges("Pendente")}
            >
              Ver todos
            </button>
          </div>
        </section>
        <section className="client__value">
          <div className="client__red">
            <div className="client__header">
              <img src={iconClientRed} alt="icon-client-red" />
              <h3>Clientes Inadimplentes</h3>
              <p className="details_p-red">
                {String(clientesInadimplentes.length).padStart(2, "0")}
              </p>
            </div>
            <div className="client__header_info">
              <p>Clientes</p>
              <p>ID do clie.</p>
              <p>CPF</p>
            </div>
            <div className="client__header_container">
              {primeirosClientesInadimplentes.map((cliente) => (
                <div className="client__info" key={cliente.id}>
                  <p className="home__name_size-bottom">{cliente.nome}</p>
                  <p className="home__id_size-bottom">{cliente.id}</p>
                  <p>{formatarCPF(cliente.cpf)}</p>
                </div>
              ))}
            </div>
            <button
              className="btn-viewall"
              onClick={() => handleViewAllClients("Inadimplente")}
            >
              Ver todos
            </button>
          </div>
          <div className="client__green">
            <div className="client__header">
              <img src={iconClientGreen} alt="icon-client-green" />
              <h3>Clientes em dia</h3>
              <p className="details_p-green">
                {String(clientesEmDia.length).padStart(2, "0")}
              </p>
            </div>
            <div className="client__header_info">
              <p>Clientes</p>
              <p>ID do clie.</p>
              <p>CPF</p>
            </div>
            <div className="client__header_container">
              {primeirosClientesEmDia.map((cliente) => (
                <div className="client__info" key={cliente.id}>
                  <p className="home__name_size-bottom">{cliente.nome}</p>
                  <p className="home__id_size-bottom">{cliente.id}</p>
                  <p>{formatarCPF(cliente.cpf)}</p>
                </div>
              ))}
            </div>
            <button
              className="btn-viewall"
              onClick={() => handleViewAllClients("Em dia")}
            >
              Ver todos
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
