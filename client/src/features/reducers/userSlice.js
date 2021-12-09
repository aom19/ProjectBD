import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    authData: {
      token: null,
      tokenExpiration: 0,
    },
    user: null,
  },
  reducers: {
    authenticate: (state, action) => {
      state.user = action.payload;
    },
    signup: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      //   console.log(action.payload);
      let requestBody = {
        query: `
            query{
              login(email :"${action.payload.email}" , password :"${action.payload.password}"){
                token
                tokenExpiration
               }
            }
          `,
      };
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
          console.log(resData.data.login.token);

         
          //   if (resData.data.login.token) {
          //     context.login(
          //       resData.data.login.token,
          //       resData.data.login.userId,
          //       resData.data.login.tokenExpiration,
          //       resData.data.login.isAdmin,
          //       resData.data.login.email
          //     );
          // context.token = resData.data.login.token;
          // context.userId = resData.data.login.userId;
          //   }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout, signup } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
