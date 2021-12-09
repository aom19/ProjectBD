import React from "react";

const Section = (props) => {
  return (
    <section
      class="hero-wrap hero-wrap-2 js-fullheight ftco-degree-bg"
      style={{
        backgroundImage: `url(${props.image})`,
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
                {props.page} <i class="ion-ios-arrow-forward"></i>
              </span>
            </p>
            <h1 class="mb-3 "> {props.name}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
