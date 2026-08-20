import { useEffect, useState } from "react";
import { getArchetypes } from "../services/yugiohApi";
import { Link } from "react-router-dom";

function Archetypes() {
  // Número de arquetipos que mostraremos en cada página.
  const ARCHETYPES_PER_PAGE = 24;

  // Guarda todos los arquetipos recibidos desde la API.
  const [archetypes, setArchetypes] = useState([]);

  // Guarda la página actual.
  const [currentPage, setCurrentPage] = useState(1);

  // Cuando se carga la página pedimos todos los arquetipos.
  useEffect(() => {
    async function loadArchetypes() {
      try {
        const data = await getArchetypes();

        // Ordenamos primero los arquetipos que empiezan por letras A-Z.
        // Los que empiezan por números o símbolos se mandan al final.
        const sortedArchetypes = [...data].sort((a, b) => {
          const nameA = a.archetype_name;
          const nameB = b.archetype_name;

          // Comprueba si el primer carácter es una letra.
          const startsWithLetterA = /^[A-Za-z]/.test(nameA);
          const startsWithLetterB = /^[A-Za-z]/.test(nameB);

          // A empieza por letra y B no -> A va primero.
          if (startsWithLetterA && !startsWithLetterB) {
            return -1;
          }

          // B empieza por letra y A no -> B va primero.
          if (!startsWithLetterA && startsWithLetterB) {
            return 1;
          }

          // Si ambos pertenecen al mismo grupo,
          // los ordenamos alfabéticamente.
          return nameA.localeCompare(nameB);
        });

        // Guardamos los datos ya ordenados.
        setArchetypes(sortedArchetypes);
      } catch (error) {
        console.error("Error cargando arquetipos:", error);
      }
    }

    // Ejecutamos la función que acabamos de crear.
    loadArchetypes();
  }, []);

  // Calculamos desde qué posición empieza la página actual.
  //
  // Página 1:
  // (1 - 1) * 24 = 0
  //
  // Página 2:
  // (2 - 1) * 24 = 24
  const startIndex = (currentPage - 1) * ARCHETYPES_PER_PAGE;

  // slice() crea un nuevo array con solo los 24
  // arquetipos que corresponden a la página actual.
  const visibleArchetypes = archetypes.slice(
    startIndex,
    startIndex + ARCHETYPES_PER_PAGE,
  );

  // Calculamos cuántas páginas necesitamos en total.
  const totalPages = Math.ceil(archetypes.length / ARCHETYPES_PER_PAGE);

  return (
    <div className="container py-4">
      {/* Título */}
      <h1 className="mb-4">Archetypes</h1>

      {/* ============================
          LISTA DE ARQUETIPOS
          ============================ */}

      <div className="d-flex flex-column gap-3">
        {visibleArchetypes.map((archetype) => (
          <Link
            key={archetype.archetype_name}
            // Creamos una URL usando el nombre del arquetipo.
            //
            // Ejemplo:
            // Blue-Eyes
            //      ↓
            // /archetypes/Blue-Eyes
            to={`/archetypes/${encodeURIComponent(archetype.archetype_name)}`}
            // Quitamos el aspecto típico de un enlace.
            className="text-decoration-none text-white"
          >
            <div className="border rounded p-3">
              <h4 className="mb-0">{archetype.archetype_name}</h4>
            </div>
          </Link>
        ))}
      </div>

      {/* ============================
          PAGINACIÓN
          ============================ */}

      <nav className="mt-5">
        <ul className="pagination justify-content-center">
          {/* Botón anterior */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </button>
          </li>

          {/* Página actual / páginas totales */}
          <li className="page-item disabled">
            <span className="page-link">
              Página {currentPage} de {totalPages}
            </span>
          </li>

          {/* Botón siguiente */}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Archetypes;
