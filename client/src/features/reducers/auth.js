import {
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AL,
  ADD_TO_BLACK_LIST,
  SIGNUP,
  // LOGIN,
} from "../actions/auth";

const initialState = {
  email: null,
  isAdmin: false,
  token: null,
  userId: null,
  isInBlackList: false,
  //   didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        isAdmin: action.isAdmin,
        email: action.email,
        userId: action.userId,
        token: action.token,
      };
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    case SIGNUP:
      return {
        isAdmin: action.isAdmin,
        email: action.email,
        userId: action.userId,
        token: action.token,
      };
    case ADD_TO_BLACK_LIST: {
      return {
        userId: action.userId,
        isInBlackList: true,
      };
    }
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    default:
      return state;
  }
};
