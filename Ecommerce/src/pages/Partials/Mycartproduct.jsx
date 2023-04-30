import React, { useContext, useState } from "react";
import axios from "../../api/axios";
import Alert from "../../components/Alert";
import Authentication from "../../store/auth-context";

function Mycartproduct(props) {
  const { product } = props;
  const [alert, setAlert] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity);
  const cntxt = useContext(Authentication);
  const deleteFromCart = async () => {
    setAlert(true);
    setTimeout(() => {
      setAlert((prevState) => {
        false;
      });
    }, 1000);
    axios
      .get(
        `/product/deletecart/${product._id}
            `
      )
      .then((response) => {
        setTimeout(() => {
          cntxt.setCartupdate();
        }, 1000);
      })
      .catch(() => {
        console.log("error");
      });
  };

  const increment = () => {
    console.log("incremen");
    if (quantity == product.stock) {
      return;
    }
    setQuantity(quantity + 1);
    axios
      .get(
        `product/addcart/add/${product._id}
          `
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  const decrement = () => {
    if (quantity == 1) {
      return;
    }
    setQuantity(quantity - 1);
    axios
      .get(
        `product/minuscart/${product._id}
        `
      )
      .then((response) => {
        setQuantity(response.data);
      })
      .catch(() => {
        console.log("error");
      });
  };
  return (
    <>
      {" "}
      {alert ? <Alert color={"red"} message={"Deleted from cart"} /> : null}
      <div key={product._id} className="col-sm-3 col-12 my-2">
        <div className="card  py-2 px-1" style={{ width: "20rem" }}>
          <img
            className="card-img-top img-fluid"
            src={cntxt.dir + product.images}
            alt="Card image cap"
            style={{ maxHeight: "18rem", minHeight: "18rem" }}
          />

          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <h6>Price:-{product.price}</h6>
            <h6>Quantity:-{quantity}</h6>
            <div id={product._id}>
              {product.stock > 0 ? (
                <>
                  {" "}
                  <button
                    className="btn btn-secondary minus"
                    onClick={decrement}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <span className="quantity">{quantity} </span>
                  {product.stock > product.quantity ? (
                    <button
                      className="btn btn-secondary plus"
                      onClick={increment}
                    >
                      +
                    </button>
                  ) : null}
                  <span>
                    Stock left: <span className="left"> {product.stock}</span>
                  </span>
                </>
              ) : (
                <span> Its seems no stock left</span>
              )}
              <br />
              <a
                onClick={deleteFromCart}
                className="btn btn-danger delete my-1"
              >
                Delete{" "}
              </a>
              {/* <a
                href="/product/{product.product_id%>"
                className="btn btn-warning my-1 "
              >
                View Details{" "}
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mycartproduct;
