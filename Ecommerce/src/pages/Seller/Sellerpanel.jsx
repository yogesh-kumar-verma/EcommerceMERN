import React, { useContext, useEffect, useMemo, useState } from "react";
import Authentication from "../../store/auth-context";
import Sellerproduct from "../Partials/Sellerproduct";
import "./Sellerpanel.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Addproduct from "./Addproduct";
import axios from "../../api/axios";
function Sellerpanel(props) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [toggler, setToggler] = useState(1);
  useEffect(() => {
    axios.get(`/seller/${page}`).then((response) => {
      setProducts(response.data);

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }, [page, toggler]);
  return (
    <div>
      <br />
      <br />

      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Product Page</Tab>
          <Tab>Add Products</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="d-flex row" id="trans" style={{ zIndex: "0" }}>
              {products?.map((value, index) => {
                return (
                  <Sellerproduct
                    key={value._id}
                    product={value} 
                    setToggler={setToggler}
                    setProducts={setProducts}
                  />
                );
              })}
            </div>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-info"
                onClick={(e) => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
              >
                prev page
              </button>
              <button
                className="btn btn-info"
                onClick={(e) => {
                  setPage(page + 1);
                }}
              >
                next page
              </button>
            </div>
          </TabPanel>
          <TabPanel>
            <Addproduct />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default React.memo(Sellerpanel);
