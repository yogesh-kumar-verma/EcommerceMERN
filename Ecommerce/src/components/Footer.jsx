import React from "react";
import styled from "@emotion/styled";
const Section = styled.footer`
  ul {
    list-style-type: none;
  }
`;
function Footer() {
  return (
    <Section>
      <div className="container-fluid tohide">
        <div
          className="row  d-md-flex px-2  mt-4 justify-content-center"
          style={{ backgroundColor: "rgb(214 ,225, 225)" }}
        >
          <div className="col-3 px-1 py-3">
            <ul>
              <li>
                <h3>Address</h3>
                <hr />
              </li>
              <li>
                <a>ZZZZ Workspace</a>
              </li>
              <li>
                <a>Street 43,building 4A</a>
              </li>
              <li>
                <a>Industrial Area</a>
              </li>
              <li>
                <a>Aqwertyu </a>
              </li>
              <li>
                <a>Mumbai</a>
              </li>
            </ul>
          </div>
          <div className="col-3 px-1 py-3">
            <ul>
              <li>
                <h3>Clients</h3>
              </li>
              <hr />
              <li>
                <a>XYZ org</a>
              </li>
              <li>
                <a>ABC org</a>
              </li>
              <li>
                <a>IJK org</a>
              </li>
              <li>
                <a>Qwerty Corp</a>
              </li>
              <li>
                <a>ZAQ PVT</a>
              </li>
            </ul>
          </div>
          <div className="col-3 px-1 py-3">
            <ul>
              <li>
                <h3>Stack</h3>
              </li>
              <hr />
              <li>
                <a>HTML5,CSS,JS</a>
              </li>
              <li>
                <a>React</a>
              </li>
              <li>
                <a>Angular</a>
              </li>
              <li>
                <a>NodeJS</a>
              </li>
              <li>
                <a>Django</a>
              </li>
            </ul>
          </div>
          <div className="col-3 px-1 py-3">
            <ul>
              <li>
                <h3>About ClothesMart</h3>
              </li>
              <hr />
              <li>
                <a>About CEO</a>
              </li>
              <li>
                <a>About Team</a>
              </li>
              <li>
                <a>Location</a>
              </li>
              <li>
                <a>Working Atmosphere</a>
              </li>
              <li>
                <a>Contact Being Geeky</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Footer;
