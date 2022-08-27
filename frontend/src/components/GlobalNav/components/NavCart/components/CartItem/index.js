import React, { useEffect, useState } from "react";
import { Trash3Fill, Plus, Dash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import {
  addCartItem,
  removeCartItem,
  decreaseItemQuantity,
  closeCart,
} from "../../../../../../state/actions/cartActions";
import { numberWithCommas } from "../../../../../../global/generalFunctions";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

import "./CartItem.scss";

function CartItem({ item }) {
  const [disableQuantity, setDisableQuantity] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { user_id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (item_id) {
  //     Axios.get(`http://localhost:8000/api/items/${item_id}/`)
  //       .then((response) => {
  //
  //         setItem(response.data);
  //       })
  //       .catch((err) => {
  //         console.log(err.response.data);
  //         console.log({ ...err });
  //       });
  //   }
  // }, [item_id]);

  const handleItemDelete = () => {
    Axios.delete(`http://localhost:8000/api/cart/${item.id}/`)
      .then((response) => {
        dispatch(
          removeCartItem({
            id: item.id,
            quantity: item.quantity,
            item_price: item.item_price,
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log({ ...err });
      });
  };

  const handleAddChange = () => {
    const body = {
      item_id: item.item_id.id,
      user_id,
      quantity: item.quantity + 1,
      date_added: item.date_added,
      item_price: item.item_price,
    };
    setDisableQuantity(true);
    Axios.put(`http://localhost:8000/api/cart/${item.id}/`, body)
      .then((response) => {
        dispatch(
          addCartItem({
            id: item.id,
            item_id: item.item_id,
            user_id,
            quantity: item.quantity + 1,
            date_added: item.date_added,
            item_price: item.item_price,
          })
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log({ ...err });
      })
      .finally(() => {
        setDisableQuantity(false);
      });
  };
  const handleRemoveChange = () => {
    if (item.quantity === 1) {
      return;
    }
    const body = {
      item_id: item.item_id.id,
      user_id,
      quantity: item.quantity - 1,
      date_added: item.date_added,
      item_price: item.item_price,
    };
    setDisableQuantity(true);
    Axios.put(`http://localhost:8000/api/cart/${item.id}/`, body)
      .then((response) => {
        dispatch(
          decreaseItemQuantity({ id: item.id, item_price: item.item_price })
        );
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log({ ...err });
      })
      .finally(() => {
        setDisableQuantity(false);
      });
  };

  const handleImageClick = () => {
    navigate(`/product/${item.item_id.id}`);
    dispatch(closeCart({}));
  };
  return (
    <>
      {item && (
        <>
          <hr className="line text_light_grey" />
          <div className="cart-item-container">
            <div className="cart-item-image">
              <img
                onClick={() => handleImageClick()}
                src={item.item_id.picture}
              />
            </div>
            <div className="cart-item-title">
              <h3>{item.item_id.item_name}</h3>
              <div className="counter">
                <Dash
                  className={item.quantity === 1 ? "disabled-counter" : ""}
                  onClick={() => handleRemoveChange()}
                />
                <p className="text_light_grey_800">{item.quantity}</p>

                <Plus onClick={() => handleAddChange()} />
              </div>
            </div>
            <div className="cart-item-remove">
              <Trash3Fill
                className="text_light_grey_800"
                onClick={() => handleItemDelete()}
              />
              <p className="text_light_grey">
                ${numberWithCommas(item.item_id.price)}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CartItem;
