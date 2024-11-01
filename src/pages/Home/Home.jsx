import "./Home.css";
import {
  iconPaperBrown,
  iconPaperGreen,
  iconPaperYellow,
  iconClientGreen,
  iconClientRed,
  iconClose,
  iconEyes,
} from "../../components/Icons/icons";
import Header from "../../components/Header/Header";
import ModalEditUser from "../../components/ModalEditUser/ModalEditUser";
// import { NavLink } from "react-router-dom";
// import { useState } from 'react';

export default function Home() {
  return (
    <div className="page__container">
      <Header title="Resumo das cobranças" titleStyle="header__title--home" />
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
                <p>Wendel Moreira Velosodddfffggggg</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info">
                <p>Wendel Moreira Velosodddfffggggg</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info">
                <p>Wendel Moreira Velosodddfffggggg</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info ">
                <p>Lara Brito</p>
                <p>223456787</p>
                <p>R$ 900,00</p>
              </div>
            </div>
            <a href="#">Ver todos</a>
          </div>
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
                <p>Wendel Moreira Velosodddfffggggg</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info">
                <p>Wendel Moreira Velosodddfffggggg</p>
                <p>223456787</p>
                <p>R$ 100,00</p>
              </div>
              <div className="details__info">
                <p>Wendel Moreira Velosodddfffggggg</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info">
                <p>Wendel Moreira Velosodddfffggggg</p>
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
                <p>Wendel Moreira Velosodddfffggggg</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info">
                <p>Wendel Moreira Velosodddfffggggg</p>
                <p>223456787</p>
                <p>R$ 1000,00</p>
              </div>
              <div className="details__info">
                <p>Wendel Moreira Velosodddfffggggg</p>
                <p>223456787</p>
                <p className="home__name_size">R$ 1000,00</p>
              </div>
              <div className="details__info">
                <p>Wendel Moreira Velosodddfffggggg</p>
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
                <p className="home__name_size-bottom">Wendel Moreira</p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
              <div className="client__info">
                <p className="home__name_size-bottom">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
              <div className="client__info">
                <p className="home__name_size-bottom">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
              <div className="client__info">
                <p className="home__name_size-bottom">
                  Wendel Moreira Velosodddfffggggg
                </p>
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
                <p className="home__name_size-bottom">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
              <div className="client__info">
                <p className="home__name_size-bottom">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
              <div className="client__info">
                <p className="home__name_size-bottom">
                  Wendel Moreira Velosodddfffggggg
                </p>
                <p>223456787</p>
                <p>041.477.456-56</p>
              </div>
              <div className="client__info">
                <p className="home__name_size-bottom">
                  Wendel Moreira Velosodddfffggggg
                </p>
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
