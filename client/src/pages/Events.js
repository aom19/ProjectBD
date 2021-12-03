import React, { useState, useContext, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import AuthContext from "../context/auth-context";
import "./Events.css";
import "../components/Events/EventList/EventItem/EventItem.css";
import EventList from "../components/Events/EventList/EventList";
import Spinner from "../components/Spiner/Spinner";

import image1 from "../assets/img1.jpeg";

const EventPage = () => {
  const [creating, setCreating] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const newbooks = [];
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newBookings, setNewBookings] = useState([]);

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

  useEffect(() => {
    fetchEvents();
    fetchBookings();
  }, []);

  useEffect(() => {
    bookedCarHandler();
  }, [bookings]);

  const bookedCarHandler = () => {
    bookings.map((book) => {
      newbooks.push(book.event);
    });

    const results = events.filter(
      ({ _id: value1 }) =>
        !newbooks.some(({ _id: value2 }) => value1 === value2)
    );
    setNewBookings(results);
  };

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

  const fetchBookings = () => {
    const requestBody = {
      query: `
      query { 
        allBookings{
          event{
              _id
           
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
        const fetchedBookings = resData.data.allBookings;

        setBookings(fetchedBookings);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const modalCancelHandler = () => {
    setCreating(false);
    setSelectedEvent(null);
  };

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
  const deleteHandler = (eventId) => {
    console.log(eventId);

    const requestBody = {
      query: `
      mutation { 
        deleteEvent(eventId : "${eventId}"){
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
        fetchEvents();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <section
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
                  Cars <i class="ion-ios-arrow-forward"></i>
                </span>
              </p>
              <h1 class="mb-3 bread">Choose Your Car</h1>
            </div>
          </div>
        </div>
      </section>
    </div>
    // <React.Fragment>
    //   {(creating || selectedEvent) && <Backdrop />}
    //   {creating && (
    //     <Modal
    //       buttonTitle="Confirm"
    //       title="Add Car"
    //       canCancel
    //       canConfirm
    //       onCancel={modalCancelHandler}
    //       onConfirm={modalConfirmHandler}
    //     >
    //       <form>
    //         <div className="form-control">
    //           <label htmlFor="numarInmatriculare">Numar Inmatriculare</label>
    //           <input
    //             type="text"
    //             id="numarInmatriculare"
    //             name="numarInmatriculare"
    //             value={values.numarInmatriculare}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label htmlFor="numarKilometri">Numar kilometri</label>
    //           <input
    //             type="number"
    //             id="numarKilometri"
    //             name="numarKilometri"
    //             value={values.numarKilometri}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label htmlFor="date">Data Fabricatie</label>
    //           <input
    //             type="datetime-local"
    //             id="date"
    //             name="date"
    //             value={values.date}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label htmlFor="marca">Marca</label>
    //           <input
    //             type="text"
    //             id="marca"
    //             name="marca"
    //             value={values.marca}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label htmlFor="detaliiMarca">Detalii Marca</label>
    //           <input
    //             type="text"
    //             id="detaliiMarca"
    //             name="detaliiMarca"
    //             value={values.detaliiMarca}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label htmlFor="clasa">Clasa</label>
    //           <input
    //             type="text"
    //             id="clasa"
    //             name="clasa"
    //             value={values.clasa}
    //             onChange={handleChange}
    //           />
    //         </div>

    //         <div className="form-control">
    //           <label htmlFor="price">Pret/ora</label>
    //           <input
    //             type="number"
    //             id="price"
    //             name="price"
    //             value={values.price}
    //             onChange={handleChange}
    //           />
    //         </div>
    //         <div className="form-control">
    //           <label htmlFor="urlImage">Url-Image</label>
    //           <input
    //             type="text"
    //             id="urlImage"
    //             name="urlImage"
    //             value={values.urlImage}
    //             onChange={handleChange}
    //           />
    //         </div>

    //         <div className="form-control">
    //           <label htmlFor="description">Description</label>
    //           <textarea
    //             type="text"
    //             id="description"
    //             rows="4"
    //             name="description"
    //             value={values.description}
    //             onChange={handleChange}
    //           />
    //         </div>
    //       </form>
    //     </Modal>
    //   )}
    //   {selectedEvent && (
    //     <Modal
    //       buttonTitle={context.token ? "Book" : "Confirm"}
    //       title={selectedEvent.marca}
    //       canCancel
    //       canConfirm
    //       onCancel={modalCancelHandler}
    //       onConfirm={bookEventHandler}
    //     >
    //       {/* <h1>{selectedEvent.clasa}</h1>
    //       <h2>${selectedEvent.price}</h2>
    //       <h2>{new Date(selectedEvent.date).toDateString()}</h2>
    //       <p>{selectedEvent.description}</p> */}
    //       <div>
    //         <h1>Marca :{selectedEvent.marca}</h1>

    //         <h2>Clasa : {selectedEvent.clasa}</h2>

    //         <h2>Numar Inmatriculare : {selectedEvent.numarInmatriculare}</h2>
    //         <h2>Detalii Marca : {selectedEvent.detaliiMarca}</h2>

    //         <h2>Numar Kilometri : {selectedEvent.numarKilometri} km</h2>
    //         <h2>
    //           Data fabricatie:
    //           <i>{new Date(selectedEvent.date).toDateString()}</i>{" "}
    //         </h2>
    //         <h2>
    //           {/* Price/hour: ${props.price} - {new Date(props.date).toDateString()} */}
    //           Price/hour: ${selectedEvent.price} /h
    //         </h2>
    //         <h2>description : {selectedEvent.description}</h2>
    //       </div>
    //     </Modal>
    //   )}

    //   {context.isAdmin === "true" && context.token ? (
    //     <div className="events-controls">
    //       <p>Share new cars!!</p>
    //       <button className="btn" onClick={createHandler}>
    //         Add a new car
    //       </button>
    //     </div>
    //   ) : (
    //     <div></div>
    //   )}
    //   {isLoading ? (
    //     <Spinner />
    //   ) : (
    //     <>
    //       <h2>

    //         {context.token === null
    //           ? "Please login , some cars can be booked !"
    //           : ""}
    //       </h2>
    //       <EventList
    //         // {
    //         //   context.token === null
    //         // }

    //         events={context.token === null ? events : newBookings}
    //         authUserId={context.userId}
    //         onViewDetail={showDetailHandler}
    //         onDelete={deleteHandler}
    //         isAdmin={context.isAdmin}
    //       />
    //     </>
    //   )}
    // </React.Fragment>
  );
};

export default EventPage;

