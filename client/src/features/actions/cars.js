export const DELETE_CAR = "DELETE_CAR";
export const CREATE_CAR = "CREATE_CAR";
export const UPDATE_CAR = "UPDATE_CAR";
export const SET_CARS = "SET_CARS";
export const FILTER_CARS = "FILTER_CARS";

export const fetchCars = () => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    const requestBody = {
      query: `
        query { 
          events{
            _id
            make,
            model,
            description,
            mileage,
            transmision,
            seats,
            luggage,
            fuel,
            airConditions,
            GPS,
            childSeat,
            music,
            seatBelts,
            sleepingBed,
            water,
            bluetooth,
            onBoardComputer,
            audioInput,
            carKit,
            remoteLocking,
            climateControl,
            price,
            urlImage
            creator{
              _id
              email
            }
          }
        }
      `,
    };
    try {
      const response = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();

      const loadedCars = resData.data.events;

      dispatch({
        type: SET_CARS,
        cars: loadedCars,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createCar = (
  make,
  model,
  description,
  mileage,
  transmision,
  seats,
  luggage,
  fuel,
  airConditions,
  GPS,
  childSeat,
  music,
  seatBelts,
  sleepingBed,
  water,
  bluetooth,
  onBoardComputer,
  audioInput,
  carKit,
  remoteLocking,
  climateControl,
  price,
  urlImage
) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;

    const requestBody = {
      query: `
      mutation { 
        createEvent(eventInput: {
            make:"${make}" ,
            model:"${model}" ,
            description:"${description}", 
            mileage:"${mileage}", 
            transmision:"${transmision}", 
            seats:"${seats}", 
            luggage:"${luggage}",
            fuel:"${fuel}",
            airConditions:"${airConditions}",
            GPS:"${GPS}",
            childSeat:"${childSeat}",
            music:"${music}",
            seatBelts:"${seatBelts}",
            sleepingBed:"${sleepingBed}",
            water:"${water}",
            bluetooth:"${bluetooth}",
            onBoardComputer:"${onBoardComputer}",
            audioInput:"${audioInput}",
            remoteLocking:"${remoteLocking}",
            climateControl:"${climateControl}",
            price:"${price}",
            carKit:"${carKit}",
            urlImage:"${urlImage}",
        })
        {
            _id
            make,
            model,
            description,
            mileage,
            transmision,
            seats,
            luggage,
            fuel,
            airConditions,
            GPS,
            childSeat,
            music,
            seatBelts,
            sleepingBed,
            water,
            bluetooth,
            onBoardComputer,
            audioInput,
            carKit,
            remoteLocking,
            climateControl,
            price,
            urlImage
        }
      }
        `,
    };
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();
    const createdCar = resData?.data;
    console.log(createdCar?.createEvent);
    dispatch({
      type: CREATE_CAR,
      carData: {
        _id: resData.data.createEvent._id,
        make,
        model,
        description,
        mileage,
        transmision,
        seats,
        luggage,
        fuel,
        airConditions,
        GPS,
        childSeat,
        music,
        seatBelts,
        sleepingBed,
        water,
        bluetooth,
        onBoardComputer,
        audioInput,
        carKit,
        remoteLocking,
        climateControl,
        price,
        urlImage,
      },
    });
  };
};

export const deleteCar = (carId) => {
  return async (dispatch, getState) => {
    const token = getState().user.token;
    const requestBody = {
      query: `
      mutation { 
        deleteEvent(eventId : "${carId}"){
          _id
        }
      }
    `,
    };
    const response = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_CAR, carId: carId });
  };
};
