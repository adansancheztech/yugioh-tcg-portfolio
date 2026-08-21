import { Link } from "react-router-dom"


function Card({ card }) {
  return (

    // Toda la carta se convierte en un enlace.
    //
    // Ejemplo:
    // card.id = 38033121
    //        ↓
    // /cards/38033121
    <Link
      to={`/cards/${card.id}`}
      className="text-decoration-none"
    >

      <div className="h-100 yugioh-card">

        {/* Imagen completa de la carta */}
        <img
          src={card.card_images[0].image_url}
          className="img-fluid rounded"
          alt={card.name}
        />

      </div>

    </Link>

  )
}

export default Card