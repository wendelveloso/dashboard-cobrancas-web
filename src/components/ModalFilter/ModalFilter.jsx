import "./ModalFilter.css";
import { useState } from "react";
import { iconClose, iconEyes } from "../../components/Icons/icons";

export default function ModalFilter({ modalRef, onClose }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
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
    <div className="filter__container" ref={modalRef}>
      <div className="polygon"></div>
      <form onSubmit={handleSubmit}>
        <p className="label__status">Status</p>

        <label className="label__radio">
          <input
            type="radio"
            name="option"
            value="Inadimplente"
            checked={selectedOption === "Inadimplente"}
            onChange={handleOptionChange}
          />
          <span className="checkmark"></span>
          Inadimplentes
        </label>

        <label className="label__radio">
          <input
            type="radio"
            name="option"
            value="Em dia"
            checked={selectedOption === "Em dia"}
            onChange={handleOptionChange}
          />
          <span className="checkmark"></span>
          Em dia
        </label>
        <button className="btnSubmit" type="submit" disabled={!selectedOption}>
          Aplicar
        </button>
        <button className="btnClean" onClick={handleClear}>
          Limpar
        </button>
      </form>
    </div>
  );
}
