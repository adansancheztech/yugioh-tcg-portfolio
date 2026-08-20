import { useEffect, useState } from "react";

import { getCards } from "../services/yugiohApi";
import Card from "../components/Card";

function Database() {
  // Guarda las cartas recibidas desde la API.
  // Al principio está vacío hasta que llega la respuesta.
  const [cards, setCards] = useState([]);

  // Guarda la página actual.
  //
  // Página 1 → cartas 1-24
  // Página 2 → cartas 25-48
  // Página 3 → cartas 49-72
  // Página 4 → cartas 73-96
  const [currentPage, setCurrentPage] = useState(1);

  // Guarda el tipo de vista seleccionado.
  //
  // "grid" = vista en cuadros
  // "list" = vista en lista
  const [viewMode, setViewMode] = useState("grid");

  // useEffect se ejecuta:
  // 1. cuando Database aparece por primera vez
  // 2. cada vez que cambia currentPage
  useEffect(() => {
    // Función interna que carga las cartas.
    async function loadCards() {
      try {
        // Le pasamos a getCards la página actual.
        //
        // Ejemplo:
        // currentPage = 1 → getCards(1)
        // currentPage = 2 → getCards(2)
        const data = await getCards(currentPage);
        console.log(data[0]);

        // Guardamos las cartas recibidas en el estado.
        setCards(data);
      } catch (error) {
        // Si algo falla en la API lo vemos en consola.
        console.error("Error cargando cartas:", error);
      }
    }

    loadCards();
  }, [currentPage]);

  return (
    <div className="container py-4">
      {/* ==============================
          CABECERA
          ============================== */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Card Database</h1>

        {/* Botones para cambiar la vista */}
        <div className="d-flex gap-2">
          {/* Vista en cuadros */}
          <button
            className="btn btn-outline-light"
            onClick={() => setViewMode("grid")}
            title="Vista en cuadros"
          >
            ▦
          </button>

          {/* Vista en lista */}
          <button
            className="btn btn-outline-light"
            onClick={() => setViewMode("list")}
            title="Vista en lista"
          >
            ☰
          </button>
        </div>
      </div>

      {/* ==============================
          CONTENIDO
          ============================== */}

      {/* 
        Operador ternario:

        si viewMode === "grid"
              ↓
        mostramos la cuadrícula

        si no
              ↓
        mostramos la lista
      */}

      {viewMode === "grid" ? (
        // ==============================
        // VISTA CUADRÍCULA
        // ==============================

        <div className="row g-4">
          {cards.map((card) => (
            <div className="col-6 col-md-4 col-lg-3" key={card.id}>
              {/* 
                Card recibe una carta individual.

                En nuestra vista grid,
                Card muestra solamente la imagen.
              */}
              <Card card={card} />
            </div>
          ))}
        </div>
      ) : (
        // ==============================
        // VISTA LISTA
        // ==============================

        <div className="d-flex flex-column gap-4">
          {cards.map((card) => (
            <div className="row align-items-start" key={card.id}>
              {/* Imagen pequeña de la carta */}
              <div className="col-md-3 col-lg-2">
                <img
                  src={card.card_images[0].image_url}
                  className="img-fluid rounded"
                  alt={card.name}
                />
              </div>

              {/* Información de la carta */}
              <div className="col-md-9 col-lg-10">
                {/* Nombre */}
                <h2>{card.name}</h2>

                {/* 
  Información rápida de la carta.

  Los pequeños iconos permiten identificar
  visualmente cada dato sin tener que leerlo todo.
*/}
                <div className="d-flex flex-wrap gap-4 mb-3">
                  {/* Tipo de carta */}
                  <span>🃏 {card.type}</span>

                  {/* Raza / subtipo */}
                  <span>◉ {card.race}</span>

                  {/* Fecha de lanzamiento TCG */}
                  {/* 
  misc_info es un array.
  La información adicional de la carta está
  normalmente en la primera posición [0].
*/}
                  {card.misc_info?.[0]?.tcg_date && (
                    <span>📅 TCG: {card.misc_info[0].tcg_date}</span>
                  )}

                  {card.misc_info?.[0]?.ocg_date && (
                    <span>📅 OCG: {card.misc_info[0].ocg_date}</span>
                  )}
                </div>

                {/* Descripción / efecto de la carta */}
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==============================
          PAGINACIÓN
          ============================== */}

      <nav className="mt-5">
        <ul className="pagination justify-content-center">
          {/* 
            Creamos automáticamente:

            1
            2
            3
            4
          */}
          {[1, 2, 3, 4].map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              {/* 
                Cuando pulsamos una página:

                setCurrentPage(page)

                cambia currentPage.

                Como useEffect depende de currentPage,
                vuelve a pedir las cartas a la API.
              */}
              <button
                className="page-link"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Database;
