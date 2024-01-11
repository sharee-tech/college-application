import { NavLink } from "react-router-dom";

export default function Navbar({ logout, user }) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand" href="/">
          College EP
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink
                to="/search"
                activeClassName="active"
                className="nav-link"
              >
                Search
              </NavLink>
            </li>

            {user ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    to="/favorites"
                    activeClassName="active"
                    className="nav-link"
                  >
                    Favorites
                  </NavLink>
                </li>
                <div className="collapse navbar-collapse justify-content-end">
                  <ul className="navbar-nav ">
                    <li className="nav-item">
                      <NavLink
                        to="/profile"
                        activeClassName="active"
                        className="nav-link"
                      >
                        {user.username}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/login"
                        activeClassName="active"
                        className="nav-link"
                        onClick={logout}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    activeClassName="active"
                    className="nav-link"
                  >
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/register"
                    activeClassName="active"
                    className="nav-link"
                  >
                    Signup
                  </NavLink>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
