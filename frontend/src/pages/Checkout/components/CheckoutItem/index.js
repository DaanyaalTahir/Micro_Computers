import React from "react";
import { numberWithCommas } from "../../../../global/generalFunctions";
import "./CheckoutItem.scss";

function CheckoutItem({ key, item }) {
  return (
    <>
      {item && (
        <>
          <div className="checkout-item-container">
            <div className="center-container-row">
              <div className="checkout-item-image">
                <img src={item.item_id.picture} />
              </div>
              <div className="checkout-item-title">
                <h3>{item.item_id.item_name}</h3>
                <h3 className="text_light_grey">Quantity: {item.quantity}</h3>
              </div>
            </div>
            <div className="checkout-item-price">
              <p>${numberWithCommas(item.item_id.price)}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CheckoutItem;
