import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { getCardsByArchetype } from "../services/yugiohApi"
import Card from "../components/Card"


function ArchetypeDetail() {

  // Recoge el nombre del arquetipo desde la URL.
  //
  // Ejemplo:
  // /archetypes/Blue-Eyes
  //
  // archetypeName = "Blue-Eyes"
  const { archetypeName } = useParams()


  // Guarda todas las cartas del arquetipo.
  const [cards, setCards] = useState([])


  // Cada vez que cambia el nombre del arquetipo,
  // pedimos sus cartas a la API.
  useEffect(() => {

    async function loadCards() {

      try {

        const data =
          await getCardsByArchetype(archetypeName)

        // Guardamos todas las cartas.
        setCards(data)

      } catch (error) {

        console.error(
          "Error cargando cartas del arquetipo:",
          error
        )

      }

    }

    loadCards()

  }, [archetypeName])


  return (
    <div className="container-fluid px-4 py-4">

      {/* Nombre del arquetipo */}
      <h1 className="mb-2">
        {archetypeName}
      </h1>


      {/* Número total de cartas */}
      <p className="mb-4">
        {cards.length} cartas
      </p>


      {/* 
        Galería responsive.

        móvil      -> 2 cartas por fila
        tablet     -> 4 cartas por fila
        escritorio -> 8 cartas por fila
      */}
      <div className="archetype-grid">
        {cards.map((card) => (

          <div
            key={card.id}
          >

            {/* Reutilizamos el mismo Card.jsx de Database */}
            <Card card={card} />

          </div>

        ))}

      </div>

    </div>
  )
}

export default ArchetypeDetail