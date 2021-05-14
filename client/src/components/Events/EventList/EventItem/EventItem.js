import React from "react";
import "./EventItem.css";

const eventItem = (props) => (
  <li key={props.eventId}>
    <div className="card">
      <input type="checkbox" className="input" />
      <div className="toggle">+</div>
      <div className="imgBx">
        <img id="img" src={props.urlImage} alt={props.clasa} />
      </div>
      <div className="content">
        <h1>{props.marca}</h1>
        <h2>Clasa : {props.clasa}</h2>
        <h2>Numar Kilometri : {props.numarKilometri} km</h2>

        <h2>
          {/* Price/hour: ${props.price} - {new Date(props.date).toDateString()} */}
          Price/hour: ${props.price}
        </h2>
        <h2>Marca : {props.marca}</h2>
        <h2>Clasa: {props.clasa} </h2>
        <h2>Date: {new Date(props.date).toDateString()} </h2>
        {/* <h2>: {props.} </h2> */}
        <div className="buttonsContainer">
          {/* {props.userId == props.creatorId ? (
            <p>You're the owner of this event</p>
          ) : ( */}
          <button
            className="btnn"
            onClick={props.onDetail.bind(this, props.eventId)}
          >
            View Details
          </button>

          {props.isAdmin === "true" && (
            <button
              className="btnn"
              // style={{ backgroundColor: "linear-gradient(to left, 01d1d1, #6dd5ed);", color: "#ff5f0f" }}
              // style={{ backgroundColor: "#01d1d1", color: "#ff5f0f" }}
              onClick={props.onDelete.bind(this, props.eventId)}
            >
              Delete
            </button>
          )}

          {/* )} */}
        </div>
      </div>
    </div>
  </li>
);

export default eventItem;
