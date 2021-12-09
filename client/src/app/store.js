import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/reducers/userSlice";
import authReducer from "../features/reducers/auth";
import carsReducer from "../features/reducers/cars";
import bookingReducer from "../features/reducers/booking";

export default configureStore(
  {
    reducer: {
      //   user: userReducer,
      user: authReducer,
      cars: carsReducer,
      bookings: bookingReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
