import React, { Component, useState, useContext } from "react";
import "./Auth.scss";
import AuthContext from "../context/auth-context";
import { Alert } from "@material-ui/lab";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    nume: "",
    prenume: "",
    telefon: "",
    address: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = values.email;
    const password = values.password;
    const nume = values.nume;
    const prenume = values.prenume;
    const telefon = values.telefon;
    const address = values.address;

    // if (email.trim().length === 0 || password.trim().length === 0) {
    //   setIsError(true);
    // }
    let requestBody = {
      query: `
        query{
          login(email :"${email}" , password :"${password}"){
            userId 
            token
            tokenExpiration
           isAdmin
           email
            
          }
        }
      `,
    };
    //different type of fetching
    if (!isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email:String!, $password:String! , $nume:String! , $prenume :String!, $telefon:String! , $address:String!){ 
            createUser(userInput: {email :$email , password:$password  , nume :$nume , prenume :$prenume , telefon :$telefon , address :$address}){
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password,
          nume: nume,
          prenume: prenume,
          telefon: telefon,
          address: address,
        },
      };
    }

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          setIsError(true);
          throw new Error("Failed");
        }
        return res.json();
      })

      .then((resData) => {
        if (resData.data.login.token) {
          context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration,
            resData.data.login.isAdmin,
            resData.data.login.email
          );

          // context.token = resData.data.login.token;
          // context.userId = resData.data.login.userId;
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  };
  return (
    <div className="container">
      {/* {isError ? (
        <div class="alert alert-primary" role="alert">
          This is a primary alert—check it out!
        </div>
      ) : ( */}
      {isError ? (
        <Alert variant="filled" severity="error">
          Something went wrong!
        </Alert>
      ) : (
        <></>
      )}
      <div className="log-form">
        <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
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
                  id="nume"
                  name="nume"
                  placeholder="Name"
                  value={values.nume}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  id="prenume"
                  name="prenume"
                  placeholder="Last Name"
                  value={values.prenume}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  id="telefon"
                  name="telefon"
                  placeholder="Numar Telefon"
                  value={values.telefonn}
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
  );
};

export default AuthPage;
