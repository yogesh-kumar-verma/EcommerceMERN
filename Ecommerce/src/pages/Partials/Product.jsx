import React, { useContext, useState } from "react";
import Authentication from "../../store/auth-context";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "../../api/axios";
import Alert from "../../components/Alert";

function Product(props) {
  const cntxt = useContext(Authentication);
  const [alert, setAlert] = useState(false);
  const addToCart = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 1000);
    try {
      axios.get(`product/addcart/${props.product._id}`).then((response) => {
        // console.log("alter aa rha hai");
      });
    } catch (error) {
      console.log("eror", error);
    }
  };
  return (
    <>
      {alert ? <Alert message={"added to cart sucessfully"} /> : null}

      <div className="col-sm-12 col-md-5 my-1  col-lg-3">
        <div className="card  " style={{ width: "18rem" }}>
          <img
            className="card-img-top img-fluid"
            src={cntxt.dir + props.product.images}
            alt="Card image cap"
            style={{ maxHeight: "16rem", minHeight: "16rem" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.product.name}</h5>

            <Popup
              trigger={<button className="btn btn-info"> View Details</button>}
              modal
              nested
            >
              {(close) => (
                <div class="row py-3">
                  <div class="col-md-6 col-sm-12">
                    <img
                      class="img-fluid"
                      src={cntxt.dir + props.product.images}
                      alt=""
                    />
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <h2>{props.product.name}</h2>
                    <h5>{props.product.description}</h5>
                    <h4>{props.product.price}</h4>
                    <h4>{props.product.currency}</h4>
                    <h4>{props.product.brand}</h4>
                    <h4>{props.product.category}</h4>
                    <button
                      class="btn btn-info text-left"
                      onClick={() => close()}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </Popup>

            <a onClick={addToCart} className="btn mr-1 btn-warning">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Product);
