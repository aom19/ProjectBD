import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./CarItem.css";
import { deleteCar } from "../../../features/actions/cars";

const CarItem = (props) => {
  const token = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log(props);
  const handleSubmit = () => {
    history.push(`/car/${props.id}`, { params: props });
  };
  const handleDelete = (id) => {
    dispatch(deleteCar(props.id));
    console.log(props.id);
  };
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
            {props.price} $ <span>/day</span>
          </p>
        </div>
        <p class="d-flex mb-0 d-block">
          {token?.token && !token?.isAdmin ? (
            <a onClick={handleSubmit} class="btn btn-primary py-2 mr-1">
              Book now
            </a>
          ) : token?.token && token?.isAdmin ? (
            <a
              class="btn btn-danger py-2 mr-1 text-white"
              onClick={handleDelete}
            >
              Delete
            </a>
          ) : (
            <></>
          )}

          <a class="btn btn-secondary py-2 ml-1" onClick={handleSubmit}>
            Details
          </a>
        </p>
      </div>
    </div>
  );
};

export default CarItem;
