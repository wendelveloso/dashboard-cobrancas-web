import React from "react";
import { useLoading } from "../../context/LoadingContext";
import "./ModalLoading.css";

const ModalLoadingGlobal = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="loading-modal">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default ModalLoadingGlobal;
