import React from "react";

const FeatureItem = (props) => {
  //   console.log(props.feature);
  return (
    <li
      class="check"
      style={{
        fontFamily: "sans-serif",
        fontSize: "22px",
        fontWeight: "500",
        letterSpacing: 1.1,
        color: "#999999",
        flex: "1 0 33%",
        marginTop: "10px",
      }}
    >
      <span class="ion-ios-checkmark">
        {props.feature.feature === "true" ? (
          <img src="https://img.icons8.com/emoji/28/000000/check-mark-emoji.png" />
        ) : (
          <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/24/000000/external-multiply-science-education-dreamstale-lineal-dreamstale.png" />
        )}
      </span>
      {props.feature.featureName}
    </li>
  );
};

export default FeatureItem;
