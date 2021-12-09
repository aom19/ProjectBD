import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cancelBooking } from "../../../features/actions/booking";

const BookingItem = (props) => {
  const user = useSelector((state) => state.user);
  const bookings = useSelector((state) => state.bookings);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    history.push(`/bookings/${props.id}`, { params: props });
  };

  const result = bookings?.allBookings.filter(
    (booking) => booking?.event?._id == props.id
  );

  return (
    <div class="car-wrap rounded ">
      <div
        class="img rounded d-flex align-items-end"
        style={{ backgroundImage: `url(${props.urlImage})` }}
      ></div>
      <div class="text">
        <h2 class="mb-0">
          <a href="car-single.html">{props.make}</a>
        </h2>
        <div class="d-flex mb-3">
          <span class="cat">{props.model}</span>
          <p class="price ml-auto">
            {props.price} <span>/day</span>
          </p>
        </div>
        <p class="d-flex mb-0 d-block">
          <a
            class="btn btn-danger py-2 mr-1 text-white"
            onClick={() => dispatch(cancelBooking(result[0]._id))}
          >
            Cancel
          </a>
          <a class="btn btn-primary py-2 ml-1" onClick={handleSubmit}>
            Details
          </a>
        </p>
      </div>
    </div>
  );
};

export default BookingItem;
