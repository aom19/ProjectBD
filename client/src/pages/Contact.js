import React from "react";
import image1 from "../assets/bg_1.jpg";
import image3 from "../assets/bg_7.jpeg";

import Footer from "../components/Footer/Footer";
import Section from "../components/Section/Section";
import "./Home.css";
const Contact = () => {
  return (
    <>
      <div>
        <Section image={image1} page={"Contact"} name={"Contact Us"} />
        {/* <section
          class="hero-wrap hero-wrap-2 js-fullheight ftco-degree-bg"
          style={{
            backgroundImage: `url(${image3})`,
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
                    Contact <i class="ion-ios-arrow-forward"></i>
                  </span>
                </p>
                <h1 class="mb-3 bread">Contact Us</h1>
              </div>
            </div>
          </div>
        </section> */}

        <section class="ftco-section contact-section">
          <div class="container">
            <div class="row d-flex mb-5 contact-info">
              <div class="col-md-4">
                <div class="row mb-5">
                  <div class="col-md-12">
                    <div class="border w-100 p-4 rounded mb-2 d-flex">
                      <div class="icon mr-3">
                        <span class="icon-map-o"></span>
                      </div>
                      <p>
                        <span>Address:</span> Chisinau , Republic of Moldova
                      </p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="border w-100 p-4 rounded mb-2 d-flex">
                      <div class="icon mr-3">
                        <span class="icon-mobile-phone"></span>
                      </div>
                      <p>
                        <span>Phone:</span>{" "}
                        <a
                          style={{ textDecoration: "none" }}
                          href="tel://1234567920"
                        >
                          + 1235 2355 98
                        </a>
                      </p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="border w-100 p-4 rounded mb-2 d-flex">
                      <div class="icon mr-3">
                        <span class="icon-envelope-o"></span>
                      </div>
                      <p>
                        <span>Email:</span>{" "}
                        <a
                          style={{ textDecoration: "none" }}
                          href="mailto:info@yoursite.com"
                        >
                          rentCarAOM@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8 block-9 mb-md-5">
                <form action="#" class="bg-light p-5 contact-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="7"
                      className="form-control"
                      placeholder="Message"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Send Message"
                      className="btn btn-primary py-3 px-5"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Contact;
