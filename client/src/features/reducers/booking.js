import {
  DELETE_BOOKING,
  CREATE_BOOKING,
  SET_BOOKINGS,
  FILTER_CARS,
} from "../actions/booking";

import Booking from "../../models/booking";

const initialState = {
  pickUpLocation: "",
  dropOffLocation: "",
  pickUpDate: "",
  dropOffDate: "",

  allBookings: [],
  userBookings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKINGS:
      return {
        allBookings: action.allBookings,
        userBookings: action.userBookings,
      };
    case DELETE_BOOKING:
      return {
        // ...state,
        allBookings: state.allBookings.filter(
          (booking) => booking.id !== action.bookingId
        ),
        userBookings: state.userBookings.filter(
          (booking) => booking._id !== action.bookingId
        ),
      };
    case CREATE_BOOKING:
      const newBooking = new Booking(
        action._id,
        action.pickUpLocation,
        action.dropOffLocation,
        action.pickUpDate,
        action.dropOffDate
      );
      // console.log(state.allBookings);
      return {
        ...state,
        allBookings: state.allBookings.concat(
          action._id,
          action.pickUpLocation,
          action.dropOffLocation,
          action.pickUpDate,
          action.dropOffDate
        ),
        // userBookings: state.userBookings.concat(newBooking),
      };
    case FILTER_CARS:
      return {
        ...state,
        pickUpLocation: action.pickUpLocation,
        dropOffLocation: action.dropOffLocation,
        pickUpTime: action.pickUpTime,
        dropOffTime: action.dropOffTime,
      };
  }
  return state;
};
