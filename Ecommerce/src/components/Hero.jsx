import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
function Hero() {
  return (
    <>
      <Wrapper>
        <div className="container">
          <div className="grid grid-two-column">
            <div className="hero-section-data">
              <p className="intro-data">Welcome to </p>
              <h1> Cloth Store </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias atque temporibus veniam doloribus libero ad error
                omnis voluptates animi! Suscipit sapiente.
              </p>
              <NavLink>
                <button className="btn btn-info">show now</button>
              </NavLink>
            </div>
            {/* our homepage image  */}
          </div>
        </div>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.section`
  padding: 12rem 0;
  background-image: url("https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungM/M14/17th-post12/15412_M14-5G-AZ-Desktop_1500xh_01.jpg");
  color: white;
  img {
    min-width: 10rem;
    height: 10rem;
  }
  .hero-section-data {
    p {
      margin: 2rem 0;
    }
    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }
    .intro-data {
      margin-bottom: 0;
    }
  }
  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;
    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }

  @media (max-width: 600px) {
    .grid {
      gap: 10rem;
    }
    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default Hero;
