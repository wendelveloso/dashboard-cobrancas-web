import "./ModalFilterCharge.css";
import { useState, useEffect } from "react";

export default function ModalFilterCharge({
  modalToolsRef,
  onApplyFilter,
  onClose,
  currentFilter,
}) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setSelectedStatus(currentFilter?.status || "");
    setStartDate(currentFilter?.startDate || "");
    setEndDate(currentFilter?.endDate || "");
  }, [currentFilter]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onApplyFilter({
      status: selectedStatus || null,
      startDate: startDate || null,
      endDate: endDate || null,
    });

    onClose();
  };

  const handleClear = () => {
    setSelectedStatus("");
    setStartDate("");
    setEndDate("");
    onApplyFilter(null);
    onClose();
  };

  return (
    <div className="filter__container-charge" ref={modalToolsRef}>
      <div className="polygon"></div>
      <form onSubmit={handleSubmit}>
        <p className="label__status">Status</p>

        {["Vencida", "Pendente", "Paga"].map((status) => (
          <label key={status} className="label__radio">
            <input
              type="radio"
              name="status"
              value={status}
              checked={selectedStatus === status}
              onChange={(e) => setSelectedStatus(e.target.value)}
            />
            <span className="checkmark"></span>
            {status}s
          </label>
        ))}

        <label className="label__date">Data de Início</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label className="label__date">Data de Fim</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          className="btnSubmit-charge"
          type="submit"
          disabled={!selectedStatus && !startDate && !endDate}
        >
          Aplicar
        </button>
        <button type="button" className="btnClean-charge" onClick={handleClear}>
          Limpar
        </button>
      </form>
    </div>
  );
}
