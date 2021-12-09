import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CarList.css";

import Modal from "react-bootstrap/Modal";
import CarItem from "../CarItem/CarItem";
import * as carsActions from "../../../features/actions/cars";

const CarList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user);
  const bookings = useSelector((state) => state.bookings?.allBookings);
  const cars = useSelector((state) => state.cars?.availableCars);

  const [filterCars, setFilterCars] = useState(cars);
  const [formState, setFormState] = useState(false);

  const [values, setValues] = useState({
    id: "",
    make: "",
    model: "",
    description: "Nice CAr",
    mileage: "",
    transmision: "",
    seats: "",
    luggage: "2",
    fuel: "",
    airConditions: false,
    GPS: false,
    childSeat: false,
    music: false,
    seatBelts: false,
    sleepingBed: false,
    water: false,
    bluetooth: false,
    onBoardComputer: false,
    audioInput: false,
    carKit: false,
    remoteLocking: false,
    climateControl: false,
    price: "",
    urlImage: "",
  });

  console.log(cars);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  //filter carsAvailable = allCars - boookedCars ,
  //  because when refresh it will fetch all the cars from database , that'swhy i didnt use state

  useEffect(() => {
    if (token?.token !== null && bookings?.length !== 0 && !token.isAdmin) {
      let result = cars.filter(
        (o1) => !bookings.some((o2) => o1._id === o2.event._id)
      );
      // console.log("first if");

      setFilterCars(result);
    } else if (
      token?.token !== null &&
      bookings?.length !== 0 &&
      token.isAdmin
    ) {
      // console.log("2 if");
      setFilterCars(cars);
    } else if (token?.token === null && bookings?.length === 0) {
      setFilterCars(cars);
      // console.log("3 if");
    }
    return function cleanup() {
      setFilterCars(cars);
    };
  }, [cars, bookings, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      carsActions.createCar(
        values.make,
        values.model,
        values.description,
        values.mileage,
        values.transmision,
        values.seats,
        values.luggage,
        values.fuel,
        values.airConditions,
        values.GPS,
        values.childSeat,
        values.music,
        values.seatBelts,
        values.sleepingBed,
        values.water,
        values.bluetooth,
        values.onBoardComputer,
        values.audioInput,
        values.carKit,
        values.remoteLocking,
        values.climateControl,
        values.price,
        values.urlImage
      )
    );
    console.log(cars);
  };
  return (
    <div class="container">
      <div class="row">
        {filterCars?.map((car) => (
          // {cars?.availableCars?.map((car) => (
          <li class="col-md-4" style={{ listStyle: "none" }}>
            <CarItem
              key={car._id}
              id={car._id}
              make={car.make}
              description={car.description}
              GPS={car.GPS}
              airConditions={car.airConditions}
              audioInput={car.audioInput}
              bluetooth={car.bluetooth}
              carKit={car.carKit}
              childSeat={car.childSeat}
              climateControl={car.climateControl}
              luggage={car.luggage}
              mileage={car.mileage}
              model={car.model}
              music={car.music}
              onBoardComputer={car.onBoardComputer}
              price={car.price}
              remoteLocking={car.remoteLocking}
              seatBelts={car.seatBelts}
              seats={car.seats}
              sleepingBed={car.sleepingBed}
              transmision={car.transmision}
              urlImage={car.urlImage}
              water={car.water}
              fuel={car.fuel}
            />
          </li>
        ))}
        {token.isAdmin ? (
          <li class="col-md-4" style={{ listStyle: "none" }} key="11">
            <div class="car-wrap rounded ">
              <div
                class="img rounded d-flex align-items-end"
                // style={{ backgroundImage: `url(${props.urlImage})` }}
              ></div>
              <div class="text">
                <h2 class="mb-0">
                  <a>$</a>
                </h2>
                <div class="d-flex mb-3">
                  <span class="cat">...</span>
                  <p class="price ml-auto">
                    <span>/day</span>
                  </p>
                </div>
                <p class="d-flex mb-0 d-block">
                  <a
                    class="btn btn-warning py-2 ml-1"
                    onClick={() => setFormState(true)}
                  >
                    Add Car
                  </a>
                </p>
              </div>
            </div>
          </li>
        ) : (
          <> </>
        )}
        <Modal show={formState} onHide={() => setFormState(false)}>
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Add new Car <span style={{ color: "#0d6efd" }}></span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="request-form  bg-primary" onSubmit={handleSubmit}>
              <h2>Important Features</h2>
              <div className="d-flex">
                <div className="form-group mr-2 ">
                  <label for="" className="label">
                    Make
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="BMW, Audi, etc"
                    name="make"
                    value={values.make}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label for="" className="label">
                    Model
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Model"
                    name="model"
                    value={values.model}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label for="" className="label">
                    Mileage
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mileage"
                    name="mileage"
                    value={values.mileage}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label for="" className="label">
                    Transmision
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Transmision"
                    name="transmision"
                    value={values.transmision}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label for="" className="label">
                    Seats
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Seats"
                    name="seats"
                    value={values.seats}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group ">
                  <label for="" className="label">
                    Fuel
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Fuel"
                    name="fuel"
                    value={values.fuel}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label for="" className="label">
                    urlImage
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="urlImage"
                    name="urlImage"
                    value={values.urlImage}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group ">
                  <label for="" className="label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="airConditions"
                      id="status"
                      value={!values.airConditions}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      Air Conditions
                    </span>
                  </label>
                </div>
                <div className="form-group ">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="GPS"
                      id="status"
                      value={!values.GPS}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      GPS
                    </span>
                  </label>
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="childSeat"
                      id="status"
                      value={!values.childSeat}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      Child Seat
                    </span>
                  </label>
                </div>
                <div className="form-group ">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="music"
                      id="status"
                      value={!values.music}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      Music
                    </span>
                  </label>
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="seatBelts"
                      id="status"
                      value={!values.seatBelts}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      Seat Belts
                    </span>
                  </label>
                </div>
                <div className="form-group ">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="sleepingBed"
                      id="status"
                      value={!values.sleepingBed}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      Sleeping Bed
                    </span>
                  </label>
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="water"
                      id="status"
                      value={!values.water}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      Water
                    </span>
                  </label>
                </div>
                <div className="form-group ">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="bluetooth"
                      id="status"
                      value={!values.bluetooth}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      Bluetooth
                    </span>
                  </label>
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="onBoardComputer"
                      id="status"
                      value={!values.onBoardComputer}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      Computer
                    </span>
                  </label>
                </div>
                <div className="form-group ">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="audioInput"
                      id="status"
                      value={!values.audioInput}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      Audio Input
                    </span>
                  </label>
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="carKit"
                      id="status"
                      value={!values.carKit}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      Car Kit
                    </span>
                  </label>
                </div>
                <div className="form-group ">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="remoteLocking"
                      id="status"
                      value={!values.remoteLocking}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      Remote Locking
                    </span>
                  </label>
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label class=" label-switch switch-success">
                    <input
                      type="checkbox"
                      class="switch switch-bootstrap status mr-2"
                      name="climateControl"
                      id="status"
                      value={!values.climateControl}
                      onChange={handleChange}
                    />

                    <span
                      class="lable "
                      style={{
                        color: "white",
                      }}
                    >
                      Climate Control
                    </span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  value="Rent "
                  className="btn btn-secondary py-3 px-4"
                />
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default CarList;
