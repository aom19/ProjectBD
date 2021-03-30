import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";
import EventPage from "./pages/Events";
import BookingPage from "./pages/Booking";

import MainNavigation from "./components/navigation/MainNavigation";
import AuthContext from "./context/auth-context";

import "./App.css";

function App() {
  const [values, setValues] = useState({
    token: null,
    userId: null,
  });
  console.log(values);
  const login = (token, userId, tokenExpiration) => {
    setValues({ token: token, userId: userId });
  };
  const logout = () => {
    setValues({ token: null, userId: null });
  };

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider
          value={{
            token: values.token,
            userId: values.userId,
            login: login,
            logout: logout,
          }}
        >
          <MainNavigation />
          <main className="main-content">
            <Switch>
              {values.token && <Redirect from="/" to="/events" exact />}
              {values.token && <Redirect from="/auth" to="/events" exact />}

              {!values.token && (
                <Route path="/auth" component={AuthPage} exact />
              )}
              <Route path="/events" component={EventPage} exact />
              {!values.token && <Redirect to="/auth" exact />}
              {values.token && (
                <Route path="/bookings" component={BookingPage} exact />
              )}
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
