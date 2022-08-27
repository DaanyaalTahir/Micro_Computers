import React, { useState } from "react";

import "./Quantity.scss";

function Quantity({ setQuantity }) {
  const qtyNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="Quantity_Cont text-gray-700 ">
      <div className="label background_grey">QTY</div>
      <select onChange={(e) => setQuantity(e.target.value)}>
        {qtyNums.map((qty) => {
          return <option>{qty}</option>;
        })}
      </select>
    </div>
  );
}

export default Quantity;
