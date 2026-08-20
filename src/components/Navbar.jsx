import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-warning">
      <div className="container-fluid">

        {/* Nombre / identidad de nuestra aplicación */}
        <NavLink className="navbar-brand fw-bold" to="/">
          YGO Archive
        </NavLink>

        {/* Botón que aparece cuando la pantalla es pequeña */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarYugioh"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navegación principal */}
        <div className="collapse navbar-collapse" id="navbarYugioh">
          <div className="navbar-nav">

            <NavLink className="nav-link" to="/">
              Home
            </NavLink>

            <NavLink className="nav-link" to="/database">
              Database
            </NavLink>

            <NavLink className="nav-link" to="/archetypes">
              Archetypes
            </NavLink>

            <NavLink className="nav-link" to="/sets">
              Sets
            </NavLink>

          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar