import "./ModalFilterCharge.css";
import { useState } from "react";

export default function ModalFilterCharge({
  modalToolsRef,
  onApplyFilter,
  onClose,
}) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onApplyFilter(selectedOption);
    onClose();
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleClear = () => {
    setSelectedOption("");
    onApplyFilter(null);
    onClose();
  };

  return (
    <div className="filter__container-charge" ref={modalToolsRef}>
      <div className="polygon"></div>
      <form onSubmit={handleSubmit}>
        <p className="label__status">Status</p>

        <label className="label__radio">
          <input
            type="radio"
            name="status"
            value="Vencida"
            checked={selectedOption === "Vencida"}
            onChange={handleOptionChange}
          />
          <span className="checkmark"></span>
          Vencidas
        </label>

        <label className="label__radio">
          <input
            type="radio"
            name="status"
            value="Pendente"
            checked={selectedOption === "Pendente"}
            onChange={handleOptionChange}
          />
          <span className="checkmark"></span>
          Pendentes
        </label>

        <label className="label__radio">
          <input
            type="radio"
            name="status"
            value="Paga"
            checked={selectedOption === "Paga"}
            onChange={handleOptionChange}
          />
          <span className="checkmark"></span>
          Pagas
        </label>

        <label className="label__date">Data de Início</label>
        <input type="date" />

        <label className="label__date">Data de Fim</label>
        <input type="date" />

        <button
          className="btnSubmit-charge"
          type="submit"
          disabled={!selectedOption}
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
