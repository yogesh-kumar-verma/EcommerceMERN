import React from "react";

function Changepass() {
  return (
    <div>
      <br />
      <br />
      <div className="d-flex justify-content-center">
        <form action="/changepass/changed" method="post">
          <div
            className="d-flex flex-column align-items-center py-2 my-3 justify-contain-center"
            style={{ width: 60 }}
          >
            <div className="form-group">
              <label htmlFor="pass">Password </label>
              <input type="password" id="psw" name="password1" required="" />
            </div>
            <div className="form-group">
              <label htmlFor="pass"> Confirm Password </label>
              <input
                type="password"
                id="psw1"
                name="password2"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required=""
              />
            </div>
          </div>
          <div></div>

          <button type="submit" className="btn btn-primary btn-sm">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Changepass;
