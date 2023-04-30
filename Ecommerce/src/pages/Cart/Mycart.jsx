import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import axios from "../../api/axios";
import Authentication from "../../store/auth-context";
import Mycartproduct from "../Partials/Mycartproduct";

function Mycart() {
  const [products, setProducts] = useState([]);

  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  // const [isChange]
  const cntxt = useContext(Authentication);
  const cartupdate = cntxt.cartupdate;
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/cart`).then((response) => {
      setProducts(response.data);
    });
  }, [cartupdate]);
  const addressHandler = (e) => {
    e.preventDefault();
    if (!address || !pincode || !state || !city) {
      alert("please Enter valid address");
      return;
    }
    console.log(address, pincode, state, city, "address");
    try {
      axios
        .post("/placeorder", { city, address, state, pincode })
        .then((response) => {
          navigate("/placeorder/myorders");
          // console.log("data", response.data);
        });
    } catch (error) {
      alert("some error occured");
    }
  };
  return (
    <>
      <div className="row" style={{ minHeight: "100vh" }}>
        <br />
        <br />

        {products ? (
          products.map((product) => {
            return <Mycartproduct product={product} />;
          })
        ) : (
          <h1>loading product</h1>
        )}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "3rem",
          right: "3rem",
          zIndex: "12",
        }}
      >
        {" "}
        <Link className="btn btn-info mx-2" to="placedorders">
          Pending Orders
        </Link>
        <Popup
          trigger={<button className="btn btn-info"> Place Order</button>}
          modal
          nested
        >
          {(close) => (
            <>
              <button
                class="btn btn-info text-right py-2"
                onClick={() => close()}
              >
                X
              </button>{" "}
              <form onSubmit={addressHandler}>
                <div className="row mb-3">
                  <div className="col-md-9">
                    {" "}
                    <label for="inputAddress" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id=""
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-3">
                    <label for="inputCity" className="form-label">
                      Pincode
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => {
                        setPincode(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label for="state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputCity" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </>
          )}
        </Popup>
      </div>
    </>
  );
}

export default Mycart;
