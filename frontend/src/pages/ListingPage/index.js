import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Truck } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import SectionHeading from "./components/SectionHeading";
import Quantity from "./components/Quantity";
import { numberWithCommas } from "../../global/generalFunctions";

import "./ListingPage.scss";
import { addCartItem, openCart } from "../../state/actions/cartActions";

function ListingPage() {
  let params = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { user_id } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    Axios.get(`http://localhost:8000/api/items/${params.id}/`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log({ ...err });
      });
  }, [params.id]);

  const addToCart = () => {
    let date_added = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss") + "Z";
    const body = {
      item_id: product.id,
      user_id,
      date_added,
      quantity: quantity,
      item_price: parseFloat(product.price).toFixed(2),
    };
    let itemInCart = false;
    cartItems.forEach((item) => {
      if (item.item_id === product.id) {
        itemInCart = true;
      }
    });
    if (!itemInCart) {
      Axios.post("http://localhost:8000/api/cart/", body)
        .then((response) => {
          let { id, item_id, user_id, quantity, date_added, item_price } =
            response.data;

          dispatch(
            addCartItem({
              id,
              item_id: product,
              user_id,
              date_added,
              quantity,
              item_price,
            })
          );
        })
        .catch((err) => {
          console.log(err.response.data);
          console.log({ ...err });
        });
    } else {
      dispatch(
        addCartItem({
          id: 1,
          item_id: product,
          user_id,
          quantity: 1,
          date_added,
          item_price: product.price,
        })
      );
    }
    dispatch(openCart({}));
  };

  return (
    <div className="ListingPage_Cont elements_medium_container">
      <div className="left_section">
        <div className="img_cont background_grey">
          <img src={product.picture} />
        </div>
        <div className="desc_cont">
          <h1 className="text_light_grey_800">Description</h1>
          <div className="description">{product.description}</div>
        </div>
      </div>
      <div className="right_section">
        <div className="product_header">
          <div className="product_name">{product.item_name}</div>
          <div className="product_price">
            ${numberWithCommas(product.price)}
          </div>
        </div>
        <div className="product_label text_light_grey">{product.label}</div>
        {product.free_shipping && (
          <div className="shipping">
            <Truck /> <span className="text_blue">Free Shipping</span>
          </div>
        )}
        <div>
          <SectionHeading heading={"Details"} />
          <div className="details_section">
            <div>
              <span>Id: </span>
              {product.id}
            </div>
            <div>
              <span>Brand: </span>
              {product.brand}
            </div>
            <div>
              <span>Type: </span>
              {product.type}
            </div>
            <div>
              <span>Stock: </span>
              {product.stock}
            </div>
          </div>
        </div>
        <div>
          <SectionHeading heading={"Buy"} />
          <Quantity setQuantity={setQuantity} />
        </div>

        <div className="purchase">
          <button
            className="button secondary_bg_color text_white submit-btn"
            type="submit"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListingPage;
