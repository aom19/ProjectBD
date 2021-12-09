import React from "react";

const BookingDetail = (props) => {
  console.log(props);
  return (
    <li
      class="check"
      style={{
        fontFamily: "sans-serif",
        fontSize: "22px",
        fontWeight: "500",
        letterSpacing: 1.1,
        color: "#999999",
        flex: "1 0 40%",
        marginTop: "20px",
      }}
    >
      <span class="ion-ios-checkmark"></span>
      {props.detail.key} :
      <span style={{ color: "black" }}>
        {props.detail.type === "Date"
          ? new Date(props.detail.value).toLocaleDateString()
          : props.detail.value}
      </span>
    </li>
  );
};

export default BookingDetail;
