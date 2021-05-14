import React, { createContext } from "react";

export default React.createContext({
  token: null,
  userId: null,
  isAdmin: null,
  email: null,
  login: (token, userId, tokenExpiration, isAdmin, email) => {},
  logout: () => {},
});
