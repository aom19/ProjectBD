import React from "react";
import image1 from "../assets/bg_1.jpg";
import image3 from "../assets/bg_6.jpeg";
import Section from "../components/Section/Section";

import { NavLink } from "react-router-dom";
const About = () => {
  return (
    <div
      style={{
        // backgroundColor: "blue",
        width: "100%",
        height: "86vh",
      }}
    >
      <Section image={image1} name={"About Us"} page={"About"} />
      {/* <section
        class="hero-wrap hero-wrap-2 js-fullheight ftco-degree-bg"
        style={{
          backgroundImage: `url(${image1})`,
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
                  About us <i class="ion-ios-arrow-forward"></i>
                </span>
              </p>
              <h1 class="mb-3 bread">About Us</h1>
            </div>
          </div>
        </div>
      </section> */}

      <section class="ftco-section ftco-about " style={{ marginTop: "-40px" }}>
        <div class="container">
          <div class="row no-gutters">
            <div
              class="col-md-6 p-md-5 img img-2 d-flex justify-content-center align-items-center "
              style={{
                backgroundImage: `url(${image3})`,
                // backgroundSize: "cover",
                backgroundPosition: "center ",
                // overflow: "hidden",
                // zIndex: -999,
                marginLeft: "-50px",
              }}
            ></div>
            <div class="col-md-6 wrap-about ">
              <div class="heading-section heading-section-white pl-md-5">
                <span class="subheading">About us</span>
                <h2 class="mb-4">Welcome to Carbook</h2>

                <p>
                  A small river named Duden flows by their place and supplies it
                  with the necessary regelialia. It is a paradisematic country,
                  in which roasted parts of sentences fly into your mouth.
                </p>
                <p>
                  On her way she met a copy. The copy warned the Little Blind
                  Text, that where it came from it would have been rewritten a
                  thousand times and everything that was left from its origin
                  would be the word "and" and the Little Blind Text should turn
                  around and return to its own, safe country. A small river
                  named Duden flows by their place and supplies it with the
                  necessary regelialia. It is a paradisematic country, in which
                  roasted parts of sentences fly into your mouth.
                </p>
                <p>
                  <NavLink to="/cars" class="btn btn-primary py-3 px-4">
                    Search Vehicle
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
