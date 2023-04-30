import React, { useContext, useRef } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Authentication from "../../store/auth-context";
import { Link } from "react-router-dom";
import LoginTab from "./LoginTab";
import SignTab from "./SignTab";

function Login(props) {
  const cntxt = useContext(Authentication);


  return (
    <>
      <div className="d-flex  justify-content-center ">
        <div
          className="d-flex   justify-content-center  align-item-center rounded shadow py-4 "
          style={{
            width: "100hw",
            marginTop: "30px",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "25rem",
              display: "block",
            }}
          >
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>Login</Tab>
                <Tab>Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <LoginTab />
                </TabPanel>
                <TabPanel>
                  <SignTab />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
