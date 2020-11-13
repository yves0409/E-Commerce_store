import React from "react";
import { Alert } from "react-bootstrap";

const Notification = ({ variant, children }) => {
  return (
    //variant is the type of message displayed
    <Alert variant={variant}>
      {/* //children here is the actual message */}
      {children}
    </Alert>
  );
};

Notification.defaultProps = {
  variant: "info",
};

export default Notification;
