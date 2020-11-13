import React from "react";
import { Spinner } from "react-bootstrap";

const Spinners = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "80px",
        height: "80px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Spinners;
