// Número de cartas que queremos mostrar por página.
const CARDS_PER_PAGE = 24


// Esta función recibe el número de página actual.
//
// Su trabajo es:
// 1. Calcular desde qué carta debe empezar.
// 2. Consultar YGOPRODeck.
// 3. Devolver las cartas de esa página.
export async function getCards(page = 1) {

  // Página 1 → (1 - 1) * 24 = 0
  // Página 2 → (2 - 1) * 24 = 24
  // Página 3 → (3 - 1) * 24 = 48
  // Página 4 → (4 - 1) * 24 = 72
  const offset = (page - 1) * CARDS_PER_PAGE

  const url =
    `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=${CARDS_PER_PAGE}&offset=${offset}&misc=yes`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Error al obtener las cartas")
  }

  const json = await response.json()

  return json.data
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