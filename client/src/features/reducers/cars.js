import {
  DELETE_CAR,
  CREATE_CAR,
  UPDATE_CAR,
  SET_CARS,
  FILTER_CARS,
} from "../actions/cars";
import Car from "../../models/car";
const initialState = {
  availableCars: [],
  filterCars: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CARS:
      return {
        availableCars: action.cars,
        filterCars: action.filterCars,
      };
    case CREATE_CAR:
      console.log(action.carData);
      const newCar = new Car(
        action.carData._id,
        action.carData.make,
        action.carData.model,
        action.carData.description,
        action.carData.mileage,
        action.carData.transmision,
        action.carData.seats,
        action.carData.luggage,
        action.carData.fuel,
        action.carData.airConditions,
        action.carData.GPS,
        action.carData.childSeat,
        action.carData.music,
        action.carData.seatBelts,
        action.carData.sleepingBed,
        action.carData.water,
        action.carData.bluetooth,
        action.carData.onBoardComputer,
        action.carData.audioInput,
        action.carData.carKit,
        action.carData.remoteLocking,
        action.carData.climateControl,
        action.carData.price,
        action.carData.urlImage
      );

      return {
        ...state,
        // availableCars: state.availableCars.conca({}),
        availableCars: state.availableCars.concat(newCar),
      };
    case DELETE_CAR:
      return {
        availableCars: state.availableCars.filter(
          (car) => car._id !== action.carId
        ),
      };
    case FILTER_CARS:
      return {
        ...state,
        filterCars: state.filterCars.filter((car) => car.id !== action.carId),
      };
  }
  return state;
};
