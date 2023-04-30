import React, { useContext, useEffect, useState } from "react";
import $ from "jquery";
import axios from "../../api/axios";
import Authentication from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

function Pendingproduct() {
  const [orders, setOrders] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  //creates new orderId everytime

  const cntxt = useContext(Authentication);
  useEffect(() => {
    axios.get(`/placeorder`).then((response) => {
      //  console.log(response.data);
      let newarray = response.data;
      let total1 = newarray.reduce((total, current) => {
        return total + current.order_total;
      }, 0);
      if (total > 0) {
        var settings = {
          url: "http://localhost:3000/payment",
          method: "POST",
          timeout: 0,
          headers: {
            "Content-Type": "application/json",
          },
          xhrFields: {
            withCredentials: true,
          },
          data: JSON.stringify({
            amount: total,
          }),
        };
        $.ajax(settings).done(function (response) {
          setOrderId(response.orderId);
          console.log(orderId);
          $("button").show();
        });
      }
      setTotal(total1);
      setOrders(response.data);
    });
  }, []);
  useEffect(() => {
    var settings = {
      url: "http://localhost:3000/payment",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      xhrFields: {
        withCredentials: true,
      },
      data: JSON.stringify({
        amount: total,
      }),
    };
    $.ajax(settings).done(function (response) {
      setOrderId(response.orderId);
      console.log(orderId);
      $("button").show();
    });
  }, [total]);
  const payBill = () => {
    // console.log(orderId);
    if (!orderId) {
      return;
    }
    var options = {
      key: "rzp_test_JEsPajElsTCi2B", // Enter the Key ID generated from the Dashboard
      amount: total * 10,
      currency: "INR",
      name: "Yogesh Shop",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      handler: function (response) {
        // console.log(JSON.stringify(response),"respose hai")
        var payid = response.razorpay_payment_id;
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)

        var settings = {
          url: "http://localhost:3000/payment/verify",
          method: "POST",
          timeout: 0,
          xhrFields: {
            withCredentials: true,
          },
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({ response }),
        };
        $.ajax(settings).done(function (response) {
          // alert(JSON.stringify(response))
          console.log(response);
          if (response.signatureIsValid == "true") {
            placesucessfull(payid);
            //  placesucessfull("failed")
          } else {
            placesucessfull("failed");
          }
          setOrderId(response.orderId);
        });
      },

      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    // rzp1.on('payment.failed', function (response){
    //         alert(response.error.code);
    //         alert(response.error.description);
    //         alert(response.error.source);
    //         alert(response.error.step);
    //         alert(response.error.reason);
    //         alert(response.error.metadata.order_id);
    //         alert(response.error.metadata.payment_id);
    // });
    rzp1.open();
    function placesucessfull(payid) {
      axios
        .post(`http://localhost:3000/placeorder/orderstatus`, {
          payid: payid,
        })
        .then((res) => {
          navigate("/placeorder/myorders");
        });
    }

    e.preventDefault();
  };

  return (
    <>
      <br />
      <br />
      <div style={{ minHeight: "100vh" }}>
        {orders != null
          ? orders.map((order) => {
              return (
                <div
                  style={{
                    backgroundColor: "rgb(231, 231, 231)",
                    width: "100%",
                  }}
                  className="py-2 px-2 mx-3 my-3 rounded shadows"
                >
                  <div className="card" style={{ width: "100%" }}>
                    <div className="row">
                      <div className="col-sm-4 col-12">
                        <img
                          className="img-fluid"
                          src={cntxt.dir + order.images}
                          alt="Card image cap"
                          style={{ maxHeight: "300px" }}
                        />
                      </div>
                      <div className="col-sm-8 col-12 d-flex align-items-center">
                        <div className="card-body">
                          <h5 className="card-title">Name:{order.name} </h5>
                          <h5 className="card-title">Price:{order.price} </h5>
                          <h5 className="card-title">
                            Quantity:{order.quantity_ordered}{" "}
                          </h5>

                          <h5 className="card-title">
                            Total:{order.order_total}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <div
        style={{
          position: "fixed",
          right: "3rem",
          bottom: "2rem",
          zIndex: "3",
        }}
      >
        <h3>
          Grand Total:<span id="grantotal">{total}</span>
        </h3>
        <button className="btn btn-info" onClick={payBill}>
          Pay The Bill
        </button>
      </div>
    </>
  );
}

export default Pendingproduct;
