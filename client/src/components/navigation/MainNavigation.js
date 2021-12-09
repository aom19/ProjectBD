import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import AuthContext from "../../context/auth-context";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../features/actions/auth";

const MainNavigation = (props) => {
  const dispatch = useDispatch();

  const [nav, setNav] = useState(false);
  const token = useSelector((state) => state.user);

  return (
    <nav className={nav ? "nav active" : "nav"}>
      <NavLink className="navbar-brand" to="/">
        Car<span className="navbar-2logo">Book</span>
      </NavLink>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" for="menu-btn">
        <span className="nav-icon "> </span>
      </label>
      <ul className="menu">
        <li>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/cars">
            Cars
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/contact">
            Contact
          </NavLink>
        </li>

        {!token?.email ? (
          <li>
            <NavLink className="nav-link" to="/auth">
              Sign in
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink className="nav-link" to="/bookings">
                Bookings
              </NavLink>
            </li>
            {/* <li>
              <h4 className="nav-link" style={{ paddingTop: "19px" }}>
            
                Welcome ,
              </h4>
            </li> */}
            <li>
              <NavLink
                className="nav-link"
                to="/"
                onClick={() => dispatch(logout())}
              >
                Sign out
              </NavLink>
            </li>
            <li style={{ paddingTop: "15px" }}>
              <span style={{ fontSize: "20px", color: "#fff" }}>
                Welcome ,
                {token?.isAdmin ? (
                  <span style={{ fontSize: "18px", color: "#0d6efd" }}>
                    {" " + "Admin"} 
                  </span>
                ) : (
                  <span style={{ fontSize: "18px", color: "#0d6efd" }}>
                    {" " + token?.email?.split("@")[0]}
                  </span>
                )}
              </span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
