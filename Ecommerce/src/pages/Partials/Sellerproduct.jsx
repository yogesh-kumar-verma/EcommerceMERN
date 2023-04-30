import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import axios from "../../api/axios";
import Authentication from "../../store/auth-context";

function Sellerproduct(props) {
  const cntxt = useContext(Authentication);
  const { product } = props;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [desc, setDesc] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);
  const deleteProduct = () => {
    try {
      axios.get(`product/delete/${product._id}`).then((response) => {
        console.log(response);
        props.setProducts((prevState) => {
          const newarray = prevState.filter((value) => {
            return value._id != product._id;
          });
          return newarray;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateProduct = (e) => {
    e.preventDefault();
    // console.log("product details ", name, price, quantity, desc);
    // return;
    if (name == undefined || name == null) {
      return;
    }

    if (price == null || price == undefined) {
      return;
    }
    if (quantity == null || quantity == undefined) {
      return;
    }
    if (desc == null || desc == undefined) {
      return;
    }
    console.log("price", name, price, quantity, desc);
    // return;

    try {
      axios
        .post(`product/updatedetails/${product._id}`, {
          name: name,
          description: desc,
          price: price,
          quantity: quantity,
        })
        .then((response) => {
          console.log(response);
          props.setToggler((prevState) => {
            return prevState == 1 ? 0 : 1;
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <br />

      <div className="card shadow m-2 py-2 px-1" style={{ width: "18rem" }}>
        <img
          className="card-img-top img-fluid"
          src={cntxt.dir + product.images}
          alt="Card image cap"
          style={{ maxHeight: "18rem", minHeight: "18rem" }}
        />

        <div id="product._id" className="card-body">
          <p className="id">ID:-{product._id} </p>
          <p className="name">Name:-{product.name} </p>

          <p className="desc">Desc:-{product.description}</p>
          <p className="price">Price:-{product.price} </p>
          <p className="quantity">Quantity:-{product.quantity} </p>

          <Popup
            trigger={<button className="btn btn-info update">Update</button>}
            modal
            nested
          >
            {(close) => (
              <>
                <button
                  className="btn btn-info text-right py-2"
                  onClick={() => close()}
                >
                  X
                </button>{" "}
                <form onSubmit={updateProduct}>
                  <div className="row mb-3">
                    <div className="col-md-9">
                      {" "}
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
                        value={quantity}
                        className="form-control"
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputCity" className="form-label">
                        Desc
                      </label>
                      <input
                        type="text"
                        value={desc}
                        className="form-control"
                        onChange={(e) => {
                          setDesc(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={() => {
                      setTimeout(() => {
                        close();
                      }, 1000);
                    }}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </>
            )}
          </Popup>
          <a
            className="btn btn-danger delete"
            onClick={deleteProduct}
            // href="/product/delete/product._id"
          >
            Delete
          </a>
        </div>
      </div>
    </>
  );
}

export default Sellerproduct;
