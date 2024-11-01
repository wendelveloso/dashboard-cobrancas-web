import "./ModalFilterCharge.css";
import { useState, useRef, useEffect } from "react";
import { iconClose, iconEyes } from "../../components/Icons/icons";

export default function ModalFilterCharge({ modalRef }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="filter__container" ref={modalRef}>
      <div className="polygon"></div>
      <form onSubmit={handleSubmit}>
        <p className="label__status">Status</p>

        <label className="label__radio">
          <input type="radio" name="option" value="1" />
          <span class="checkmark"></span>
          Pendentes
        </label>

        <label className="label__radio">
          <input type="radio" name="option" value="1" />
          <span class="checkmark"></span>
          Pagas
        </label>
        <label className="label__date" htmlFor="date">
          Data
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button className="btnSubmit" type="submit" disabled={!selectedOption}>
          Aplicar
        </button>
        <button className="btnClean">Limpar</button>
      </form>
    </div>
  );
}
