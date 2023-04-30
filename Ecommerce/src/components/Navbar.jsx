import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Authentication from "../store/auth-context";
function Navbar() {
  const cntx = useContext(Authentication);
  return (
    <>
      <nav className="navbar navbar-expand-lg {{fixed-top}} navbar-light  bg-light">
        <Link className="navbar-brand" to="/home">
          ClothesMart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {cntx.is_logged_in ? (
              <>
                <li className="nav-item a">
                  <Link className="nav-link" to="/">
                    {cntx.auth.name}
                  </Link>
                </li>
                {cntx.auth.role == 1 ? (
                  <>
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle btn btn-outline-info text-lights me-2 "
                        to="#"
                        id="navbarDropdown1"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Seller
                      </Link>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown1"
                      >
                        <Link className="dropdown-item" to="/seller">
                          Seller Panel
                        </Link>
                        <Link className="dropdown-item" to="/seller/delivery">
                          Your Deliveries
                        </Link>
                      </div>
                    </li>
                  </>
                ) : null}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle btn btn-outline-info me-2 mx-2"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUser} size="lg" />
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/placeorder/myorders">
                      MyOrders
                    </Link>
                    <button className="dropdown-item" onClick={cntx.onLogout}>
                      Logout
                    </button>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/changepass">
                      Change <br />
                      Password
                    </Link>
                  </div>
                </li>
                <li className="nav-item a">
                  <Link className="nav-link" to="/cart">
                    <FontAwesomeIcon icon={faCartShopping} size="lg" />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
