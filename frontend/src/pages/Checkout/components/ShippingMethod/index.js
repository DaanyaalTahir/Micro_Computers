import React from "react";
import { CircleFill, Circle } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

import "./ShippingMethod.scss";

function ShippingMethod({ setCurrentForm, shipping, updateShippingInput }) {
  const canProceed = () => {
    return !(shipping.method != "" && shipping.cost != null);
  };

  return (
    <div className="shipping-method">
      <div>
        <h5 className="checkout-label">Shipping method</h5>
      </div>
      <div className="shipping-options-container">
        <div
          className="shipping-option"
          onClick={(e) =>
            updateShippingInput(
              "International Economy (2-4 Business Days)",
              49.99
            )
          }
        >
          {shipping.cost == 49.99 ? (
            <CircleFill className="filled-circle" />
          ) : (
            <Circle />
          )}
          International Economy (2-4 Business Days)
        </div>
        <div
          className="shipping-option "
          onClick={(e) =>
            updateShippingInput(
              "International Priority (1-2 Business Days)",
              99.99
            )
          }
        >
          {shipping.cost == 99.99 ? (
            <CircleFill className="filled-circle" />
          ) : (
            <Circle />
          )}
          International Priority (1-2 Business Days)
        </div>
      </div>
      <div style={{ marginTop: "20px" }} className="space-b-container-row">
        <p
          onClick={() => setCurrentForm("shipping-form")}
          className="text-link"
        >
          Go back
        </p>
        <div>
          <button
            onClick={() => setCurrentForm("payment-form")}
            disabled={canProceed()}
            className="button secondary_bg_color text_white "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShippingMethod;
