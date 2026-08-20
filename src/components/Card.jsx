function Card({ card }) {
  return (
    <div className="h-100">

      {/* 
        Vista en cuadros:
        mostramos únicamente la imagen completa de la carta.

        No añadimos nombre, tipo ni descripción porque
        esa información ya aparece físicamente en la carta.
      */}
      <img
        src={card.card_images[0].image_url}
        className="img-fluid rounded"
        alt={card.name}
      />

    </div>
  )
}

export default Card