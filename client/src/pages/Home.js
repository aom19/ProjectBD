import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import image1 from "../assets/bg_1.jpg";
import image2 from "../assets/bg_5.jpeg";
import image3 from "../assets/bg_6.jpeg";
import image4 from "../assets/bg_7.jpeg";
import { FaRoute, FaRegHandshake, FaMoneyBill } from "react-icons/fa";

import "./Home.css";

//actions
import { filterCars } from "../features/actions/booking";

const Home = () => {
  const dispatch = useDispatch();

  //array of images
  const imgArray = [image1, image2, image3, image4];
  const [state, setState] = useState({ img: 0 });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    dispatch(
      filterCars(
        values.pickUpLocation,
        values.pickUpDate,
        values.dropOffLocation,

        values.dropOffDate
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.img === 3) {
        setState((prev) => ({
          ...prev,
          img: 0,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          img: state.img + 1,
        }));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [state.img]);

  return (
    <div>
      <div
        className="hero-wrap ftco-degree-bg"
        style={{
          backgroundImage: `url(${imgArray[state.img]})`,
          // backgroundSize: "cover",
          backgroundPosition: "center",
          // overflow: "hidden",
          zIndex: -999,
        }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text justify-content-start align-items-center justify-content-center">
            <div className="col-lg-8 ">
              {/* <div className="col-lg-8 "> */}
              <div className="text w-100 text-center mb-md-5 pb-md-5">
                <h1 className="mb-4">Fast &amp; Easy Way To Rent A Car</h1>
                <p style={{ fontSize: "18px" }}>
                  A small river named Duden flows by their place and supplies it
                  with the necessary regelialia. It is a paradisematic country,
                  in which roasted part 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ------- form section */}

      <section className="ftco-section ftco-no-pt ">
        <div className="container">
          <div className="row no-gutters">
            <div
              className="col-md-12	featured-top"
              style={{ marginTop: "-280px" }}
            >
              <div className="row no-gutters">
                <div
                  className="col-md-4 d-flex align-items-center"
                  style={{ marginRight: "-58px" }}
                >
                  <form
                    onSubmit={handleSubmit}
                    className="request-form  bg-primary"
                  >
                    <h2>Make your trip</h2>
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
                        value="Rent A Car Now"
                        className="btn btn-secondary py-3 px-4"
                      />
                    </div>
                  </form>
                </div>
                <div className="col-md-8 d-flex align-items-center">
                  <div className="services-wrap rounded-right w-100">
                    <h3 className="heading-section mb-4">
                      Better Way to Rent Your Perfect Cars
                    </h3>
                    <div className="row d-flex mb-4">
                      <div className="col-md-4 d-flex align-self-stretch ">
                        <div className="services w-100 text-center">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <span className="FaRoute">
                              <FaRoute />
                            </span>
                          </div>
                          <div className="text w-100">
                            <h3 className="heading mb-2">
                              Choose Your Pickup Location
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 d-flex align-self-stretch">
                        <div className="services w-100 text-center">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <span className="flaticon-handshake">
                              <FaRegHandshake />
                            </span>
                          </div>
                          <div className="text w-100">
                            <h3 className="heading mb-2">
                              Select the Best Deal
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 d-flex align-self-stretch ">
                        <div className="services w-100 text-center">
                          <div className="icon d-flex align-items-center justify-content-center">
                            <span className="flaticon-rent">
                              <FaMoneyBill />
                            </span>
                          </div>
                          <div className="text w-100">
                            <h3 className="heading mb-2">
                              Reserve Your Rental Car
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p>
                      <a href="#" className="btn btn-primary py-3 px-4">
                        Reserve Your Perfect Car
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
