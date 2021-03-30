import { Token } from "graphql";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/auth-context";
import Spinner from "../components/Spiner/Spinner";
import BookingList from "../components/Bookings/BookingList/BookingList";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
          event{
            _id
            title
            date
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

  const deleteBookingHandler = (bookingId) => {
    setIsLoading(true);
    const requestBody = {
      query: `
      mutation CancelBooking($id : ID!) { 
        cancelBooking(bookingId :$id){
          _id
            title
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

  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <BookingList bookings={bookings} onDelete={deleteBookingHandler} />
      )}
    </React.Fragment>
  );
};

export default BookingPage;
