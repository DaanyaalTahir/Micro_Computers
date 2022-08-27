import React from "react";
import { Truck } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../../../global/generalFunctions";

import "./ListingCard.scss";

function ListingCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="ListingCard_Cont"
      onClick={() => {
        navigate(`/product/${product.id}`);
      }}
    >
      <div className="body_content">
        <div className="image_cont background_grey">
          <img src={product.picture} />
        </div>
        <div className="product_name text_light_grey_800">
          {product.item_name}
        </div>
        <div className="product_label text_light_grey">{product.label}</div>
      </div>

      <div className="footer_content ">
        {product.free_shipping && (
          <div className="shipping">
            <Truck /> Free Shipping
          </div>
        )}
        <div className="price">${numberWithCommas(product.price)}</div>
      </div>
    </div>
  );
}

export default ListingCard;
