import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import BookingItem from "../BookingItem/BookingItem";

const BookingList = () => {
  const bookings = useSelector((state) => state.bookings);
  const cars = useSelector((state) => state.cars);
  const token = useSelector((state) => state.user);

  const [displayBookings, setDisplayBookings] = useState();

  useEffect(() => {
    if (token?.isAdmin) {
      let result = cars?.availableCars.filter((o1) =>
        bookings?.allBookings.some((o2) => o1?._id === o2?.event?._id)
      );
      setDisplayBookings(result);
    } else {
      let result = cars?.availableCars.filter((o1) =>
        bookings?.userBookings.some((o2) => o1?._id === o2?.event?._id)
      );
      setDisplayBookings(result);
    }
  }, [token, bookings]);

  // console.log(bookings);

  return (
    <div class="container">
      <div class="row">
        {displayBookings?.map((car) => (
          <li class="col-md-4" style={{ listStyle: "none" }}>
            {console.log(car)}
            <BookingItem
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
      </div>
    </div>
  );
};

export default BookingList;
