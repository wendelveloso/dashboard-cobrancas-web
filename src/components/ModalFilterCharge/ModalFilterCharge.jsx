// import "./ModalFilterCharge.css";
// import { useState, useRef, useEffect } from "react";
// import { iconClose, iconEyes } from "../../components/Icons/icons";
// import { useForm } from "react-hook-form";

// export default function ModalFilterCharge({ modalRef }) {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedOption, setSelectedOption] = useState("");
//   const { register, reset } = useForm();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//   };
//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   return (
//     <div className="filter__container-charge" ref={modalRef}>
//       <div className="polygon"></div>
//       <form onSubmit={handleSubmit}>
//         <p className="label__status">Status</p>

//         <label className="label__radio">
//           <input type="radio" name="option" value="1" />
//           <span className="checkmark"></span>
//           Vencidas
//         </label>

//         <label className="label__radio">
//           <input type="radio" name="option" value="2" />
//           <span className="checkmark"></span>
//           Pendentes
//         </label>
//         <label className="label__radio">
//           <input type="radio" name="option" value="3" />
//           <span className="checkmark"></span>
//           Pagas
//         </label>
//         <label className="label__date" htmlFor="date">
//           Data
//         </label>
//         <input
//           type="date"
//           id="date"
//           value={selectedDate}
//           onChange={handleDateChange}
//         />
//         <button className="btnSubmit-charge" type="submit" disabled={!selectedOption}>
//           Aplicar
//         </button>
//         <button className="btnClean-charge">Limpar</button>
//       </form>
//     </div>
//   );
// }

import "./ModalFilterCharge.css";
import { useState } from "react";

export default function ModalFilterCharge({ modalRef, onApplyFilter }) {
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onApplyFilter({ status, startDate, endDate });
  };

  const handleClear = () => {
    setStatus("");
    setStartDate("");
    setEndDate("");
    onApplyFilter({ status: "", startDate: "", endDate: "" }); 
  };

  return (
    <div className="filter__container-charge" ref={modalRef}>
      <div className="polygon"></div>
      <form onSubmit={handleSubmit}>
        <p className="label__status">Status</p>

        <label className="label__radio">
          <input
            type="radio"
            name="status"
            value="Vencidas"
            checked={status === "Vencidas"}
            onChange={() => setStatus("Vencidas")}
          />
          <span className="checkmark"></span>
          Vencidas
        </label>

        <label className="label__radio">
          <input
            type="radio"
            name="status"
            value="Pendentes"
            checked={status === "Pendentes"}
            onChange={() => setStatus("Pendentes")}
          />
          <span className="checkmark"></span>
          Pendentes
        </label>

        <label className="label__radio">
          <input
            type="radio"
            name="status"
            value="Pagas"
            checked={status === "Pagas"}
            onChange={() => setStatus("Pagas")}
          />
          <span className="checkmark"></span>
          Pagas
        </label>

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

        <button className="btnSubmit-charge" type="submit">
          Aplicar
        </button>
        <button type="button" className="btnClean-charge" onClick={handleClear}>
          Limpar
        </button>
      </form>
    </div>
  );
}
