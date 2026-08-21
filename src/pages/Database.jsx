import { useEffect, useState } from "react"

import { getCards } from "../services/yugiohApi"
import Card from "../components/Card"

function Database() {

  // Cartas de la página actual
  const [cards, setCards] = useState([])

  // Página actual
  const [currentPage, setCurrentPage] = useState(1)

  // Número total de páginas de la API
  const [totalPages, setTotalPages] = useState(1)

  // Vista grid / list
  const [viewMode, setViewMode] = useState("grid")


  useEffect(() => {

    async function loadCards() {

      try {

        const result = await getCards(currentPage)

        // IMPORTANTE:
        // result.cards, no result.card
        setCards(result.cards)

        // La propia API ya nos da el total de páginas.
        setTotalPages(result.meta.total_pages)

      } catch (error) {

        console.error("Error cargando cartas:", error)

      }

    }

    loadCards()

  }, [currentPage])


  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1 className="mb-0">
          Card Database
        </h1>

        <div className="d-flex gap-2">

          <button
            className="btn btn-outline-light"
            onClick={() => setViewMode("grid")}
            title="Vista en cuadros"
          >
            ▦
          </button>

          <button
            className="btn btn-outline-light"
            onClick={() => setViewMode("list")}
            title="Vista en lista"
          >
            ☰
          </button>

        </div>

      </div>


      {viewMode === "grid" ? (

        <div className="row g-4">

          {cards.map((card) => (

            <div
              className="col-6 col-md-4 col-lg-3"
              key={card.id}
            >
              <Card card={card} />
            </div>

          ))}

        </div>

      ) : (

        <div className="d-flex flex-column gap-4">

          {cards.map((card) => (

            <div
              className="row align-items-start"
              key={card.id}
            >

              <div className="col-md-3 col-lg-2">

                <img
                  src={card.card_images[0].image_url}
                  className="img-fluid rounded"
                  alt={card.name}
                />

              </div>


              <div className="col-md-9 col-lg-10">

                <h2>
                  {card.name}
                </h2>


                <div className="d-flex flex-wrap gap-4 mb-3">

                  <span>
                    🃏 {card.type}
                  </span>

                  <span>
                    ◉ {card.race}
                  </span>

                  {card.misc_info?.[0]?.tcg_date && (
                    <span>
                      📅 TCG: {card.misc_info[0].tcg_date}
                    </span>
                  )}

                  {card.misc_info?.[0]?.ocg_date && (
                    <span>
                      📅 OCG: {card.misc_info[0].ocg_date}
                    </span>
                  )}

                </div>


                <p>
                  {card.desc}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* PAGINACIÓN DINÁMICA */}
      <nav className="mt-5">

        <ul className="pagination justify-content-center">

          <li
            className={`page-item ${
              currentPage === 1 ? "disabled" : ""
            }`}
          >

            <button
              className="page-link"
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              Anterior
            </button>

          </li>


          <li className="page-item disabled">

            <span className="page-link">
              Página {currentPage} de {totalPages}
            </span>

          </li>


          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >

            <button
              className="page-link"
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
            >
              Siguiente
            </button>

          </li>

        </ul>

      </nav>

    </div>
  )
}

export default Database