import { useState, useRef, useEffect } from "react";

export const useModal = () => {
  const [modalTooltsOpen, setModalTooltsOpen] = useState(false);
  const [modalSecondOpen, setModalSecondOpen] = useState(false);
  const [modalClientOpen, setModalClientOpen] = useState(false);

  const modalRef = useRef(null);
  const modalToolsRef = useRef(null);
  const modalClientRef = useRef(null);

  const handleToggleToolsModal = () => {
    setModalTooltsOpen((prev) => !prev);
  };

  const handleToggleSecondModal = () => {
    setModalSecondOpen((prev) => !prev);
  };
  const handleToggleClientModal = () => {
    setModalClientOpen((prev) => !prev);
  };

  const onClose = () => {
    setModalTooltsOpen(false);
    setModalSecondOpen(false);
    setModalClientOpen(false);
  };

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
        setModalTooltsOpen(false);
      }
    };
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
    modalToolsRef,
    modalClientRef,
    handleToggleClientModal,
    modalClientOpen,
  };
};
