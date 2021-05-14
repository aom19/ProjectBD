import React from "react";
import "./EventList.css";

import EventItem from "./EventItem/EventItem";

const eventList = (props) => {
  console.log(props.events);
  const events = props.events.map((event) => {
    return (
      <EventItem
        className="event__item"
        key={event._id}
        eventId={event._id}
        marca={event.marca}
        clasa={event.clasa}
        numarKilometri={event.numarKilometri}
        price={event.price}
        date={event.date}
        urlImage={event.urlImage}
        creatorId={event.creator._id}
        userId={props.authUserId}
        onDetail={props.onViewDetail}
        onDelete={props.onDelete}
        isAdmin={props.isAdmin}
      />
    );
  });
  return <ul className="event__list">{events}</ul>;
};

export default eventList;
