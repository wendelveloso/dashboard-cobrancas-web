import "../Header/Header.css";
import {
  iconArrowDownGreen
} from "../../components/Icons/icons";
import { getItem } from "../../utils/storage";
import { formatUserName } from "../../utils/nameUser";

function Header({ title, titleStyle }) {
  const fullName = getItem("userName");
  const { nameFormated, initials } = formatUserName(fullName);

  return (
    <header className="header__container">
      <h1 className={`header__title ${titleStyle}`}>{title}</h1>
      <div className="header__options">
        <span className="icon_user">{initials}</span>
        <p>{nameFormated}</p>
        <img src={iconArrowDownGreen} alt="icon-arrow-down-green" />
      </div>
    </header>
  );
}

export default Header;
