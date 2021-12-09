import { Token } from "graphql";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spiner/Spinner";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import BookingList from "../components/Bookings/BookingList/BookingList";

import image1 from "../assets/bg_7.jpeg";

import Section from "../components/Section/Section";
import * as carsActions from "../features/actions/cars";
import * as bookingActions from "../features/actions/booking";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState();
  const [badUser, setBadUser] = useState();

  const context = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(carsActions.fetchCars());
    await dispatch(bookingActions.fetchBookings());
    // await dispatch(bookingActions.fetchAllBookings());
  }, []);
  // const fetchBookings = () => {
  //   setIsLoading(true);
  //   if (context.isAdmin === "false") {
  //     const requestBody = {
  //       query: `
  //     query {
  //       bookings{
  //         _id
  //         createdAt
  //         user{
  //           _id
  //           email
  //         }
  //         event{
  //             _id
  //             date,
  //             description,
  //             numarInmatriculare,
  //             numarKilometri,
  //             marca,
  //             detaliiMarca,
  //             clasa,
  //             price,
  //             urlImage,
  //         }
  //       }
  //     }
  //   `,
  //     };
  //     const token = context.token;
  //     fetch("http://localhost:8000/graphql", {
  //       method: "POST",
  //       body: JSON.stringify(requestBody),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //       .then((res) => {
  //         if (res.status !== 200 && res.status !== 201) {
  //           throw new Error("Failed");
  //         }
  //         return res.json();
  //       })
  //       .then((resData) => {
  //         // console.log(resData);
  //         const fetchedBookings = resData.data.bookings;

  //         setBookings(fetchedBookings);
  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setIsLoading(false);
  //       });
  //   } else if (context.isAdmin === "true") {
  //     const requestBody = {
  //       query: `
  //     query {
  //       allBookings{
  //         _id
  //         createdAt
  //         user{
  //           _id
  //           email
  //         }
  //         event{
  //             _id
  //             date,
  //             description,
  //             numarInmatriculare,
  //             numarKilometri,
  //             marca,
  //             detaliiMarca,
  //             clasa,
  //             price,
  //             urlImage,
  //         }
  //       }
  //     }
  //   `,
  //     };
  //     const token = context.token;
  //     fetch("http://localhost:8000/graphql", {
  //       method: "POST",
  //       body: JSON.stringify(requestBody),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //       .then((res) => {
  //         if (res.status !== 200 && res.status !== 201) {
  //           throw new Error("Failed");
  //         }
  //         return res.json();
  //       })
  //       .then((resData) => {
  //         // console.log(resData);
  //         const fetchedBookings = resData.data.allBookings;

  //         setBookings(fetchedBookings);
  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setIsLoading(false);
  //       });
  //   }
  // };

  // const addToBlackList = () => {
  //   const requestBody = {
  //     query: `
  //   mutation {
  //     addToBlackList(userId : "${badUser}"){
  //       _id
  //     }
  //   }
  // `,
  //   };
  //   const token = context.token;

  //   fetch("http://localhost:8000/graphql", {
  //     method: "POST",
  //     body: JSON.stringify(requestBody),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status !== 200 && res.status !== 201) {
  //         throw new Error("Failed");
  //       }
  //       return res.json();
  //     })
  //     .then((resData) => {
  //       console.log(resData);
  //       deleteBookingHandler(selectedBooking);
  //     })

  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // };

  // const confirmHandler = async (bookingId) => {
  //   setConfirmBooking(true);

  //   console.log(selectedBooking);
  //   addToBlackList();

  //   // deleteBookingHandler(bookingId);
  //   setConfirmBooking(false);
  // };

  const deleteBookingHandler = (bookingId) => {
    setConfirmBooking(false);
    setIsLoading(true);
    const requestBody = {
      query: `
      mutation CancelBooking($id : ID!) { 
        cancelBooking(bookingId :$id){
          _id
          numarInmatriculare
        }
      }
    `,
      variables: {
        id: bookingId,
      },
    };
    const token = context.token;
    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        // console.log(resData);
        // const fetchedBookings = resData.data.bookings;
        setIsLoading(true);
        const updatedBookings = bookings.filter((booking) => {
          return booking._id !== bookingId;
        });
        setBookings(updatedBookings);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  //open Modal
  const onShowModal = (bookingId) => {
    setConfirmBooking(true);
    const updatedBookings = bookings.filter((booking) => {
      return booking._id === bookingId;
    });
    setSelectedBooking(updatedBookings[0]._id);
    setBadUser(updatedBookings[0].user._id);
  };

  return (
    <React.Fragment>
      <div
        style={{
          // backgroundColor: "blue",
          width: "100%",
          height: "72vh",
        }}
      >
        <Section image={image1} name={"Bookings"} />
        <section className="ftco-section ">
          <BookingList />
        </section>

        {/* <section
          class="hero-wrap hero-wrap-2 js-fullheight ftco-degree-bg"
          style={{
            backgroundImage: `url(${image1})`,
            // backgroundSize: "cover",
            backgroundPosition: "center",
            // overflow: "hidden",
            zIndex: -999,
          }}
          data-stellar-background-ratio="0.5"
        >
          <div class="overlay"></div>
          <div class="container">
            <div class="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
              <div class="col-md-9  pb-5">
                <p class="breadcrumbs">
                  <span>
                    About us <i class="ion-ios-arrow-forward"></i>
                  </span>
                </p>
                <h1 class="mb-3 bread">About Us</h1>
              </div>
            </div>
          </div>
        </section> */}
      </div>

      {/* {confirmBooking && <Backdrop />}
      {confirmBooking && selectedBooking && (
        <Modal
          buttonTitle="Add to Black List"
          title="Add to Black List"
          canCancel
          canConfirm
          onCancel={() => deleteBookingHandler(selectedBooking)}
          onConfirm={() => confirmHandler(selectedBooking._id)}
           onCancel={modalCancelHandler}
           onConfirm={bookEventHandler}
        >
          <h1>{selectedEvent.clasa}</h1>
         <h2>${selectedEvent.price}</h2>
         <h2>{new Date(selectedEvent.date).toDateString()}</h2>
         <p>{selectedEvent.description}</p>
          <div>
            <h1 style={{ textAlign: "center" }}>Confirm Booking</h1>
            <h2>Do you want to add this user to Black List?</h2>
          </div>
        </Modal>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <BookingList
          bookings={bookings}
          onDelete={deleteBookingHandler}
          onConfirm={onShowModal}
          isAdmin={context.isAdmin}
        />
      )} */}
    </React.Fragment>
  );
};

export default BookingPage;
