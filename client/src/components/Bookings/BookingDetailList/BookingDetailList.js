import React from "react";
import BookingDetail from "../BookingDetail/BookingDetail";

const BookingDetailList = (props) => {
//   console.log(props);
  return (
    <ul
      class="features"
      style={{
        listStyle: "none",
        flexWrap: " wrap",
        display: "flex",
        padding: 0,
        margin: "20px",
      }}
    >
      {props?.details?.map((detail, index) => (
        <BookingDetail detail={detail} key={index} />
      ))}
    </ul>
  );
};

export default BookingDetailList;
