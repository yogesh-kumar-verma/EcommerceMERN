import React, { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import "./SignTab.css";
const Pwd_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,24}$/;
function SignTab() {
  const userRef = useRef();
  const errRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState("");
  const [userFocus, setUserFocus] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setmatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [mathcFocus, setMathcFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    const result = Pwd_REGEX.test(pwd);

    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const v1 = Pwd_REGEX.test(pwd);
    if (!v1) {
      setErrMsg("Envalid Entry");
      return;
    }
    try {
      let response = await axios.post("/signup", {
        name: name,
        username: user,
        email: email,
        password: pwd,
        mobile: mobile,
      });
      let data = response.data;

      setSucess(true);
    } catch (error) {
      setErrMsg(error.response.data);
      errRef.current.focus();
    }
  };

  return (
    <>
      {sucess ? (
        <div>
  
          <h1> Success fully submited</h1>
        </div>
      ) : (
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
              <label htmlFor="">Your Name </label>
              <input
                type="text"
                name="name"
                className="form-control w-80"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Your Email </label>
              <input
                type="text"
                name="email"
                className="form-control w-80"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

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
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => {
                  setUserFocus(true);
                }}
                onBlur={() => {
                  setUserFocus(false);
                }}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                {" "}
                A valid User name input
              </p>
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
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />

              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                8 to 24 characters <br />
                must include upper and lowercase letter ,a number and a special
                characters
                <br />
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="pass1">Confirm Password </label>

              <input
                type="password"
                id="psw1"
                className="form-control w-80"
                name="password1"
                required
                onChange={(e) => setmatchPwd(e.target.value)}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="pwdnote1"
                onFocus={() => setMathcFocus(true)}
                onBlur={() => setMathcFocus(false)}
              />

              <p
                id="pwdnote1"
                className={
                  mathcFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                must match the first password input field <br />
              </p>
              <div className="form-group">
                <label htmlFor="user">Moblie </label>
                <input
                  type="text"
                  name="mobile"
                  className="form-control w-80"
                  id="user"
                  required
                  onChange={(e) => setmobile(e.target.value)}
                />
              </div>
            </div>
            <button
              className="btn btn-primary my-2"
              type="submit"
              disabled={!validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default SignTab;
