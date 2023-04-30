import React, { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import Authentication from "../../store/auth-context";

function Myorders() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const cntxt = useContext(Authentication);
  useEffect(() => {
    axios.get(`/placeorder/myorders`).then((response) => {
      // console.log(response);
      setProducts(response.data);
    });
  }, []);
  return (
    <div className="row" style={{ minHeight: "100vh" }}>
      <br />
      <br />
      {products ? (
        products.map((product) => {
          return (
            <div key={product.order_id} className="col-sm-3 col-12">
              <div
                className="card shadow  py-2 px-1"
                style={{ width: "20rem" }}
              >
                <img
                  className="card-img-top img-fluid"
                  src={cntxt.dir + product.images}
                  alt="Card image cap"
                  style={{ maxHeight: "18rem", minHeight: "18rem" }}
                />

                <div className="card-body">
                  <h5 className="card-title">Name:-{product.name} </h5>
                  <h5 className="card-title">Address:-{product.address}</h5>
                  <h5 className="card-title">
                    Quantity:-{product.quantity_ordered}
                  </h5>
                  <h5 className="card-title">Price:-{product.price}</h5>
                  <h5 className="card-title">
                    Total:-{product.price * product.quantity_ordered}{" "}
                  </h5>
                  <h5 className="card-title">
                    status-
                    {product.payment_status == "pending"
                      ? "Payment Pending"
                      : "Pay Success"}{" "}
                  </h5>
                  {product.payment_status == "pending" ? (
                    <>
                      <br />
                      <h5>Please pay within 7 days after order is placed</h5>
                    </>
                  ) : (
                    <a
                      className="btn btn-lg btn-warning my-2"
                      href="confirm/product.order_id%>"
                    >
                      Confirm Delivery
                    </a>
                  )}{" "}
                  <a
                    className="btn btn-lg btn-danger"
                    href="cancel/product.order_id%>"
                  >
                    CancelOrder
                  </a>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>loading data</h1>
      )}
    </div>
  );
}

export default Myorders;
