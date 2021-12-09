import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import AuthContext from "../../context/auth-context";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../features/actions/auth";

const MainNavigation = (props) => {
  const dispatch = useDispatch();

  const [nav, setNav] = useState(true);
  const token = useSelector((state) => state.user);

  return (
    <nav
      className="navbar navbar-expand-lg nav-active myNavbar    "
      id="ftco-navbar"
    >
      <div class="container">
        <NavLink className="navbar-brand" to="/">
          Car<span className="navbar-2logo">Book</span>
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="oi oi-menu"></span> Menu
        </button>

        <div class="collapse navbar-collapse" id="ftco-nav">
          <ul class="navbar-nav ml-auto">
            <li className="nav-item ">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cars">
                Cars
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>

            {!token?.email ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/auth">
                  Sign in
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/bookings">
                    Bookings
                  </NavLink>
                </li>
                {/* <li>
              <h4 className="nav-link" style={{ paddingTop: "19px" }}>
            
                Welcome ,
              </h4>
            </li> */}
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/"
                    onClick={() => dispatch(logout())}
                  >
                    Sign out
                  </NavLink>
                </li>
                <li style={{ paddingTop: "15px" }} className="nav-item">
                  <span style={{ fontSize: "20px", color: "#fff" }}>
                    Welcome ,
                    {token?.isAdmin ? (
                      <span style={{ fontSize: "18px", color: "#01d28e" }}>
                        {" " + "Admin"}
                      </span>
                    ) : (
                      <span style={{ fontSize: "18px", color: "#01d28e" }}>
                        {" " + token?.email?.split("@")[0]}
                      </span>
                    )}
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
