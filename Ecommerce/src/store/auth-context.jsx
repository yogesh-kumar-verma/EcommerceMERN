import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const Authentication = React.createContext({
  is_logged_in: false,
  onLogin: () => {},
  onLogout: (username, password) => {},
  products: [],
  page: 1,
  onClickLoadMore: () => {},
  onGetProducts: () => {},
  dir: "",
  setAuth: (object) => {},
  cartupdate: 0,
  setCartupdate: () => {},
});
export const AuthenticationContext = (props) => {
  const [is_logged_in, setis_logged_in] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartupdate, setCartUpdate] = useState(0);
  const [page, setPage] = useState(1);
  const [auth, setAuth] = useState({});
  const changePage = () => {
    setPage(page + 1);
  };
  const setCartupdate = () => {
    if (cartupdate == 1) {
      setCartUpdate(0);
    } else {
      setCartUpdate(1);
    }
  };
  const getProducts = (data) => {
    setProducts([...data]);
  };
  const setAuthHandler = (object) => {
    setAuth({ ...object });
  };
  const loginHandler = () => {
    // localStorage.setItem("is_logged_in", "1");
    setis_logged_in(true);
  };
  const logoutHandler = (username, password) => {
    axios.get("/logout").then((response) => {
      console.log(response, "res");
      if (response.status == 200) {
        setis_logged_in(false);
        setAuth({});
      }
    });

    // localStorage.setItem("is_logged_in", "0");
  };

  useEffect(() => {
    axios.get("/getuser").then((response) => {
      console.log(response, "res");
      if (response.status == 200) {
        console.log("loging hona chahity");
        setAuth(response.data);
        setis_logged_in(true);
      }
    });
  }, []);
  return (
    <Authentication.Provider
      value={{
        is_logged_in: is_logged_in,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        products: products,
        page: page,
        setPage: setPage,
        auth: auth,
        cartupdate: cartupdate,
        // onClickLoadMore: changePage,
        onGetProducts: getProducts,
        dir: "http://localhost:3000/",
        setAuth: setAuthHandler,
        setCartupdate: setCartupdate,
      }}
    >
      {props.children}
    </Authentication.Provider>
  );
};
export default Authentication;
