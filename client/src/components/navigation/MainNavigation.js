import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import AuthContext from "../../context/auth-context";
// import "../../style/style.css";
import Auth from "../../pages/Auth";
import About from "../../pages/Auth";
import Contact from "../../pages/Auth";
import Cars from "../../pages/Auth";

const MainNavigation = (props) => {
  const context = useContext(AuthContext);
  const [nav, setNav] = useState(false);
  return (
    // <nav
    //   class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
    //   id="ftco-navbar"
    // >
    //   <div class="container">
    //     <NavLink class="navbar-brand" to="/">
    //       Car<span>Book</span>

    //     <div class="collapse navbar-collapse" id="ftco-nav">
    //       <ul class="navbar-nav ml-auto">
    //         <li class="nav-item">
    //           <NavLink class="nav-link" to="/about">
    //             About
    //           </NavLink>
    //         </li>

    //         <li class="nav-item">
    //           <NavLink class="nav-link" class="nav-link" to="/cars">
    //             Cars
    //           </NavLink>
    //         </li>

    //         <li class="nav-item">
    //           <NavLink class="nav-link" class="nav-link" to="/contact">
    //             Contact
    //           </NavLink>
    //         </li>
    //         <li class="nav-item">
    //           <NavLink class="nav-link" class="nav-link" to="/auth">
    //             Sign in
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
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
        <li>
          <NavLink className="nav-link" to="/auth">
            Sign in
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
