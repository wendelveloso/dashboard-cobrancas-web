import "./Home.css";
import {
  iconPaperBrown,
  iconPaperGreen,
  iconPaperYellow,
  iconArrowDownGreen,
  iconClientGreen,
  iconClientRed,
} from "../../components/Icons/icons";
import { getItem } from "../../utils/storage";
import { formatUserName } from "../../utils/nameUser";
// import { NavLink } from "react-router-dom";

export default function Home() {
  const fullName = getItem("userName");
  const { nameFormated, initials } = formatUserName(fullName);
  return (
    <div className="page__container">
      <header className="header__container">
        <h1>Resumo das cobranças</h1>
        <div className="header__options">
          <span className="icon_user">{initials}</span>
          <p>{nameFormated}</p>
          <img src={iconArrowDownGreen} alt="icon-arrow-down-green" />
        </div>
      </header>
      <main className="main__container">
        <section className="total__values">
          <div className="total__paid">
            <div className="charges paid">
              <img src={iconPaperGreen} alt="icon-paper-green" />
              <div className="text__container">
                <p>Cobraças Pagas</p>
                <p>R$ 30.000</p>
              </div>
            </div>
          </div>
          <div className="total__expired">
            <div className="charges expired">
              <img src={iconPaperBrown} alt="icon-paper-green" />
              <div className="text__container">
                <p>Cobranças Vencidas</p>
                <p>R$ 7.000</p>
              </div>
            </div>
          </div>
          <div className="total__expected">
            <div className="charges expected">
              <img src={iconPaperYellow} alt="icon-paper-green" />
              <div className="text__container">
                <p>Cobranças Previstas</p>
                <p>R$ 10.000</p>
              </div>
            </div>
          </div>
        </section>
        <section className="details__values">
          <div className="details__expired">
            <div className="details__header ">
              <h3>Cobranças Vencidas</h3>
              <p className="details_p-red">08</p>
            </div>
            <div className="details__header_info">
              <p>Cliente</p>
              <p>ID da cob.</p>
              <p>Valor</p>
            </div>
            <div className="details__info_container">
              <div className="details__info">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info2">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info3">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info4">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
            </div>
            <a href="#">Ver todos</a>
          </div>
          <div className="details__expired">
            <div className="details__header">
              <h3>Cobranças Previstas</h3>
              <p className="details_p-yellow">05</p>
            </div>
            <div className="details__header_info">
              <p>Cliente</p>
              <p>ID da cob.</p>
              <p>Valor</p>
            </div>
            <div className="details__info_container">
              <div className="details__info">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info2">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info3">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info4">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
            </div>
            <a href="#">Ver todos</a>
          </div>
          <div className="details__expired">
            <div className="details__header">
              <h3>Cobranças Pagas</h3>
              <p className="details_p-green">10</p>
            </div>
            <div className="details__header_info">
              <p>Cliente</p>
              <p>ID da cob.</p>
              <p>Valor</p>
            </div>
            <div className="details__info_container">
              <div className="details__info">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info2">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info3">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info4">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
            </div>
            <a href="#">Ver todos</a>
          </div>
        </section>
        <section className="client__value">
          <div className="client__red">
            <div className="client__header">
              <img src={iconClientRed} alt="icon-client-red" />
              <h3>Clientes Inadimplentes</h3>
              <p className="details_p-red">08</p>
            </div>
            <div className="client__header_info">
              <p>Clientes</p>
              <p>ID do clie.</p>
              <p>CPF</p>
            </div>
            <div className="client__header_container">
              <div className="client__info">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
              <div className="client__info2">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
              <div className="client__info3">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
              <div className="client__info4">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
            </div>
            <a href="#">Ver todos</a>
          </div>
          <div className="client__green">
            <div className="client__header">
              <img src={iconClientGreen} alt="icon-client-red" />
              <h3>Clientes em dia</h3>
              <p className="details_p-green">08</p>
            </div>
            <div className="client__header_info">
              <p>Clientes</p>
              <p>ID do clie.</p>
              <p>CPF</p>
            </div>
            <div className="client__header_container">
              <div className="client__info">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
              <div className="client__info2">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
              <div className="client__info3">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
              <div className="client__info4">
                <p>Sara Silva</p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
            </div>
            <a href="#">Ver todos</a>
          </div>
        </section>
      </main>
    </div>
  );
}
