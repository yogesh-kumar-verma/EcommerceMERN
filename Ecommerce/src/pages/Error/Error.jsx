import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1>Oops! Something went wrong.</h1>
          <p>We're sorry, but an error has occurred.</p>
          <p>Please try again later or contact support for assistance.</p>
          <Link className="btn btn-primary" to="/">
            Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
