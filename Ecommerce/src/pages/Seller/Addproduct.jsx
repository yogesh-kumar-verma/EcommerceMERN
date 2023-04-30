import { Alert } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";

function Addproduct() {
  const errRef = useRef();

  const [alert, setAlert] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState();
  const [csvfile, setCsvfile] = useState();
  useEffect(() => {
    setErrMsg("");
  }, [name, desc, price, quantity, file]);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (name.trim() == "") {
      setErrMsg("invalid name");
      return;
    }

    if (desc.trim() == "") {
      setErrMsg("invalid description");
      return;
    }

    if (price < 1) {
      setErrMsg("invalid price");
      return;
    }

    if (quantity < 1) {
      setErrMsg("invalid quantity");
      return;
    }
    if (file.type != "image/png" && file.type != "image/jpeg") {
      console.log("file type", file.type);
      setErrMsg("Invalid File type");
    }
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        name: name,
        desc: desc,
        price: price,
        quantity: quantity,
      })
    );
    formData.append("file", file);
    axios.post("product/addproduct", formData).then((res) => {
      setAlert(true),
        setTimeout(() => {
          setAlert(false);
        }, 1000);
    });
  };
  const postcsv = () => {
    // formData.append(
    //   "data",
    //   JSON.stringify({ task: value, iscompleted: false, id: null })
    // );
    if (file.type != "text/csv") {
      console.log("file type", file.type);
      setErrMsg("Invalid File type");
    }
    const formData = new FormData();

    formData.append("file", csvfile);
    axios.post("/product/postcsv", formData).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      {" "}
      <div
        ref={errRef}
        className="card"
        id="sellerpanel"
        style={{ width: "50%", margin: "auto" }}
      >        
        {alert ? <Alert message={"added sucessfully"} /> : null}
        <p
          className={errMsg ? "instructions" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form onSubmit={onSubmitHandler}>
          <div className="card-body" id="uppop">
            <h5 className="card-title ">
              Name:
              <input
                minLength="1"
                className="name my-2"
                name="name"
                placeholder="Product name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </h5>
            <h5 className="card-title py-2 ">
              Description :
              <input
                minLength="1"
                className="desc"
                name="desc"
                placeholder="product description"
                required
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                value={desc}
              />
            </h5>
            <h5 className="card-title py-2">
              Price:
              <input
                className="price"
                name="price"
                type="number"
                placeholder="product price"
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
              />
            </h5>
            <h5 className="card-title py-2">
              Quantity:
              <input
                className="quantity"
                type="number"
                name="quantity"
                placeholder="product quantity"
                required
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </h5>

            <input
              type="file"
              name="file"
              id="file"
              accept="image/png, image/jpeg"
              required
              // ref={fileRef}

              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <button type="submit" className="btn btn-primary ">
              Add Product
            </button>
          </div>
        </form>
        <input
          type="file"
          name="csvfile"
          placeholder="upload the csv"
          accept="text/csv"
          required
          // ref={fileRef}

          onChange={(e) => {
            setCsvfile(e.target.files[0]);
          }}
        />
        <button className="btn btn-danger" onClick={postcsv}>
          Add in Bulk
        </button>
      </div>
    </>
  );
}

export default Addproduct;
