import { useEffect, useState } from "react";
import "./ClientDetails.css";
import {
  iconClient,
  iconTopDown,
  iconEdit,
  iconDelete,
} from "../../components/Icons/icons";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import Header from "../../components/Header/Header";
import ModalChargeGeneric from "../../components/ModalChargeGeneric/ModalChargeGeneric";
import ModalClientGeneric from "../../components/ModalClientGeneric/ModalClientGeneric";
import ModalConfirmDelete from "../../components/ModalConfirmDelete/ModalConfirmDelete";
import ModalLoading from "../../components/ModalLoading/ModalLoading";
import { useModal } from "../../utils/useModal";
import { useParams } from "react-router-dom";
import { exibirErro, exibirSucesso } from "../../utils/toast";
import {
  formatarValor,
  formatarCPF,
  formatarData,
  formatarTelefone,
  formatarCEP,
} from "../../utils/formatting";

export default function ClientDetails() {
  const [carregando, setCarregando] = useState(true);
  const [cliente, setCliente] = useState(null);
  const [charges, setCharges] = useState([]);
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [setClienteParaEditar] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const { clientId } = useParams();
  const {
    modalRef,
    modalClientRef,
    modalSecondOpen,
    modalClientOpen,
    handleToggleSecondModal,
    handleToggleClientModal,
    onClose,
  } = useModal();

  const handleDelete = (idCharge) => {
    setIdToDelete(idCharge);
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    try {
      await api.delete(`/deleteCharge/${idToDelete}`);
      exibirSucesso("Cobrança excluída com sucesso!");
      fetchClientDetails();
    } catch (error) {
      exibirErro("Apenas cobranças pendentes podem ser excluídas!");
    }
  };

  const handleClose = () => {
    setShowConfirmModal(false);
  };

  const fetchClientDetails = async () => {
    setCarregando(true);
    try {
      const response = await api.get(`/clientDetails/${clientId}`);
      setCliente(response.data.client);
      setCharges(response.data.charges);
    } catch (error) {
      exibirErro("Não foi possível carregar os detalhes do cliente. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchClientDetails();
  }, []);

  const handleToggleClientModalEdit = (isEdit = false) => {
    setModoEdicao(isEdit);
    if (isEdit && cliente) {
      setClienteParaEditar(cliente);
    } else {
      setClienteParaEditar(null);
    }
  };

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

  if (carregando) return <ModalLoading />;
  return (
    <>
      <ModalConfirmDelete
        show={showConfirmModal}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message="Tem certeza que deseja excluir esta cobrança?"
      />
      {modalSecondOpen && (
        <ModalChargeGeneric
          title={selectedCharge ? "Edição de Cobrança" : "Cadastro de Cobrança"}
          modalRef={modalRef}
          onClose={onClose}
          handleToggleSecondModal={handleToggleSecondModal}
          selectedClientNome={cliente.nome}
          charge={selectedCharge}
          onSuccess={fetchClientDetails}
        />
      )}
      {modalClientOpen && (
        <ModalClientGeneric
          title="Editar Cliente"
          modalClientRef={modalClientRef}
          onClose={onClose}
          handleToggleClientModal={handleToggleClientModal}
          handleToggleClientModalEdit={handleToggleClientModalEdit}
          clienteParaEditar={modoEdicao ? cliente : null}
          modoEdicao={modoEdicao}
          onSuccess={fetchClientDetails}
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
              <button
                onClick={() => {
                  handleToggleClientModal(true);
                  handleToggleClientModalEdit(true);
                }}
                className="btn-data"
              >
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
                <p>{formatarTelefone(cliente.telefone)}</p>
                <p>{formatarCPF(cliente.cpf)}</p>
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
                <p>{formatarCEP(cliente.cep)}</p>
                <p>{cliente.cidade}</p>
                <p>{cliente.uf.toUpperCase()}</p>
              </div>
            </div>
          </div>
          <div className="clients_container-details">
            <div className="first__header-details">
              <h3>Cobranças do Cliente</h3>
              <button
                onClick={() => {
                  setSelectedCharge(null);
                  handleToggleSecondModal();
                }}
                className="btn-details"
              >
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
              {charges.map((charges, index) => (
                <div key={charges.id_cob} className="clients__info-details">
                  <p className="client__name_size-details">{charges.id_cob}</p>
                  <p>{formatarData(charges.data_venc)}</p>
                  <p className="client__name_size-details">
                    R$ {formatarValor(charges.valor)}
                  </p>
                  <p className={getStatusClass(charges.status)}>
                    {charges.status}
                  </p>
                  <p className="clients__desc_size-details">
                    {charges.descricao}
                  </p>
                  <div className="icon_container-details">
                    <img
                      className="btn-zoom"
                      src={iconEdit}
                      alt="icon-edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCharge(charges);
                        handleToggleSecondModal(charges.id_cob);
                      }}
                    />
                    <img
                      className="btn-zoom"
                      type="button"
                      src={iconDelete}
                      alt="icon-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(charges.id_cob);
                      }}
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
