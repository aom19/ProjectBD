import React from "react";
import "./EventItem.css";

const eventItem = (props) => (
  <li key={props.eventId} className="events__list-item">
    <div>
      <h1>{props.marca}</h1>
      <h2>Clasa : {props.clasa}</h2>
      <h2>Numar Kilometri : {props.numarKilometri} km</h2>

      <h2>
        {/* Price/hour: ${props.price} - {new Date(props.date).toDateString()} */}
        Price/hour: ${props.price}
      </h2>
    </div>
    {/* {console.log(props.userId)} */}
    <div>
      {props.userId == props.creatorId ? (
        <p>You're the owner of this event</p>
      ) : (
        <button
          className="btn"
          onClick={props.onDetail.bind(this, props.eventId)}
        >
          View Details
        </button>
      )}
    </div>
  </li>
);

export default eventItem;
