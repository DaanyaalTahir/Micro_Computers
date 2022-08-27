import React from "react";
import { ListGroup } from "react-bootstrap";
import "./OrderSummary.scss";
function index({ email, address, shipping, currentForm }) {
  return (
    <ListGroup>
      {email && (
        <ListGroup.Item>
          <p className="text_light_grey">Email</p>
          {email ? email : "testing@gmail.com"}
        </ListGroup.Item>
      )}
      {currentForm != "shipping-form" && (
        <ListGroup.Item>
          <p className="text_light_grey">Ship to</p>
          {address.unit +
            " " +
            address.street +
            ", " +
            address.city +
            ", " +
            address.country +
            ", " +
            address.province +
            " " +
            address.postalCode}
        </ListGroup.Item>
      )}
      {currentForm != "shipping-form" && currentForm != "shipping-method" && (
        <ListGroup.Item>
          <p className="text_light_grey">Method</p>
          {shipping.method + " - $" + shipping.cost}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}

export default index;
