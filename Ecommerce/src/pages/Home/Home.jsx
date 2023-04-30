import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Hero from "../../components/Hero";
import Authentication from "../../store/auth-context";
import Product from "../Partials/Product";
// import axios from "../../api/axios";
function Home() {
  const cntxt = useContext(Authentication);
  // const [filter, setfilter] = useState(second);
  const { page, products, setPage } = cntxt;
  useEffect(() => {
    axios
      .get(`http://localhost:3000/fetchAll/${page}`, {
        withCredentials: true,
      })

      .then((data) => {
        cntxt.onGetProducts(data.data);
      });
  }, [page]);
  //   console.log("products", products);
  return (
    <>
      <Hero />
      <div id="loadmore" className="row  ">
        {products ? (
          <>
            {products.map((value, index) => {
              return (
                <>
                  <Product key={index} product={value} />
                </>
              );
            })}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "inline",
                  marginLeft: "45vw",
                }}
              >
                {page == 1 ? null : (
                  <a
                    onClick={() => {
                      setPage(page - 1);
                    }}
                    // onClick={cntxt.onClickLoadPrev}

                    className="btn bnt-lg btn-info py-2 m-3"
                  >
                    Prev Page
                  </a>
                )}
                <span> Current Page {page} </span>
                {products.length < 8 ? null : (
                  <a
                    onClick={() => {
                      setPage(page + 1);
                    }}
                    className="btn bnt-lg btn-info py-2 m-3"
                  >
                    Next Page
                  </a>
                )}
              </div>
            </div>{" "}
          </>
        ) : (
          "loading"
        )}
      </div>
    </>
  );
}

export default React.memo(Home);
