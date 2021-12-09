import React from "react";
import FeatureItem from "../FeatureItem/FeatureItem";
import "../../../style/style.css";

const FeatureList = (props) => {
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
      {props?.features?.map((feature, index) => (
        <FeatureItem feature={feature} key={index} />
      ))}
    </ul>
  );
};

export default FeatureList;
