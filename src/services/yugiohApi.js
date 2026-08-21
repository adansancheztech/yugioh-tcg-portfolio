// Número de cartas que queremos mostrar por página.
const CARDS_PER_PAGE = 24


// Esta función recibe la página actual.
//
// Devuelve:
// - data: las 24 cartas de esa página
// - meta: información de paginación de la API
export async function getCards(page = 1) {

  // Calculamos desde qué carta empieza la página.
  const offset = (page - 1) * CARDS_PER_PAGE

  const url =
    `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${CARDS_PER_PAGE}&offset=${offset}&misc=yes`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Error al obtener las cartas")
  }

  const json = await response.json()

  // Ahora devolvemos la respuesta completa que necesitamos.
  return {
    cards: json.data,
    meta: json.meta
  }
}

// Obtiene todos los arquetipos disponibles
// desde YGOPRODeck.
export async function getArchetypes() {

  const url =
    "https://db.ygoprodeck.com/api/v7/archetypes.php"

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Error al obtener los arquetipos")
  }

  const data = await response.json()

  return data
}


// Obtiene todas las cartas de un arquetipo concreto.
//
// Ejemplo:
// getCardsByArchetype("Blue-Eyes")
export async function getCardsByArchetype(archetypeName) {

  // Convierte caracteres especiales y espacios
  // para poder usar el nombre dentro de una URL.
  const name = encodeURIComponent(archetypeName)

  const url =
    `https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=${name}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Error al obtener las cartas del arquetipo")
  }

  const json = await response.json()

  // cardinfo devuelve las cartas dentro de data.
  return json.data
}

// Obtiene una carta concreta usando su ID.
//
// Ejemplo:
// getCardById(38033121)
export async function getCardById(cardId) {

  const url =
    `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardId}&misc=yes`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Error al obtener el detalle de la carta")
  }

  const json = await response.json()

  // La API devuelve un array dentro de data.
  // Como buscamos un único ID, usamos la primera posición.
  return json.data[0]
}