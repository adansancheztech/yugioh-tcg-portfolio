import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { getCardById } from "../services/yugiohApi"


function CardDetail() {

  // Recoge el ID desde la URL.
  //
  // Ejemplo:
  // /cards/38033121
  //
  // cardId = "38033121"
  const { cardId } = useParams()


  // Guarda los datos completos de la carta.
  const [card, setCard] = useState(null)


  // Cada vez que cambia el ID,
  // pedimos los datos de esa carta.
  useEffect(() => {

    async function loadCard() {

      try {

        const data = await getCardById(cardId)

        setCard(data)

      } catch (error) {

        console.error(
          "Error cargando detalle de carta:",
          error
        )

      }

    }

    loadCard()

  }, [cardId])


  // Mientras todavía no tenemos datos,
  // mostramos un mensaje sencillo.
  if (!card) {
    return (
      <div className="container py-5">
        <p>Cargando carta...</p>
      </div>
    )
  }


  return (
    <div className="container py-5">

      <div className="row g-5">


        {/* =========================
            IMAGEN
            ========================= */}
        <div className="col-lg-4">

          <img
            src={card.card_images[0].image_url}
            className="img-fluid rounded"
            alt={card.name}
          />

        </div>


        {/* =========================
            INFORMACIÓN
            ========================= */}
        <div className="col-lg-8">

          <h1 className="mb-4">
            {card.name}
          </h1>

          <p>
            <strong>Tipo:</strong> {card.type}
          </p>

          <p>
            <strong>Raza:</strong> {card.race}
          </p>

          {card.attribute && (
            <p>
              <strong>Atributo:</strong> {card.attribute}
            </p>
          )}

          {card.level && (
            <p>
              <strong>Nivel:</strong> {card.level}
            </p>
          )}

          {card.atk !== undefined && (
            <p>
              <strong>ATK:</strong> {card.atk}
            </p>
          )}

          {card.def !== undefined && (
            <p>
              <strong>DEF:</strong> {card.def}
            </p>
          )}

          {card.archetype && (
            <p>
              <strong>Arquetipo:</strong> {card.archetype}
            </p>
          )}

          <hr />

          <h3>Efecto / descripción</h3>

          <p>
            {card.desc}
          </p>

        </div>

      </div>

    </div>
  )
}

export default CardDetail