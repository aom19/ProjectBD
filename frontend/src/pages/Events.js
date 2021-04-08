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
    numarInmatriculare: "",
    numarKilometri: "",
    date: "",
    marca: "",
    detaliiMarca: "",
    clasa: "",
    price: "",
    urlImage: "",
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
    // const title = values.title;
    // //const price = parseFloat(values.price); // to convert in number
    // const price = +values.price; // to convert in number
    const numarInmatriculare = values.numarInmatriculare;
    const numarKilometri = values.numarKilometri;
    const date = values.date;
    const marca = values.marca;
    const detaliiMarca = values.detaliiMarca;
    const clasa = values.clasa;
    const price = values.price;
    const urlImage = values.urlImage;
    const description = values.description;

    // if (
    //   title.trim().length === 0 ||
    //   price < 0 ||
    //   date.trim().length === 0 ||
    //   description.trim().length === 0
    // ) {
    //   return;
    // }
    // const event = { title : title, price: price, date: date, description };
    const event = {
      date,
      description,
      numarInmatriculare,
      numarKilometri,
      marca,
      detaliiMarca,
      clasa,
      price,
      urlImage,
    };
    const requestBody = {
      query: `
        mutation { 
          createEvent(eventInput: {
            numarInmatriculare:"${numarInmatriculare}" ,
            numarKilometri:"${numarKilometri}" ,
            marca:"${marca}", 
            detaliiMarca:"${detaliiMarca}", 
            clasa:"${clasa}", 
            price:"${price}", 
            urlImage:"${urlImage}", 
            date:"${date}"
            description:"${description}"
            })
          {
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
          date,
          description,
          numarInmatriculare,
          numarKilometri,
          marca,
          detaliiMarca,
          clasa,
          price,
          urlImage,
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
          title="Add Car"
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={modalConfirmHandler}
        >
          <form>
            <div className="form-control">
              <label htmlFor="numarInmatriculare">Numar Inmatriculare</label>
              <input
                type="text"
                id="numarInmatriculare"
                name="numarInmatriculare"
                value={values.numarInmatriculare}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="numarKilometri">Numar kilometri</label>
              <input
                type="number"
                id="numarKilometri"
                name="numarKilometri"
                value={values.numarKilometri}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="date">Data Fabricatie</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={values.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="marca">Marca</label>
              <input
                type="text"
                id="marca"
                name="marca"
                value={values.marca}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="detaliiMarca">Detalii Marca</label>
              <input
                type="text"
                id="detaliiMarca"
                name="detaliiMarca"
                value={values.detaliiMarca}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="clasa">Clasa</label>
              <input
                type="text"
                id="clasa"
                name="clasa"
                value={values.clasa}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label htmlFor="price">Pret/ora</label>
              <input
                type="number"
                id="price"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="urlImage">Url-Image</label>
              <input
                type="text"
                id="urlImage"
                name="urlImage"
                value={values.urlImage}
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
          title={selectedEvent.marca}
          canCancel
          canConfirm
          onCancel={modalCancelHandler}
          onConfirm={bookEventHandler}
        >
          {/* <h1>{selectedEvent.clasa}</h1>
          <h2>${selectedEvent.price}</h2>
          <h2>{new Date(selectedEvent.date).toDateString()}</h2>
          <p>{selectedEvent.description}</p> */}

          <h1>{selectedEvent.marca}</h1>
          <h2>Clasa : {selectedEvent.clasa}</h2>
          <h2>Numar Inmatriculare : {selectedEvent.numarInmatriculare}</h2>
          <h2>Detalii Marca : {selectedEvent.detaliiMarca}</h2>

          <h2>Numar Kilometri : {selectedEvent.numarKilometri} km</h2>
          <h2>
            Data fabricatie:
            <i>{new Date(selectedEvent.date).toDateString()}</i>{" "}
          </h2>
          <h2>
            {/* Price/hour: ${props.price} - {new Date(props.date).toDateString()} */}
            Price/hour: ${selectedEvent.price} /h
          </h2>
          <h2>description : {selectedEvent.description}</h2>
        </Modal>
      )}
      {context.token && (
        <div className="events-controls">
          <p>Share new cars!!</p>
          <button className="btn" onClick={createHandler}>
            Add a new car
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
