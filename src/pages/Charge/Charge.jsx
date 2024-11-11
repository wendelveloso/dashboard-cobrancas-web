import "./Charge.css";
import {
  iconTools,
  iconGlass,
  iconTopDown,
  iconPaper,
  iconDelete,
  iconEdit,
  emptySearch,
  polygon,
} from "../../components/Icons/icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header/Header";
import { useModal } from "../../utils/useModal";
import ModalFilterCharge from "../../components/ModalFilterCharge/ModalFilterCharge";
import ModalChargeGeneric from "../../components/ModalChargeGeneric/ModalChargeGeneric";
import ModalDetailsCharge from "../../components/ModalDetailsCharge/ModalDetailsCharge";
import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import { formatarValor, formatarData } from "../../utils/formatting";
import { exibirErro, exibirSucesso } from "../../utils/toast";
import { useLocation } from "react-router-dom";

export default function Charge() {
  const { register, watch } = useForm();
  const [charges, setCharges] = useState([]);
  const [allCharges, setAllCharges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [filteredCharges, setFilteredCharges] = useState([]);
  const location = useLocation();
  const status = location.state?.status;

  const chargesPerPage = 9;
  const {
    modalToolsRef,
    modalRef,
    modalToolsOpen,
    handleToggleSecondModal,
    handleToggleToolsModal,
    modalSecondOpen,
    onClose,
    handleToggleClientModal,
    modalClientRef,
    modalClientOpen,
  } = useModal();

  const handleDelete = async (idCharge) => {
    try {
      const confirmDelete = window.confirm(
        "Tem certeza que deseja excluir esta cobrança?"
      );

      if (confirmDelete) {
        await api.delete(`/deleteCharge/${idCharge}`);
        exibirSucesso("Cobrança excluída com sucesso!");
        fetchCharges();
      }
    } catch (error) {
      exibirErro("Esta cobrança não pode ser excluída!");
    }
  };

  const fetchCharges = async (searchTerm = "") => {
    try {
      const response = await api.get("/searchCharges", {
        params: {
          searchTerm,
        },
      });
      setCharges(response.data);
      setFilteredCharges(response.data);
      if (!searchTerm) setAllCharges(response.data);
    } catch (error) {
      console.error("Erro ao buscar cobranças:", error);
    }
  };

  const searchTerm = watch("searchTerm");
  useEffect(() => {
    fetchCharges();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchCharges(searchTerm);
    } else {
      setCharges(allCharges);
    }
  }, [searchTerm]);

  const handleOpenDetailsModal = (cobranca) => {
    setSelectedCharge(cobranca);
    handleToggleClientModal();
  };
  const handleFilterCharges = (status) => {
    if (status) {
      setFilteredCharges(
        charges.filter((charges) => charges.status === status)
      );
    } else {
      setFilteredCharges(charges);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    if (status) {
      setFilteredCharges(charges.filter((charge) => charge.status === status));
    } else {
      setFilteredCharges(charges); 
    }
    setCurrentPage(1);
  }, [status, charges]);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const startIndex = (currentPage - 1) * chargesPerPage;
  const currentCharges = filteredCharges.slice(
    startIndex,
    startIndex + chargesPerPage
  );

  return (
    <>
      {modalToolsOpen && (
        <ModalFilterCharge
          onClose={onClose}
          onApplyFilter={handleFilterCharges}
          modalToolsRef={modalToolsRef}
        />
      )}
      {modalSecondOpen && (
        <ModalChargeGeneric
          title="Edição de Cobrança"
          modalRef={modalRef}
          onClose={onClose}
          handleToggleSecondModal={handleToggleSecondModal}
        />
      )}
      {modalClientOpen && selectedCharge && (
        <ModalDetailsCharge
          cobranca={selectedCharge}
          modalClientRef={modalClientRef}
          onClose={onClose}
          handleToggleClientModal={handleToggleClientModal}
        />
      )}
      <div className="page__container">
        <Header title="Cobranças" titleStyle="header__title--charge" />
        <main className="main__container_charges">
          <div className="list__charges">
            <div className="container1">
              <img src={iconPaper} alt="icon-paper-charge" />
              <h2>Cobranças</h2>
            </div>
            <div className="container2">
              <img
                src={iconTools}
                alt="icon-tools"
                className="icon-tools btn-zoom"
                onClick={handleToggleToolsModal}
                modalClientRef={modalToolsRef}
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
          <div className="charges_container">
            <div className="charges__header_info">
              <div className="client_order">
                <img src={iconTopDown} alt="arrow-top-down" />
                <p>Cliente</p>
              </div>
              <div className="ID_order">
                <img src={iconTopDown} alt="arrow-top-down" />
                <p>ID Cob.</p>
              </div>
              <p>Valor</p>
              <p>Data de venc.</p>
              <p>Status</p>
              <p>Descrição</p>
            </div>
            <div className="charges__info_container">
              {currentCharges.length > 0 ? (
                currentCharges.map((cobranca, index) => (
                  <div
                    key={index}
                    className="charges__info"
                    onClick={() => handleOpenDetailsModal(cobranca)}
                  >
                    <p className="charges__name_size">{cobranca.nome}</p>
                    <p className="charges__name_size">{cobranca.id_cob}</p>
                    <p className="charges__valor_size">
                      R$ {formatarValor(cobranca.valor)}
                    </p>
                    <p>{formatarData(cobranca.data_venc)}</p>
                    <p className={`status-${cobranca.status.toLowerCase()}`}>
                      {cobranca.status}
                    </p>
                    <p className="charges__desc_size">{cobranca.descricao}</p>
                    <div className="icon_container">
                      <img
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSecondModal();
                        }}
                        className="btn-zoom"
                        src={iconEdit}
                        alt="icon-edit"
                      />
                      <img
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(cobranca.id_cob);
                        }}
                        className="btn-zoom"
                        src={iconDelete}
                        alt="icon-delete"
                      />
                    </div>
                  </div>
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
                  startIndex + chargesPerPage >= charges.length
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
      <ToastContainer />
    </>
  );
}
