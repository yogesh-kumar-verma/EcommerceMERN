import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

function Sellerdelivery() {
  const [deliveries, setDeliveries] = useState([]);
  useEffect(() => {
    axios.get(`/seller/delivery`).then((response) => {
      console.log(response.data);
      setDeliveries(response.data);
    });
  }, []);
  return (
    <div>
      <br />
      <br />
      <h1 className="text-center">Your Pending Delivery</h1>
      <div className="d-flex flex-row row" id="maincon">
        <table className="table py-2 mx-3 my-3 table-striped">
          <thead>
            <tr>
              <th scope="col">ITEM ID</th>
              <th scope="col">ITEM Name</th>
              <th scope="col">ITEM Price</th>
              <th scope="col">Q-Ordered</th>
              <th scope="col">TOTAL</th>
              <th scope="col">ADDRESS</th>
              <th scope="col">Payment</th>
              <th scope="col">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {deliveries?.map((delivery) => {
              return (
                <tr>
                  <th scope="row">{delivery.order_id}</th>
                  <td>{delivery.name}</td>
                  <td>{delivery.order_total / delivery.quantity_ordered}</td>
                  <td>{delivery.quantity_ordered}</td>
                  <td>{delivery.order_total}</td>
                  <td>{delivery.address}</td>
                  <td>{delivery.payment_status}</td>
                  <td>{delivery.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sellerdelivery;
