import jwtDecode from "jwt-decode";
import User from "../../models/user";
export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const ADD_TO_BLACK_LIST = "ADD_TO_BLACK_LIST";

// need for time ;
let timer;

export const authenticate = (isAdmin, email, userId, token) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      isAdmin: isAdmin,
      email: email,
      userId: userId,
      token: token,
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    let requestBody = {
      query: `
            query{
              login(email :"${email}" , password :"${password}"){
                token
                tokenExpiration
               }
            }
          `,
    };
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    // console.log(resData);
    const decodedToken = jwtDecode(resData.data.login.token);

    dispatch(
      authenticate(
        decodedToken.isAdmin,
        decodedToken.email,
        decodedToken.userId,
        resData.data.login.token
      )
      // resData.data.login.token,
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.data.login.tokenExpiration) * 1000
    );
    saveDataToLocalStorage(resData.data.login.token);
  };
};

export const logout = () => {
  //   clearLogoutTimer();
  localStorage.removeItem("userData");
  return { type: LOGOUT };
};

const saveDataToLocalStorage = (token) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
    })
  );
};

export const signIn = () => {
  return (dispatch) => {
    if (localStorage.getItem("userData")) {
      let tokenGot = localStorage.getItem("userData");
      let parsedToken = JSON.parse(tokenGot);
      // console.log(parsedToken?.token);
      const decodedToken = jwtDecode(tokenGot);

      // let token1 = JSON.parse(tokenGot);
      // console.log(token1);
      // console.log(tokenGot);

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("userData");
      } else {
        dispatch(
          authenticate(
            decodedToken.isAdmin,
            decodedToken.email,
            decodedToken.userId,
            parsedToken?.token
          )
        );
      }
    }
  };
};

export const signup = (
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  address
) => {
  return async (dispatch, getState) => {
    const requestBody = {
      query: `
            mutation CreateUser($email:String!, $password:String! , $firstName:String! , $lastName :String!, $phoneNumber:String! , $address:String!){
              createUser(userInput: {email :$email , password:$password  , firstName :$firstName , lastName :$lastName , phoneNumber :$phoneNumber , address :$address}){
                _id
                email
              }
            }
          `,
      variables: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: address,
      },
    };

    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch(login(email, password));
  };
};

export const addToBlackList = (userId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const requestBody = {
      query: `
        mutation { 
          addToBlackList(userId : "${userId}"){
            _id
          }
        }
      `,
    };
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: ADD_TO_BLACK_LIST, userId: userId });
  };
};

//
// const clearLogoutTimer = () => {
//   if (timer) {
//     clearTimeout(timer);
//   }
// };

// const setLogoutTimer = (expirationTime) => {
//   return (dispatch) => {
//     timer = setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime);
//   };
// };
