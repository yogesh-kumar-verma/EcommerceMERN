import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Authentication from "../../store/auth-context";

function LoginTab() {
  const cntxt = useContext(Authentication);

  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [sucess, setSucess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // console.log("login ho rha hi");
    // cntxt.onLogin();
    // return;
    try {
      let response = await axios.post(
        "/login",
        {
          username: user,
          password: pwd,
        },
        { withCredentials: true }
      );
      console.log(response, "errper");
      let data = response.data.user;
      // const accessToken = response?.data?.accessToken;
      // const roles = response?.user?.role;
      // console.log("set Auth ", response);
      // cntxt.setAuth(...user);
      // const object = new Object({
      //   user: "yogesh",
      //   pwd: "kuchh bhi",
      //   role: 1,
      //   accessToken: "kjsldfjsldf;laj;sdjf;adfa",
      // });
      cntxt.setAuth(data);
      setUser("");
      setPwd("");
      cntxt.onLogin();
      navigate("/");
      return;

      // setErrMsg(response.data);
    } catch (error) {
      console.log("err", error);
      setErrMsg(error.response.data);
      errRef.current.focus();
    }
  };
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "instructions" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="user">Username </label>
          <input
            type="text"
            name="username"
            className="form-control w-80"
            id="user"
            ref={userRef}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pass">Password </label>
          <input
            type="password"
            id="psw"
            className="form-control w-80"
            name="password"
            required
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <div className="form-group"></div>

        <button
          type="submit"
          // onClick={cntxt.onLogin}
          className="btn my-2 btn-primary"
          // to="/"
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default LoginTab;
