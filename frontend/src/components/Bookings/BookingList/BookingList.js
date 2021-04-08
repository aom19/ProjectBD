import React from "react";
import "./BookingList.css";
import "../../Events/EventList/EventList.css";

const BookingList = (props) => (
  <ul className="bookings__list">
    {props.bookings.map((booking) => {
      return (
        <li key={booking._id} className="events__list-item">
          <div>
            <h1>{booking.event.marca}</h1>
            <h2>Clasa : {booking.event.clasa}</h2>
            <h2>Numar Kilometri : {booking.event.numarKilometri} km</h2>
            <h2>
              {/* Price/hour: ${props.price} - {new Date(props.date).toDateString()} */}
              Price/hour: ${booking.event.price}/h
            </h2>
            <h2>
              Booking started date :
              <i> {new Date(booking.createdAt).toLocaleDateString()}</i>
            </h2>
          </div>
          <div className="booking__item-actions">
            <button
              className="btn"
              onClick={props.onDelete.bind(this, booking._id)}
            >
              Cancel
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default BookingList;
