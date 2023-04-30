import React from "react";

function Alert(props) {
  console.log(props, "propos");
  return (
    <div style={{ position: "fixed", top: "3rem", zIndex: "12" }}>
      <div
        className={props.color ? "alert alert-danger" : "alert alert-primary"}
        role="alert"
      >
        {props.message}
      </div>
    </div>
  );
}

export default Alert;
