import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import image1 from "../assets/img1.jpeg";
import FeatureList from "../components/Features/FeatureList/FeatureList";

import { filterCars, createBooking } from "../features/actions/booking";
// import Modal from "../components/Modal/Modal";
import Modal from "react-bootstrap/Modal";
const SingleCar = ({ location }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user);

  //trigger description section
  const [active, setActive] = useState(false);
  const [formActive, setFormActive] = useState(false);

  const car = location?.state?.params;


  const [values, setValues] = useState({
    pickUpLocation: "",
    pickUpDate: "",
    dropOffDate: "",
    dropOffLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(car.id);
    await dispatch(
      createBooking(
        car.id,
        values.pickUpLocation,
        values.dropOffLocation,
        values.pickUpDate,
        values.dropOffDate
      )
    );
    history.push("/bookings");
  };

  const importantFeatures = [];
  importantFeatures.push(
    {
      featureName: "Mileage",
      feature: car.mileage,
      iconSrc: "https://img.icons8.com/color/60/000000/speed.png",
    },
    {
      featureName: "Transmision",
      feature: car.transmision,
      iconSrc:
        "https://img.icons8.com/external-wanicon-lineal-color-wanicon/60/000000/external-piston-car-service-wanicon-lineal-color-wanicon.png",
    },
    {
      featureName: "Seats",
      feature: car.seats,
      iconSrc: "https://img.icons8.com/color/60/000000/car-seat.png",
    },
    {
      featureName: "Luggage",
      feature: car.luggage,
      iconSrc: "https://img.icons8.com/cotton/64/000000/luggage--v1.png",
    },
    {
      featureName: "Fuel",
      feature: car.fuel,
      iconSrc:
        "https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/000000/external-fuel-ecology-vitaliy-gorbachev-blue-vitaly-gorbachev.png",
    }
  );

  const features = [
    { featureName: "Air Conditions", feature: car.airConditions },
    { featureName: "GPS", feature: car.GPS },
    { featureName: "Child Seat ", feature: car.childSeat },
    { featureName: "Music ", feature: car.music },
    { featureName: "Seat Belts ", feature: car.seatBelts },
    { featureName: "Sleeping Bed ", feature: car.sleepingBed },
    { featureName: "Water ", feature: car.water },
    { featureName: "Bluetooth ", feature: car.bluetooth },
    { featureName: "OnBoard Computer ", feature: car.onBoardComputer },
    { featureName: "Audio Input ", feature: car.audioInput },
    { featureName: "Car Kit ", feature: car.carKit },
    { featureName: "Remote Locking ", feature: car.remoteLocking },
    { featureName: "Climate Control ", feature: car.climateControl },
  ];
  // console.log(features);

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
      {/* 2 section */}
      <section class="ftco-section ftco-car-details">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-12">
              <div class="car-details">
                <div
                  class="img rounded"
                  style={{ backgroundImage: `url(${car.urlImage}` }}
                ></div>
                <div class="text text-center">
                  <span class="subheading">{car.model}</span>
                  <h1>{car.make}</h1>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            {/* easy render important features */}
            {importantFeatures?.map((feature) => {
              return (
                <div
                  class="col-md d-flex align-self-stretch "
                  // key={feature.iconSrc}
                >
                  <div class="media block-6 services">
                    <div class="media-body py-md-4">
                      <div class="d-flex mb-3 align-items-center">
                        <div class="icon d-flex align-items-center justify-content-center">
                          <span class="flaticon-dashboard">
                            <img src={feature?.iconSrc} />
                          </span>
                        </div>
                        <div class="text">
                          <h3 class="heading mb-0 pl-3">
                            {feature.featureName}
                            <span>{feature?.feature?.toUpperCase()}</span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* <div class="col-md d-flex align-self-stretch ">
              <div class="media block-6 services">
                <div class="media-body py-md-4">
                  <div class="d-flex mb-3 align-items-center">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="flaticon-pistons">
                        <img src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/60/000000/external-piston-car-service-wanicon-lineal-color-wanicon.png" />
                      </span>
                    </div>
                    <div class="text">
                      <h3 class="heading mb-0 pl-3">
                        Transmission
                        <span>{car.transmision.toUpperCase()}</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div class="col-md d-flex align-self-stretch  ">
              <div class="media block-6 services">
                <div class="media-body py-md-4">
                  <div class="d-flex mb-3 align-items-center">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="flaticon-car-seat">
                        <img src="https://img.icons8.com/color/60/000000/car-seat.png" />

                      </span>
                    </div>
                    <div class="text">
                      <h3 class="heading mb-0 pl-3">
                        Seats
                        <span>{car.seats} seats</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div class="col-md d-flex align-self-stretch ">
              <div class="media block-6 services">
                <div class="media-body py-md-4">
                  <div class="d-flex mb-3 align-items-center">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="flaticon-backpack">
                        <img src="https://img.icons8.com/cotton/64/000000/luggage--v1.png" />
                      </span>
                    </div>
                    <div class="text">
                      <h3 class="heading mb-0 pl-3">
                        Luggage
                        <span>{car.luggage} luggage</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div class="col-md d-flex align-self-stretch ">
              <div class="media block-6 services">
                <div class="media-body py-md-4">
                  <div class="d-flex mb-3 align-items-center">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="flaticon-diesel">
                        <img src="https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/000000/external-fuel-ecology-vitaliy-gorbachev-blue-vitaly-gorbachev.png" />
                      </span>
                    </div>
                    <div class="text">
                      <h3 class="heading mb-0 pl-3">
                        Fuel
                        <span>{car.fuel.toUpperCase()}</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div class="row">
            <div class="col-md-12 pills">
              <div class="bd-example bd-example-tabs">
                <div class="d-flex justify-content-center">
                  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item">
                      <a
                        className={`nav-link ${!active ? "active" : false}`}
                        id="pills-description-tab"
                        data-toggle="pill"
                        role="tab"
                        aria-controls="pills-description"
                        aria-expanded="true "
                        onClick={() => setActive(!active)}
                        style={{
                          fontSize: "25px",
                          fontWeight: "400",
                          cursor: "pointer",
                          fontFamily: "serif",
                          letterSpacing: 1.5,
                        }}
                      >
                        Features
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        className={`nav-link ${active ? "active" : false}`}
                        id="pills-manufacturer-tab"
                        data-toggle="pill"
                        role="tab"
                        aria-controls="pills-manufacturer"
                        aria-expanded="true"
                        onClick={() => setActive(!active)}
                        style={{
                          fontSize: "25px",
                          fontWeight: "400",
                          cursor: "pointer",
                          fontFamily: "serif",
                          letterSpacing: 1.5,
                        }}
                      >
                        Description
                      </a>
                    </li>
                    {token?.token ? (
                      <li class="nav-item">
                        <a
                          className={`nav-link ${
                            formActive ? "active" : false
                          }`}
                          id="pills-description-tab"
                          data-toggle="pill"
                          role="tab"
                          aria-controls="pills-description"
                          aria-expanded="true "
                          onClick={() => setFormActive(!formActive)}
                          style={{
                            fontSize: "25px",
                            fontWeight: "400",
                            cursor: "pointer",
                            fontFamily: "serif",
                            letterSpacing: 1.5,
                          }}
                        >
                          Book Car
                        </a>
                      </li>
                    ) : (
                      <> </>
                    )}
                  </ul>
                </div>

                <div class="tab-content" id="pills-tabContent">
                  {formActive ? (
                    <Modal
                      show={formActive}
                      onHide={() => setFormActive(false)}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                          Book{" "}
                          <span style={{ color: "#0d6efd" }}>{car.model}</span>
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form
                          onSubmit={handleSubmit}
                          className="request-form  bg-primary"
                        >
                          <h2>Select Details</h2>
                          <div className="form-group">
                            <label for="" className="label">
                              Pick-up location
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="City, Airport, Station, etc"
                              name="pickUpLocation"
                              value={values.pickUpLocation}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label for="" className="label">
                              Drop-off location
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="City, Airport, Station, etc"
                              name="dropOffLocation"
                              value={values.dropOffLocation}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="d-flex">
                            <div className="form-group mr-2">
                              <label for="" className="label">
                                Pick-up date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="book_pick_date"
                                placeholder="Date"
                                name="pickUpDate"
                                value={values.pickUpDate}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group ml-2">
                              <label for="" className="label">
                                Drop-off date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                id="book_off_date"
                                placeholder="Date"
                                name="dropOffDate"
                                value={values.dropOffDate}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          {/* <div className="form-group">
                      <label for="" className="label">
                        Pick-up time
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="time_pick"
                        placeholder="Time"
                      />
                    </div> */}
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
                  ) : (
                    <> </>
                  )}
                  {!active ? (
                    <div
                      class="tab-pane fade show active"
                      id="pills-description"
                      role="tabpanel"
                      aria-labelledby="pills-description-tab"
                    >
                      <div class="row">
                        <div>
                          {/* React Component for list */}
                          <FeatureList features={features} class="features" />
                          {/* <ul >
                            <li
                              class="check"
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "22px",
                                fontWeight: "500",
                                letterSpacing: 1.1,
                                color: "#999999",
                              }}
                            >
                              <span class="ion-ios-checkmark">
                                <img src="https://img.icons8.com/emoji/28/000000/check-mark-emoji.png" />
                              </span>
                              Airconditions
                            </li>
                            <li
                              className="check"
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "22px",
                                fontWeight: "500",
                                letterSpacing: 1.1,
                                color: "#999999",
                              }}
                            >
                              <span class="ion-ios-checkmark">
                                <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/24/000000/external-multiply-science-education-dreamstale-lineal-dreamstale.png" />
                              </span>
                              Child Seat
                            </li>
                            <li class="check">
                              <span class="ion-ios-checkmark"></span>GPS
                            </li>
                            <li class="check">
                              <span class="ion-ios-checkmark"></span>Luggage
                            </li>
                            <li class="check">
                              <span class="ion-ios-checkmark"></span>Music
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-4">
                          <ul class="features">
                            <li class="check">
                              <span class="ion-ios-checkmark"></span>Seat Belt
                            </li>
                            <li class="remove">
                              <span class="ion-ios-close"></span>Sleeping Bed
                            </li>
                            <li class="check">
                              <span class="ion-ios-checkmark"></span>Water
                            </li>
                            <li class="check">
                              <span class="ion-ios-checkmark"></span>Bluetooth
                            </li>
                            <li class="remove">
                              <span class="ion-ios-close"></span>Onboard
                              computer
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-4">
                          <ul class="features">
                            <li class="check">
                              <span class="ion-ios-checkmark"></span>Audio input
                            </li>
                            <li class="check">
                              <span class="ion-ios-checkmark"></span>Long Term
                              Trips
                            </li>
                            <li class="check">
                              <span class="ion-ios-checkmark"></span>Car Kit
                            </li>
                            <li class="check">
                              <span class="ion-ios-checkmark"></span>Remote
                              central locking
                            </li>
                            <li class="check">
                              <span class="ion-ios-checkmark"></span>Climate
                              control
                            </li>
                          </ul> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      class="tab-pane fade show active"
                      id="pills-manufacturer"
                      id="pills-description"
                      role="tabpanel"
                      aria-labelledby="pills-description-tab"
                      style={{
                        fontFamily: "sans",
                        fontSize: "26px",
                        fontWeight: "500",
                        letterSpacing: 1.1,
                        color: "#999999",

                        marginTop: "10px",
                      }}
                      // aria-labelledby="pills-manufacturer-tab"
                    >
                      <p>
                        Even the all-powerful Pointing has no control about the
                        blind texts it is an almost unorthographic life One day
                        however a small line of blind text by the name of Lorem
                        Ipsum decided to leave for the far World of Grammar.
                      </p>
                      <p>
                        When she reached the first hills of the Italic
                        Mountains, she had a last view back on the skyline of
                        her hometown Bookmarksgrove, the headline of Alphabet
                        Village and the subline of her own road, the Line Lane.
                        Pityful a rethoric question ran over her cheek, then she
                        continued her way.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleCar;
