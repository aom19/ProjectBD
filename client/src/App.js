import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";
import EventPage from "./pages/Events";
import BookingPage from "./pages/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";

import MainNavigation from "./components/navigation/MainNavigation";
import AuthContext from "./context/auth-context";

import "./style/style.css";

import "./App.css";

import image1 from "./assets/bg_1.jpg";
import image2 from "./assets/bg_5.jpeg";
import image3 from "./assets/bg_6.jpeg";
import image4 from "./assets/bg_7.jpeg";
import { FaRoute, FaRegHandshake, FaMoneyBill } from "react-icons/fa";

function App() {
  const [state, setState] = useState({ img: 0 });

  const [values, setValues] = useState({
    token: null,
    userId: null,
    isAdmin: null,
    email: null,
  });

  const login = (token, userId, tokenExpiration, isAdmin, email) => {
    setValues({ token: token, userId: userId, isAdmin: isAdmin, email: email });
  };
  const logout = () => {
    setValues({ token: null, userId: null, isAdmin: null, email: null });
  };

  
  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider
          value={{
            token: values.token,
            userId: values.userId,
            isAdmin: values.isAdmin,
            email: values.email,
            login: login,
            logout: logout,
          }}
        >
          <MainNavigation />
          <div>
            <Switch>
              {/* {values.token && <Redirect from="/" to="/cars" exact />} */}
              {values.token && <Redirect from="/auth" to="/cars" exact />}

              {/* {!values.token && (
                <Route path="/auth" component={AuthPage} exact />
              )} */}
              <Route path="/" component={Home} exact />
              <Route path="/auth" component={AuthPage} exact />
              <Route path="/cars" component={EventPage} exact />
              <Route path="/about" component={About} exact />
              <Route path="/contact" component={Contact} exact />

              {/* {!values.token && <Redirect to="/auth" exact />} */}
              {values.token && (
                <Route path="/bookings" component={BookingPage} exact />
              )}
            </Switch>
          </div>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
