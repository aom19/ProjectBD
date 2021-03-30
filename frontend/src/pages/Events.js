import React, { useState, useContext, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import AuthContext from "../context/auth-context";
import "./Events.css";

import EventList from "../components/Events/EventList/EventList";
import Spinner from "../components/Spiner/Spinner";

const EventPage = () => {
  const [creating, setCreating] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  // const eventss = [];/
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    title: "",
    price: "",
    date: "",
    description: "",
  });
  const context = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const createHandler = () => {
    setCreating(true);
  };

  const modalConfirmHandler = () => {
    setCreating(false);
    const title = values.title;
    //const price = parseFloat(values.price); // to convert in number
    const price = +values.price; // to convert in number
    const date = values.date;
    const description = values.description;

    if (
      title.trim().length === 0 ||
      price < 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }
    // const event = { title : title, price: price, date: date, description };
    const event = { title, price, date, description };
    const requestBody = {
      query: `
        mutation { 
          createEvent(eventInput: {title:"${title}" , description:"${description}" , price:"${price}", date:"${date}"}){
            _id
            title
            price
            description
            date
            creator{
              _id
              email
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
        fetchEvents();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modalCancelHandler = () => {
    setCreating(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
      query { 
        events{
          _id
          title
          price
          description
          date
          creator{
            _id
            email
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
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        const fetchedEvents = resData.data.events;
        setEvents(fetchedEvents);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const showDetailHandler = (eventId) => {
    setSelectedEvent(() => {
      const selectedEvent = events.find((evt) => evt._id === eventId);
      return setSelectedEvent(selectedEvent);
    });
  };

  const bookEventHandler = () => {
    if (!context.token) {
      setSelectedEvent(null);
      return;
    }
    const requestBody = {
      query: `
      mutation { 
        bookEvent(eventId : "${selectedEvent._id}"){
          _id
          createdAt
          updatedAt
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
        setSelectedEvent(null);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <React.Fragment>
      {(creating || selectedEvent) && <Backdrop />}
      {creating && (
        <Modal
          buttonTitle="Confirm"
          title="Add Event"
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
        >
          <form>
            <div className="form-control">
              <label htmlFor="title">Tatle</label>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={values.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                id="description"
                rows="4"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal>
      )}
      {selectedEvent && (
        <Modal
          buttonTitle={context.token ? "Book" : "Confirm"}
          title={selectedEvent.title}
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={bookEventHandler}
        >
          <h1>{selectedEvent.title}</h1>
          <h2>
            ${selectedEvent.price} -{" "}
            {new Date(selectedEvent.date).toDateString()}
          </h2>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}
      {context.token && (
        <div className="events-controls">
          <p>Share new cars!!</p>
          <button className="btn" onClick={createHandler}>
            Create Event
          </button>
        </div>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <EventList
          events={events}
          authUserId={context.userId}
          onViewDetail={showDetailHandler}
        />
      )}
    </React.Fragment>
  );
};

export default EventPage;
