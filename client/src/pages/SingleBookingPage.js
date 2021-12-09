import React from "react";
import { useSelector } from "react-redux";
import image1 from "../assets/bg_7.jpeg";
import Section from "../components/Section/Section";

import BookingDetailList from "../components/Bookings/BookingDetailList/BookingDetailList";

const SingleBookingPage = ({ location }) => {
  const selectedCar = location?.state?.params;
  const bookings = useSelector((state) => state.bookings);

  //   console.log(bookings.userBookings);
  const result = bookings?.userBookings.filter(
    (booking) => booking.event._id == selectedCar.id
  );
  console.log(result);

  const bookingDetail = [
    { key: "Pickup Location", value: result[0].pickUpLocation, type: "String" },
    {
      key: "Drop Off Location",
      value: result[0].dropOffLocation,
      type: "String",
    },
    { key: "Pickup Date", value: result[0].pickUpDate, type: "Date" },
    { key: "Drop Off Date", value: result[0].dropOffDate, type: "Date" },
  ];
  //   console.log(result);
  return (
    <div>
      <Section image={image1} page={"Booking"} name={" Booking Details"} />
      <section class="ftco-section ftco-car-details">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-12">
              <div class="car-details">
                <div
                  class="img rounded"
                  style={{ backgroundImage: `url(${selectedCar.urlImage}` }}
                ></div>
                <div class="text text-center">
                  <span class="subheading">{selectedCar.model}</span>
                  <h1>{selectedCar.make}</h1>
                </div>
              </div>
            </div>
          </div>
          <div class="row">{/* easy render important features */}</div>
          <div class="row">
            <div class="col-md-12 pills">
              <div class="bd-example bd-example-tabs">
                <div class="d-flex justify-content-center">
                  <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item">
                      <a
                        className="nav-link  active"
                        id="pills-description-tab"
                        data-toggle="pill"
                        role="tab"
                        aria-controls="pills-description"
                        aria-expanded="true "
                        // onClick={() => setActive(!active)}
                        style={{
                          fontSize: "25px",
                          fontWeight: "400",
                          cursor: "pointer",
                          fontFamily: "serif",
                          letterSpacing: 1.5,
                        }}
                      >
                        Details
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-description"
                    role="tabpanel"
                    aria-labelledby="pills-description-tab"
                  >
                    <div class="row">
                      <div>
                        <BookingDetailList
                          details={bookingDetail}
                          class="features"
                        />
                      </div>
                    </div>
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

export default SingleBookingPage;
