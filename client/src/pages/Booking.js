import { Token } from "graphql";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spiner/Spinner";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import BookingList from "../components/Bookings/BookingList/BookingList";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState();
  const [badUser, setBadUser] = useState();

  const context = useContext(AuthContext);

  useEffect(() => {
    fetchBookings();
  }, []);
  {
    console.log(bookings);
  }
  const fetchBookings = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
      query { 
        bookings{
          _id
          createdAt
          user{
            _id
          }
          event{
              _id
              date,
              description,
              numarInmatriculare,
              numarKilometri,
              marca,
              detaliiMarca,
              clasa,
              price,
              urlImage,
          }
        }
      }
    `,
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
        const fetchedBookings = resData.data.bookings;

        setBookings(fetchedBookings);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  //add user to Black List
{console.log(selectedBooking)}
  const addToBlackList = () => {
    const requestBody = {
      query: `
    mutation { 
      addToBlackList(userId : "${badUser}"){
        _id
      }
    }
  `,
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
        console.log(resData);
        deleteBookingHandler(selectedBooking);
      })

      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const confirmHandler = async (bookingId) => {
    setConfirmBooking(true);

    
    console.log(selectedBooking);
    addToBlackList();

    // deleteBookingHandler(bookingId);
    setConfirmBooking(false);
  };

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
      {confirmBooking && <Backdrop />}
      {confirmBooking && selectedBooking && (
        <Modal
          buttonTitle="Add to Black List"
          title="Add to Black List"
          canCancel
          canConfirm
          onCancel={() => deleteBookingHandler(selectedBooking)}
          onConfirm={() => confirmHandler(selectedBooking._id)}
          //  onCancel={modalCancelHandler}
          //  onConfirm={bookEventHandler}
        >
          {/* <h1>{selectedEvent.clasa}</h1>
         <h2>${selectedEvent.price}</h2>
         <h2>{new Date(selectedEvent.date).toDateString()}</h2>
         <p>{selectedEvent.description}</p> */}
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
        />
      )}
    </React.Fragment>
  );
};

export default BookingPage;
