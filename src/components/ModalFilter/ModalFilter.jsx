import "./ModalFilter.css";
import { useState, useRef, useEffect } from "react";
import { iconClose, iconEyes } from "../../components/Icons/icons";

export default function ModalFilter() {
  const [optionsOn, setOptionsOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const toggleOptionsDisplay = () => {
    setOptionsOn(!optionsOn);
  };
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className={`filter__container ${optionsOn ? "visible" : ""}`}>
      <div className="polygon"></div>
      <form onSubmit={handleSubmit}>
        <p className="label__status">Status</p>

        <label className="label__radio">
          <input type="radio" name="option" value="1" />
          <span class="checkmark"></span>
          Inadimplentes
        </label>

        <label className="label__radio">
          <input type="radio" name="option" value="1" />
          <span class="checkmark"></span>
          Em Dia
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
