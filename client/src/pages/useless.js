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
