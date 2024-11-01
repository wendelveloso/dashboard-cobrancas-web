import { useState, useRef, useEffect } from "react";

export const useModal = () => {
  const modalRef = useRef(null);
  const [modalTooltsOpen, setModalTooltsOpen] = useState(false);
  const [modalSecondOpen, setmodalSecondOpen] = useState(false);

  const handleToggleToolsModal = () => {
    setModalTooltsOpen((prev) => !prev);
  };

  const handleToggleSecondModal = () => {
    setmodalSecondOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalTooltsOpen(false);
      setmodalSecondOpen(false);
    }
  };
  const onClose = () => {
    // setModalTooltsOpen(false);
    setmodalSecondOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    modalRef,
    modalTooltsOpen,
    modalSecondOpen,
    handleToggleToolsModal,
    handleToggleSecondModal,
    onClose,
  };
};
