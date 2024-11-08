import "./Header.css";
import {
  iconArrowDownGreen,
  iconEdit,
  iconExit,
} from "../../components/Icons/icons";
import { getItem } from "../../utils/storage";
import { formatUserName } from "../../utils/nameUser";
import { useState, useRef, useEffect } from "react";
import ModalEditUser from "../ModalEditUser/ModalEditUser";
import { useNavigate } from "react-router-dom";
import { clear } from "../../utils/storage";

export default function Header({ title, titleStyle, subTitle, titleStyle2 }) {
  const [optionsOn, setOptionsOn] = useState(false);
  const [modalOpen, setModalTooltsOpen] = useState(false);
  const [fullName, setFullName] = useState(getItem("userName"));
  const { nameFormated, initials } = formatUserName(fullName);

  const optionsRef = useRef(null);
  const modalRef = useRef(null);

  const handleAddUser = (newUser) => {
    setClients((prevUser) => [newUser, ...prevUser]);
    setAllClients((prevAllUser) => [newUser, ...prevAllUser]);
  };

  const toggleOptionsDisplay = () => {
    setOptionsOn(!optionsOn);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    clear();
    navigate("/");
  };

  const openModal = () => {
    setOptionsOn(false);
    setModalTooltsOpen(true);
  };

  const closeModal = () => {
    setModalTooltsOpen(false);
  };
  useEffect(() => {
    const updatedName = getItem("userName"); 
    setFullName(updatedName); 
  }, [modalOpen]); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }

      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOptionsOn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {modalOpen && (
        <ModalEditUser
          onAddUser={handleAddUser}
          modalRef={modalRef}
          onClose={closeModal}
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
        <div
          className={`user__options ${optionsOn ? "visible" : ""}`}
          ref={optionsRef}
        >
          <div className="polygon__header "></div>
          <img src={iconEdit} alt="icon-edit" onClick={openModal} />
          <img src={iconExit} alt="icon-exit" onClick={handleLogout} />
        </div>
      </header>
    </>
  );
}
