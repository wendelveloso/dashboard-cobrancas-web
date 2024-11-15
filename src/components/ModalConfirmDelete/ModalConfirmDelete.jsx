import React from "react";
import "./ModalConfirmDelete.css";
import {alert} from "../../components/Icons/icons";

const ConfirmModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={alert} alt="alert-img" />
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">
            Não
          </button>
          <button onClick={onConfirm} className="confirm-btn">
            Sim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
