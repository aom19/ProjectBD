export const DELETE_BOOKING = "DELETE_BOOKING";
export const CREATE_BOOKING = "CREATE_BOOKING";
// export const UPDATE_CAR = "UPDATE_CAR";
export const SET_BOOKINGS = "SET_BOOKINGS";
export const FILTER_CARS = "FILTER_CARS";

export const fetchBookings = () => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    const userId = getState().user.userId;
    // const isAdmin = getState().user.isAdmin;

    // console.log(parsedToken?.token);
    // const userId = getState().user.userId;
    const requestBody = {
      query: `
      query { 
        allBookings{
          _id
          pickUpLocation
          dropOffLocation
          pickUpDate
          dropOffDate
         
          user{
            _id
            email
          }
          event{
              _id
              
          }
        }
      }
    `,
    };
    try {
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
      const resData = await response.json();

      // console.log(resData);
      const fetchedBookings = resData.data.allBookings;

      dispatch({
        type: SET_BOOKINGS,
        allBookings: fetchedBookings,
        userBookings: fetchedBookings.filter((car) => car.user._id === userId),
      });
    } catch (err) {
      console.log(err);
    }
  };
};
// export const fetchAllBookings = () => {
//   return async (dispatch, getState) => {
//     const token = getState().user.token;
//     const userId = getState().user.userId;
//     // const isAdmin = getState().user.isAdmin;
//     console.log(token);
//     // console.log(parsedToken?.token);
//     // const userId = getState().user.userId;
//     const requestBody = {
//       query: `
//       query {
//         allBookings{
//           _id
//           pickUpLocation
//           dropOffLocation
//           pickUpDate
//           dropOffDate

//           user{
//             _id
//             email
//           }
//           event{
//               _id

//           }
//         }
//       }
//     `,
//     };
//     try {
//       const response = await fetch("http://localhost:8000/graphql", {
//         method: "POST",
//         body: JSON.stringify(requestBody),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + token,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Something went wrong!");
//       }
//       const resData = await response.json();

//       const fetchedBookings = resData.data.allBookings;
//       console.log(fetchedBookings);
//       dispatch({
//         type: SET_BOOKINGS,
//         allBookings: fetchedBookings,
//         // userBookings: fetchedBookings.filter((car) => car.user._id === userId),
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export const cancelBooking = (bookingId) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    const requestBody = {
      query: `
    mutation CancelBooking($id : ID!) { 
      cancelBooking(bookingId :$id){
        _id
        
      }
    }
  `,
      variables: {
        id: bookingId,
      },
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
    dispatch({
      type: DELETE_BOOKING,
      bookingId: bookingId,
    });
  };
};

export const createBooking = (
  carId,
  pickUpLocation,
  dropOffLocation,
  pickUpDate,
  dropOffDate
) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    // const userId = getState().user.userId;
    // const isAdmin = getState().user.isAdmin;

    // console.log(
    //   carId,
    //   pickUpLocation,
    //   dropOffLocation,
    //   pickUpDate,
    //   dropOffDate
    // );

    const requestBody = {
      query: `
      mutation 
        bookEvent( 
          $eventId : ID!
          $bookingInput :BookingInput
         
        ){
          bookEvent(
            eventId : $eventId
            bookingInput:$bookingInput 
          ){
            _id
          }
        }
    `,
      variables: {
        eventId: carId,
        bookingInput: {
          pickUpLocation: pickUpLocation,
          dropOffLocation: dropOffLocation,
          pickUpDate: pickUpDate,
          dropOffDate: dropOffDate,
        },
      },
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

    dispatch({
      type: CREATE_BOOKING,
      _id: carId,
      pickUpLocation: pickUpLocation,
      dropOffLocation: dropOffLocation,
      pickUpDate: pickUpDate,
      dropOffDate: dropOffDate,
    });
  };
};

export const filterCars = (
  pickUpLocation,
  pickUpDate,
  dropOffLocation,
  dropOffDate
) => {
  return async (dispatch) => {
    dispatch({
      type: FILTER_CARS,
      pickUpLocation: pickUpLocation,
      pickUpDate: pickUpDate,
      dropOffLocation: dropOffLocation,
      dropOffDate: dropOffDate,
    });
  };
};
