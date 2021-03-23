import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/Auth";
import EventPage from "./pages/Events";
import BookingPage from "./pages/Booking";

import MainNavigation from "./components/navigation/MainNavigation";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            {/* <Route path="/" component={null} exact /> */}
            <Route path="/auth" component={AuthPage} exact />
            <Route path="/events" component={EventPage} exact />
            <Route path="/bookings" component={BookingPage} exact />
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
