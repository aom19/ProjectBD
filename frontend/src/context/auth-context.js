import React, { createContext } from "react";

export default React.createContext({
  token: null,
  userId: null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {},
});
