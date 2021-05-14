import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import AuthContext from "../../context/auth-context";

const MainNavigation = (props) => {
  const context = useContext(AuthContext);

  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <a href="http://localhost:3000/cars">Booking</a>
        {/* <h1>Booking</h1> */}
      </div>
      <div className="main-navigation__items">
        <ul>
          <li>
            <NavLink to="/cars">Cars</NavLink>
          </li>
          {!context.token && (
            <li>
              <NavLink to="/auth">Authenticate</NavLink>
            </li>
          )}
          {context.token && (
            <React.Fragment>
              <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              <li>
                <button onClick={context.logout}> Logout</button>
              </li>
              <li>
                {context.isAdmin === "true" ? "Admin" : `${context.email}`}
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
