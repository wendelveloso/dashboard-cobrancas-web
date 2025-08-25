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

import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header/Header";
import ModalFilterCharge from "../../components/ModalFilterCharge/ModalFilterCharge";
import ModalChargeGeneric from "../../components/ModalChargeGeneric/ModalChargeGeneric";
import ModalConfirmDelete from "../../components/ModalConfirmDelete/ModalConfirmDelete";
import ModalDetailsCharge from "../../components/ModalDetailsCharge/ModalDetailsCharge";
import api from "../../services/api";
import { useModal } from "../../utils/useModal";
import { useState, useEffect } from "react";
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [sortDueDateAsc, setSortDueDateAsc] = useState(true);

  const location = useLocation();
  const statusFromRoute = location.state?.status;

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

const fetchCharges = async (searchTerm = "", options = {}) => {
  try {
    const response = await api.get("/searchCharges", {
      params: { searchTerm },
      ...options
    });
    setCharges(response.data);
    setAllCharges(response.data);
    setFilteredCharges(response.data);
  } catch (error) {
    exibirErro("Não foi possível carregar as cobranças. Tente novamente.");
  }
};


  useEffect(() => {
    fetchCharges();
  }, []);

  const searchTerm = watch("searchTerm");
  useEffect(() => {
    if (searchTerm) {
      fetchCharges(searchTerm, { skipLoading: true });
    } else {
      setCharges(allCharges);
      setFilteredCharges(allCharges);
    }
  }, [searchTerm]);

  const handleEditCharge = (cobranca) => {
    setSelectedCharge(cobranca);
    handleToggleSecondModal();
  };
  const handleDelete = (idCharge) => {
    setIdToDelete(idCharge);
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    try {
      await api.delete(`/deleteCharge/${idToDelete}`);
      exibirSucesso("Cobrança excluída com sucesso!");
      fetchCharges();
    } catch (error) {
      exibirErro("Apenas cobranças pendentes podem ser excluídas!");
    }
  };

  const handleClose = () => {
    setShowConfirmModal(false);
  };

  const handleFilterCharges = (filter) => {
    if (!filter) {
      setFilteredCharges(charges);
      setCurrentFilter(null);
      setCurrentPage(1);
      return;
    }

    let filtered = charges;

    if (filter.status) {
      filtered = filtered.filter((charge) => charge.status === filter.status);
    }
    if (filter.startDate) {
      filtered = filtered.filter(
        (charge) => new Date(charge.data_venc) >= new Date(filter.startDate)
      );
    }
    if (filter.endDate) {
      filtered = filtered.filter(
        (charge) => new Date(charge.data_venc) <= new Date(filter.endDate)
      );
    }

    setFilteredCharges(filtered);
    setCurrentFilter(filter);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (statusFromRoute) {
      handleFilterCharges({ status: statusFromRoute });
    } else {
      setFilteredCharges(charges);
    }
  }, [statusFromRoute, charges]);

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

  const handleOpenDetailsModal = (cobranca) => {
    setSelectedCharge(cobranca);
    handleToggleClientModal();
  };

  const handleSortByClient = () => {
    const novaDirecao = orderDirection === "asc" ? "desc" : "asc";
    setOrderDirection(novaDirecao);

    const chargesOrdenadas = [...filteredCharges].sort((a, b) => {
      if (a.nome < b.nome) return novaDirecao === "asc" ? -1 : 1;
      if (a.nome > b.nome) return novaDirecao === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredCharges(chargesOrdenadas);
    setCurrentPage(1);
  };
  const handleSortByDueDate = () => {
    const sorted = [...filteredCharges].sort((a, b) => {
      const dateA = new Date(a.data_venc);
      const dateB = new Date(b.data_venc);

      if (sortDueDateAsc) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setFilteredCharges(sorted);
    setSortDueDateAsc(!sortDueDateAsc);
    setCurrentPage(1);
  };
  return (
    <>
      <ModalConfirmDelete
        show={showConfirmModal}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message="Tem certeza que deseja excluir esta cobrança?"
      />
      {modalToolsOpen && (
        <ModalFilterCharge
          onClose={onClose}
          onApplyFilter={handleFilterCharges}
          modalToolsRef={modalToolsRef}
          currentFilter={currentFilter}
        />
      )}
      {modalSecondOpen && (
        <ModalChargeGeneric
          title={selectedCharge ? "Edição de Cobrança" : "Cadastro de Cobrança"}
          modalRef={modalRef}
          onClose={onClose}
          handleToggleSecondModal={handleToggleSecondModal}
          charge={selectedCharge}
          onSuccess={fetchCharges}
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
              <div
                className="charges__client_order"
                onClick={handleSortByClient}
                style={{ cursor: "pointer" }}
              >
                <img src={iconTopDown} alt="arrow-top-down" />
                <p>Cliente</p>
              </div>
              <p>ID Cob.</p>
              <p>Valor</p>
              <div
                className="ID_order"
                onClick={handleSortByDueDate}
                style={{ cursor: "pointer" }}
              >
                <img src={iconTopDown} alt="arrow-top-down" />
                <p>Data de venc.</p>
              </div>

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
                          handleEditCharge(cobranca);
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
                  startIndex + chargesPerPage >= filteredCharges.length
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
