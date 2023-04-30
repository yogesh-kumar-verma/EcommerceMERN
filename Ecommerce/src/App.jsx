import { useContext, useEffect, useMemo, useState } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

import Authentication from "./store/auth-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Sellerdelivery from "./pages/Seller/Sellerdelivery";
import Sellerpanel from "./pages/Seller/Sellerpanel";
import Myorders from "./pages/Cart/Myorders";
import Mycart from "./pages/Cart/Mycart";
import Changepass from "./pages/Cart/Changepass";
import Login from "./pages/Authentications/Login";
import Error from "./pages/Error/Error";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin";
import Pendingproduct from "./pages/Cart/Pendingproduct";
import Footer from "./components/Footer";

function App() {
  // useEffect(() => {

  // }, [])
  const cntxt = useContext(Authentication);
  const tempproducts = cntxt.products;
  const { page } = cntxt;
  const products = useMemo(() => {
    return tempproducts;
  }, [tempproducts]);

  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Navbar />
          {cntxt.is_logged_in ? (
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              ></Route>
              <Route
                exact
                path="/seller"
                element={
                  <RequireAdmin>
                    <Sellerpanel products={products} />
                  </RequireAdmin>
                }
              ></Route>
              <Route
                exact
                path="/seller/delivery"
                element={
                  <RequireAdmin>
                    <Sellerdelivery />
                  </RequireAdmin>
                }
              ></Route>
              <Route
                exact
                path="/cart"
                element={
                  <RequireAuth>
                    <Mycart />
                  </RequireAuth>
                }
              ></Route>
              <Route
                exact
                path="/cart/placedorders"
                element={
                  <RequireAuth>
                    <Pendingproduct />
                  </RequireAuth>
                }
              ></Route>
              <Route
                exact
                path="/placeorder/myorders"
                element={
                  <RequireAuth>
                    <Myorders />
                  </RequireAuth>
                }
              ></Route>
              <Route
                exact
                path="/changepass"
                element={
                  <RequireAuth>
                    <Changepass />{" "}
                  </RequireAuth>
                }
              ></Route>

              <Route exact path="/login" element={<Login />} />
              <Route
                path="*"
                element={
                  <>
                    <br />
                    <br />
                    <Error />
                  </>
                }
              />
            </Routes>
          ) : (
            <Login />
          )}
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
