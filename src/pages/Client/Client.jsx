import "./Client.css";
import {
  iconTools,
  iconGlass,
  iconClient,
  iconTopDown,
  iconChargePlus,
  emptySearch,
  polygon,
} from "../../components/Icons/icons";
import Header from "../../components/Header/Header";
import ModalFilter from "../../components/ModalFilter/ModalFilter";
import { useModal } from "../../utils/useModal";
import ModalChargeGeneric from "../../components/ModalChargeGeneric/ModalChargeGeneric";
import ModalClientGeneric from "../../components/ModalClientGeneric/ModalClientGeneric";
import { NavLink } from "react-router-dom";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { formatarCPF, formatarTelefone } from "../../utils/formatting";
import { exibirSucesso } from "../../utils/toast";

export default function Client() {
  const { register, watch } = useForm();
  const [clients, setClients] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 9;
  const searchTerm = watch("searchTerm");

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const message = localStorage.getItem("successMessage");
    if (message) {
      exibirSucesso(message);

      setTimeout(() => {
        localStorage.removeItem("successMessage");
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchClients(searchTerm);
    } else {
      setClients(allClients);
    }
  }, [searchTerm]);

 const fetchClients = async (searchTerm = "") => {
    try {
      const response = await api.get("/searchClients", {
        params: {
          searchTerm,
          orderBy: "nome",
          typeOrderBy: "asc",
        },
      });
      setClients(response.data);
      setFilteredClients(response.data);

      if (!searchTerm) setAllClients(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const handleAddClient = (newClient) => {
    setClients((prevClients) => [newClient, ...prevClients]);
    setAllClients((prevAllClients) => [newClient, ...prevAllClients]);

    setCurrentPage(1);
  };

  const handleFilterClients = (status) => {
    if (status) {
      setFilteredClients(clients.filter((client) => client.status === status));
    } else {
      setFilteredClients(clients);
    }
    setCurrentPage(1);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const startIndex = (currentPage - 1) * clientsPerPage;
  const currentClients = filteredClients.slice(
    startIndex,
    startIndex + clientsPerPage
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Inadimplente":
        return "status-inadimplente";
      case "Em dia":
        return "status-emdia";
      default:
        return "";
    }
  };

  const {
    modalToolsRef,
    modalRef,
    modalClientRef,
    modalToolsOpen,
    modalSecondOpen,
    modalClientOpen,
    handleToggleToolsModal,
    handleToggleSecondModal,
    handleToggleClientModal,
    onClose,
  } = useModal();

  return (
    <>
      {modalToolsOpen && (
        <ModalFilter
          modalRef={modalToolsRef}
          onApplyFilter={handleFilterClients}
          onClose={onClose}
        />
      )}
      {modalSecondOpen && (
        <ModalChargeGeneric
          title="Cadastro de Cobrança"
          modalRef={modalRef}
          onClose={onClose}
          handleToggleSecondModal={handleToggleSecondModal}
        />
      )}
      {modalClientOpen && (
        <ModalClientGeneric
          title="Cadastro do Cliente"
          modalClientRef={modalClientRef}
          onClose={onClose}
          handleToggleClientModal={handleToggleClientModal}
          onAddClient={handleAddClient}
          fetchClients={fetchClients}
        />
      )}
      <div className="page__container">
        <Header title="Clientes" titleStyle="header__title--client" />
        <main className="main__container_client">
          <div className="list__clients">
            <div className="container1">
              <img src={iconClient} alt="icon-client" />
              <h2>Clientes</h2>
            </div>
            <div className="container2">
              <button onClick={handleToggleClientModal} className="btn">
                + Adicionar cliente
              </button>
              <img
                src={iconTools}
                alt="icon-tools"
                className="icon-tools btn-zoom"
                onClick={handleToggleToolsModal}
              />
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Pesquisa"
                  {...register("searchTerm")}
                />
                <img
                  src={iconGlass}
                  alt="Ícone de busca"
                  className="icon-glass"
                />
              </div>
            </div>
          </div>
          <div className="clients_container">
            <div className="clients__header_info">
              <div className="client_order">
                <img src={iconTopDown} alt="arrow-top-down" />
                <p>Cliente</p>
              </div>
              <p>CPF</p>
              <p>E-mail</p>
              <p>Telefone</p>
              <p>Status</p>
              <p>Criar Cobrança</p>
            </div>
            <div className="clients__info_container">
              {currentClients.length > 0 ? (
                currentClients.map((cliente, index) => (
                  <NavLink
                    key={index}
                    to={`/clientes/detalhes/${cliente.id}`}
                    className="clients__info"
                  >
                    <p className="client__name_size">{cliente.nome}</p>
                    <p>{formatarCPF(cliente.cpf)}</p>
                    <p className="client__email_size">{cliente.email}</p>
                    <p>{formatarTelefone(cliente.telefone)}</p>
                    <p className={getStatusClass(cliente.status)}>
                      {cliente.status}
                    </p>
                    <img
                      className="btn-zoom"
                      src={iconChargePlus}
                      alt="icon-page-charge-plus"
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleSecondModal();
                      }}
                    />
                  </NavLink>
                ))
              ) : (
                <img className="img_empty-search" src={emptySearch} alt="" />
              )}
            </div>
            <div className="pagination-buttons">
              <img
                onClick={prevPage}
                className={`polygon1 ${currentPage === 1 ? "disabled" : ""}`}
                src={polygon}
                alt="previous-page"
              />
              <img
                onClick={nextPage}
                className={`polygon2 ${
                  startIndex + currentClients >= clients.length
                    ? "disabled"
                    : ""
                }`}
                src={polygon}
                alt="next-page"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
