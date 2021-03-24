import React, { Component, useState, useContext } from "react";
import "./Auth.css";
import AuthContext from "../context/auth-context";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [values, setValues] = useState({
    email: "",
    password: "",
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

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    let requestBody = {
      query: `
        query{
          login(email :"${email}" , password :"${password}"){
            userId 
            token
            tokenExpiration
          }
        }
      `,
    };
    if (!isLogin) {
      requestBody = {
        query: `
          mutation{ 
            createUser(userInput: {email :"${email}" , password:"${password}" }){
              _id
              email
            }
          }
        `,
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
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login.token) {
          context.login(resData.data.login.token, resData.data.login.userId , resData.data.login.tokenExpiration);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="email"> Email </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="password"> Password </label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <button type="button" onClick={handleModeChange}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
        <button type="submit"> Submit</button>
      </div>
    </form>
  );
};

export default AuthPage;
