import React, { Component, useState, useContext } from "react";

import { useDispatch } from "react-redux";

// import { login, signup } from "../features/reducers/userSlice";
import "./Auth.scss";
import AuthContext from "../context/auth-context";
import Alert from "@material-ui/lab/Alert";

import image1 from "../assets/img1.jpeg";

import * as authActions from "../features/actions/auth";
import * as bookingActions from "../features/actions/booking";

import Section from "../components/Section/Section";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });

  const dispatch = useDispatch();

  const context = useContext(AuthContext);

  const handleModeChange = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = values.email;
    const password = values.password;
    const firstName = values.firstName;
    const lastName = values.lastName;
    const phoneNumber = values.phoneNumber;
    const address = values.address;

    if (!isLogin) {
      // action = authActions.signup(
      //   formState.inputValues.email,
      //   formState.inputValues.password
      // );
      // dispatch(
      //   signup({
      //     email: email,
      //     password: password,
      //     firstName: firstName,
      //     lastName: lastName,
      //     phoneNumber: phoneNumber,
      //     address: address,
      //   })
      // );
      let action = authActions.signup(
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        address
      );
      try {
        await dispatch(action);
        // await dispatch(bookingActions.fetchBookings());
        // props.navigation.navigate('Shop');
      } catch (err) {
        console.log(err.message);
      }
    } else {
      // dispatch(login({ email: email, password: password }));
      let action = authActions.login(email, password);
      try {
        await dispatch(action);
        await dispatch(bookingActions.fetchBookings());
        // props.navigation.navigate('Shop');
      } catch (err) {
        console.log(err.message);
      }
    }

    // if (email.trim().length === 0 || password.trim().length === 0) {
    //   setIsError(true);
    // }
    // let requestBody = {
    //   query: `
    //     query{
    //       login(email :"${email}" , password :"${password}"){
    //         userId
    //         token
    //         tokenExpiration
    //        isAdmin
    //        email

    //       }
    //     }
    //   `,
    // };
    // //different type of fetching
    // if (!isLogin) {
    //   requestBody = {
    //     query: `
    //       mutation CreateUser($email:String!, $password:String! , $nume:String! , $prenume :String!, $telefon:String! , $address:String!){
    //         createUser(userInput: {email :$email , password:$password  , nume :$nume , prenume :$prenume , telefon :$telefon , address :$address}){
    //           _id
    //           email
    //         }
    //       }
    //     `,
    //     variables: {
    //       email: email,
    //       password: password,
    //       nume: nume,
    //       prenume: prenume,
    //       telefon: telefon,
    //       address: address,
    //     },
    //   };
    // }

    // fetch("http://localhost:8000/graphql", {
    //   method: "POST",
    //   body: JSON.stringify(requestBody),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       setIsError(true);
    //       throw new Error("Failed");
    //     }
    //     return res.json();
    //   })

    //   .then((resData) => {
    //     if (resData.data.login.token) {
    //       context.login(
    //         resData.data.login.token,
    //         resData.data.login.userId,
    //         resData.data.login.tokenExpiration,
    //         resData.data.login.isAdmin,
    //         resData.data.login.email
    //       );

    //       // context.token = resData.data.login.token;
    //       // context.userId = resData.data.login.userId;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsError(true);
    //   });
  };
  return (
    <div>
      <div>
        <Section
          image={image1}
          page={!isLogin ? "Sign Up" : "Sign In"}
          name={!isLogin ? "Sign Up" : "Sign In"}
        />
        {/* <section
          class="hero-wrap hero-wrap-2 js-fullheight ftco-degree-bg"
          style={{
            backgroundImage: `url(${image3})`,
            // backgroundSize: "cover",
            backgroundPosition: "center",
            // overflow: "hidden",
            zIndex: -999,
          }}
          data-stellar-background-ratio="0.5"
        >
          <div class="overlay"></div>
          <div class="container">
            <div class="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
              <div class="col-md-9  pb-5">
                <p class="breadcrumbs">
                  <span>
                    Sign In <i class="ion-ios-arrow-forward"></i>
                  </span>
                </p>
                <h1 class="mb-3 bread"> Sign In</h1>
              </div>
            </div>
          </div>
        </section> */}
      </div>
      <div className="container">
        <div className="log-form">
          <form className="col-md-12" onSubmit={handleSubmit}>
            <h2>{isLogin ? "Please  Sign In" : "Please Sign Up"}</h2>
            <hr className="divisor" />
            {isLogin ? (
              <>
                <div className="form-control">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  {/* <label htmlFor="password"> Password </label> */}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-control">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  {/* <label htmlFor="password"> Password </label> */}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    id="addresss"
                    name="address"
                    placeholder="Address"
                    value={values.address}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div className="form-actions">
              <button type="button" className="btn" onClick={handleModeChange}>
                Switch to {isLogin ? "Signup" : "Login"}
              </button>
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default AuthPage;
