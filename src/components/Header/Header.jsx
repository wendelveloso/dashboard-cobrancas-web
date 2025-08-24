import "./Header.css";
import {
  iconArrowDownGreen,
  iconEdit,
  iconExit,
} from "../../components/Icons/icons";
import { getItem, setItem } from "../../utils/storage";
import { formatUserName } from "../../utils/nameUser";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clear } from "../../utils/storage";
import { useModal } from "../../utils/useModal";
import ModalEditUser from "../ModalEditUser/ModalEditUser";
import { useChargesContext } from "../../context/ChargesContext";

export default function Header({ title, titleStyle, subTitle, titleStyle2 }) {
  const [fullName, setFullName] = useState("");
  const { nameFormated, initials } = formatUserName(fullName);
  const [optionsOn, setOptionsOn] = useState(false);
  const { clearChargesContext } = useChargesContext();
  const navigate = useNavigate();
  useEffect(() => {
    const storedName = getItem("userName") || "";
    setFullName(storedName);

    const handleStorageChange = () => {
      const stored = getItem("userName") || "";
      setFullName(stored);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const { modalRef, modalSecondOpen, handleToggleSecondModal, onClose } =
    useModal();

  const handleAddUser = (updatedUser) => {
    const nome = updatedUser.nome || updatedUser;
    setFullName(nome);
    setItem("userName", nome);
  };

  const handleLogout = () => {
    clear();
    clearChargesContext();
    navigate("/login", { replace: true });
  };

  const toggleOptionsDisplay = () => {
    setOptionsOn(!optionsOn);
  };

  return (
    <>
      {modalSecondOpen && (
        <ModalEditUser
          modalRef={modalRef}
          onClose={onClose}
          onAddUser={handleAddUser}
        />
      )}
      <header className="header__container">
        <div className="header__first-group">
          <h1 className={`${titleStyle}`}>{title}</h1>
          <p className={`${titleStyle2}`}>{subTitle}</p>
        </div>
        <div className="header__options">
          <span className="icon_user">{initials}</span>
          <div className="user__name" onClick={toggleOptionsDisplay}>
            <p>{nameFormated}</p>
            <img src={iconArrowDownGreen} alt="icon-arrow-down-green" />
          </div>
        </div>
        <div className={`user__options ${optionsOn ? "visible" : ""}`}>
          <div className="polygon__header"></div>
          <img
            src={iconEdit}
            alt="icon-edit"
            onClick={() => {
              handleToggleSecondModal();
              toggleOptionsDisplay();
            }}
          />
          <img src={iconExit} alt="icon-exit" onClick={handleLogout} />
        </div>
      </header>
    </>
  );
}
