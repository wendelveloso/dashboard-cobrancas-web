import { useState, useEffect, useRef } from "react";

export const useModal = () => {
  const [modalToolsOpen, setModalToolsOpen] = useState(false);
  const [modalSecondOpen, setModalSecondOpen] = useState(false);
  const [modalClientOpen, setModalClientOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalSecondOpen(false);
      }
      if (
        modalClientRef.current &&
        !modalClientRef.current.contains(event.target)
      ) {
        setModalClientOpen(false);
      }
      if (
        modalToolsRef.current &&
        !modalToolsRef.current.contains(event.target)
      ) {
        setModalToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const modalRef = useRef(null);
  const modalToolsRef = useRef(null);
  const modalClientRef = useRef(null);

  const handleToggleToolsModal = () => {
    setModalToolsOpen((prev) => !prev);
  };

  const handleToggleSecondModal = () => {
    setModalSecondOpen((prev) => !prev);
  };
  const handleToggleClientModal = () => {
    setModalClientOpen((prev) => !prev);
  };

  const onClose = () => {
    setModalToolsOpen(false);
    setModalSecondOpen(false);
    setModalClientOpen(false);
  };

  return {
    modalRef,
    modalToolsOpen,
    modalSecondOpen,
    handleToggleToolsModal,
    handleToggleSecondModal,
    onClose,
    modalToolsRef,
    modalClientRef,
    handleToggleClientModal,
    modalClientOpen,
  };
};
