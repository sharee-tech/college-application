import { NavLink } from "react-router-dom";

export default function Navbar({ logout, user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          College EP
        </NavLink>

        {user ? (
          <>
            <div class="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/search"
                  activeClassName="active"
                  className="nav-link"
                >
                  Search
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/favorites"
                  activeClassName="active"
                  className="nav-link"
                >
                  Favorites
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </li>
            </div>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav ms-auto">
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
              </div>
            </div>
          </>
        ) : (
          <>
            <div class="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/register"
                  activeClassName="active"
                  className="nav-link"
                >
                  Signup
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </li>
            </div>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    activeClassName="active"
                    className="nav-link"
                  >
                    Login
                  </NavLink>
                </li>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
