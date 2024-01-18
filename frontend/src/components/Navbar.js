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
            <div className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/search"
                  activeclassname="active"
                  className="nav-link"
                >
                  Search
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/favorites"
                  activeclassname="active"
                  className="nav-link"
                >
                  Favorites
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </li>
            </div>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink
                    to="/profile"
                    activeclassname="active"
                    className="nav-link"
                  >
                    {user.username}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    activeclassname="active"
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
            <div className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/search"
                  activeclassname="active"
                  className="nav-link"
                >
                  Search
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/register"
                  activeclassname="active"
                  className="nav-link"
                >
                  Signup
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </li>
            </div>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    activeclassname="active"
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
