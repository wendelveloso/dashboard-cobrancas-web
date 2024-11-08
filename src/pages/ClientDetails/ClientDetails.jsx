import React, { useEffect, useState } from "react";
import "./ClientDetails.css";
import {
  iconTools,
  iconGlass,
  iconClient,
  iconTopDown,
  iconChargePlus,
  iconEdit,
  iconDelete,
} from "../../components/Icons/icons";
import Header from "../../components/Header/Header";
import ModalFilter from "../../components/ModalFilter/ModalFilter";
import ModalChargeGeneric from "../../components/ModalChargeGeneric/ModalChargeGeneric";
import ModalClientGeneric from "../../components/ModalClientGeneric/ModalClientGeneric";
import { useModal } from "../../utils/useModal";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { formatarValor, formatarCPF, formatarData } from "../../utils/formatting"

export default function ClientDetails() {
  const [carregando, setCarregando] = useState(true);
  const [cliente, setCliente] = useState(null);
  const [cobranca, setCobranca] = useState(null);
  const { clientId } = useParams();
  const {
    modalToolsRef,
    modalRef,
    modalClientRef,
    modalTooltsOpen,
    modalSecondOpen,
    modalClientOpen,
    handleToggleToolsModal,
    handleToggleSecondModal,
    handleToggleClientModal,
    onClose,
  } = useModal();

  useEffect(() => {
    const buscarDetalhesCliente = async () => {
      try {
        const response = await api.get(`/clientDetails/${clientId}`);
        setCliente(response.data.client);
        setCobranca(response.data.charges);
      } catch (error) {
        console.error("Erro ao buscar detalhes do cliente:", error);
      } finally {
        setCarregando(false);
      }
    };

    buscarDetalhesCliente();
  }, [clientId]);

  if (carregando) return <p>Carregando detalhes do cliente...</p>;

  

  const getStatusClass = (status) => {
    switch (status) {
      case "Vencida":
        return "status-vencida";
      case "Pendente":
        return "status-pendente";
      case "Paga":
        return "status-paga";
      default:
        return "";
    }
  };

  return (
    <>
      {modalSecondOpen && (
        <ModalChargeGeneric
          title="Cadastro de Cobrança"
          modalRef={modalRef}
          onClose={onClose}
          handleToggleSecondModal={handleToggleSecondModal}
        />
      )}
      {modalTooltsOpen && (
        <ModalChargeGeneric
          title="Edição de Cobrança"
          modalRef={modalToolsRef}
          onClose={onClose}
          handleToggleSecondModal={handleToggleToolsModal}
        />
      )}
      {modalClientOpen && (
        <ModalClientGeneric
          title="Editar Cliente"
          modalRef={modalClientRef}
          onClose={onClose}
          handleToggleClientModal={handleToggleClientModal}
        />
      )}
      <div className="page__container">
        <Header
          title="Clientes"
          subTitle=" >    Detalhes do cliente"
          titleStyle2="header__subtitle"
          titleStyle="header__title--client"
        />
        <main className="main__container_client-details">
          <div className="list__clients-details">
            <div className="container1">
              <img src={iconClient} alt="icon-client" />
              <h2>{cliente.nome}</h2>
            </div>
          </div>
          <div className="clients_container-data">
            <div className="first__header-data">
              <h3>Dados do cliente</h3>
              <button onClick={handleToggleClientModal} className="btn-data">
                Editar Cliente
              </button>
            </div>
            <div className="clients__header_info-data">
              <div className="clients__header_data">
                <p>E-mail*</p>
                <p>Telefone*</p>
                <p>CPF</p>
              </div>
              <div className="clients__data">
                <p>{cliente.email}</p>
                <p>{cliente.telefone}</p>
                <p>{cliente.cpf}</p>
              </div>
            </div>
            <div className="clients__header_info-data2">
              <div className="clients__header_data2">
                <p>Endereço*</p>
                <p>Bairro</p>
                <p>Complemento</p>
                <p>CEP</p>
                <p>Cidade</p>
                <p>UF</p>
              </div>
              <div className="clients__data2">
                <p>{cliente.endereco}</p>
                <p>{cliente.bairro}</p>
                <p>{cliente.complemento}</p>
                <p>{cliente.cep}</p>
                <p>{cliente.cidade}</p>
                <p>{cliente.uf}</p>
              </div>
            </div>
          </div>
          <div className="clients_container-details">
            <div className="first__header-details">
              <h3>Cobranças do Cliente</h3>
              <button onClick={handleToggleSecondModal} className="btn-details">
                + Nova cobrança
              </button>
            </div>
            <div className="clients__header_info-details">
              <div className="ID_order-details">
                <img src={iconTopDown} alt="arrow-top-down" />
                <p>ID Cob.</p>
              </div>
              <div className="client_order-details">
                <img src={iconTopDown} alt="arrow-top-down" />
                <p>Data de venc.</p>
              </div>
              <p className="clients__header_info-valor">Valor</p>
              <p className="clients__header_info-status">Status</p>
              <p>Descrição</p>
            </div>
            <div className="clients__info_container-details">
              {cobranca.map((cobranca, index) => (
                <div key={cobranca.id_cob} className="clients__info-details">
                  <p className="client__name_size-details">{cobranca.id_cob}</p>
                  <p>{formatarData(cobranca.data_venc)}</p>
                  <p className="client__name_size-details">
                    R$ {formatarValor(cobranca.valor)}
                  </p>
                  <p className={getStatusClass(cobranca.status)}>
                    {cobranca.status}
                  </p>
                  <p className="clients__desc_size-details">
                    {cobranca.descricao}
                  </p>
                  <div className="icon_container-details">
                    <img
                      className="btn-zoom"
                      src={iconEdit}
                      alt="icon-edit"
                      onClick={() => handleToggleToolsModal(cobranca.id_cob)}
                    />
                    <img
                      className="btn-zoom"
                      src={iconDelete}
                      alt="icon-delete"
                      onClick={() => handleDeleteCobranca(cobranca.id_cob)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
