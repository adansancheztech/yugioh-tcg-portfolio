import { NavLink } from "react-router-dom";

import yami from "../assets/yami.png";
import yusei from "../assets/yusei.png";
import lilith from "../assets/lilith.png";

function Home() {
  return (
    <section className="home-hero">
      <div className="container">
        <div className="row align-items-center home-hero-content">
          {/* =========================
              PARTE IZQUIERDA
              ========================= */}
          <div className="col-lg-6">
            <h1 className="display-2 fw-bold">
              YU-GI-OH!
              <br />
              TCG DATABASE
            </h1>

            <p className="lead mt-4">
              Explora el universo de Yu-Gi-Oh! a través de cartas, arquetipos y
              expansiones.
            </p>

            <p>
              Proyecto desarrollado con React, Vite, Java, Bootstrap y YGOPRODeck API.
              <p>Adán Sánchez Jiménez</p>
            </p>

            <NavLink to="/database" className="btn btn-warning btn-lg mt-3">
              Explorar Database
            </NavLink>
          </div>

          {/* =========================
              PARTE DERECHA
              3 renders superpuestos
              ========================= */}
          <div className="col-lg-6">
            <div className="home-characters">
              <img
                src={yami}
                alt="Yami Yugi"
                className="character character-yami"
              />

              <img
                src={yusei}
                alt="Yusei Fudo"
                className="character character-yusei"
              />

              <img
                src={lilith}
                alt="Lilith"
                className="character character-lilith"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
