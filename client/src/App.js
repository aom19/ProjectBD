import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AuthPage from "./pages/Auth";
import EventPage from "./pages/Events";
import BookingPage from "./pages/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import SingleCar from "./pages/SingleCar";
import SingleBookingPage from "./pages/SingleBookingPage";

import MainNavigation from "./components/navigation/MainNavigation";
import AuthContext from "./context/auth-context";

import "./style/style.css";

import "./App.css";
//images
import image1 from "./assets/bg_1.jpg";
import image2 from "./assets/bg_5.jpeg";
import image3 from "./assets/bg_6.jpeg";
import image4 from "./assets/bg_7.jpeg";

import { FaRoute, FaRegHandshake, FaMoneyBill } from "react-icons/fa";

//actions

import { signIn } from "./features/actions/auth";

function App() {
  const [state, setState] = useState({ img: 0 });
  const dispatch = useDispatch();

  useEffect(async () => {
    //cehck token in localStorage
    await dispatch(signIn());
  }, []);
  const token = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <div>
          <Switch>
            {/* {values.token && <Redirect from="/" to="/cars" exact />} */}
            {token?.token && <Redirect from="/auth" to="/cars" exact />}
            {/* {!values.token && (
                <Route path="/auth" component={AuthPage} exact />
              )} */}
            <Route path="/" component={Home} exact />
            <Route path="/auth" component={AuthPage} exact />
            <Route path="/cars" component={EventPage} exact />
            <Route path="/about" component={About} exact />
            <Route path="/contact" component={Contact} exact />
            <Route path="/car/:id" component={SingleCar} exact />
            {!token?.token && <Redirect from="/bookings" to="/auth" exact />}
            {/* {!values.token && <Redirect to="/auth" exact />} */}
            {token?.token && (
              <Route path="/bookings" component={BookingPage} exact />
            )}
            {token?.token && (
              <Route path="/bookings/:id" component={SingleBookingPage} exact />
            )}
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
