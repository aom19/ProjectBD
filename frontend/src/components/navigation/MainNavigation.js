import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css";
import AuthContext from "../../context/auth-context";

const MainNavigation = (props) => {
  const context = useContext(AuthContext);

  return (
    <header className="main-navigation">
      <div className="main-navigation_logo">
        <h1>Booking</h1>
      </div>
      <div className="main-navigation_items">
        <ul>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          {!context.token && (
            <li>
              <NavLink to="/auth">Authenticate</NavLink>
            </li>
          )}
          {context.token && (
            <li>
              <NavLink to="/bookings">Bookings</NavLink>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default MainNavigation;
