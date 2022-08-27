import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cart } from "react-bootstrap-icons";
import { numberWithCommas } from "../../../../global/generalFunctions";
import {
  loadCart,
  openCart,
  closeCart,
} from "../../../../state/actions/cartActions";
import Axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";

import "./NavCart.scss";
import CartItem from "./components/CartItem";

function NavCart() {
  const [showCart, setShowCart] = useState(false);
  const [items, setItems] = useState();
  const { user_id } = useSelector((state) => state.user);
  const { numItems, cartItems, cartOpened, totalPrice } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOffcanvasClose = () => {
    dispatch(closeCart({}));
  };

  const getNumCartItems = (cartItems) => {
    let numItems = 0;
    let totalPrice = 0.0;
    cartItems.forEach((item) => {
      numItems += item.quantity;
      totalPrice += item.item_price * item.quantity;
    });
    return { numItems, totalPrice };
  };

  useEffect(() => {
    if (user_id) {
      Axios.get(`http://localhost:8000/api/cart/?user_id=${user_id}`)
        .then((response) => {
          let cartItems = response.data;
          let { numItems, totalPrice } = getNumCartItems(cartItems);
          dispatch(
            loadCart({
              numItems,
              cartItems,
              totalPrice,
            })
          );
          console.log("cart loaded");
        })
        .catch((err) => {
          console.log(err.response.data);
          console.log({ ...err });
        });
    }
  }, [user_id]);

  return (
    <div>
      <div
        onClick={() => {
          dispatch(openCart({}));
        }}
      >
        <Cart />
      </div>

      <Offcanvas
        show={cartOpened}
        onHide={handleOffcanvasClose}
        placement="end"
        className="cart_container"
      >
        <Offcanvas.Header closeButton>
          <h3 className="cart_header">Your Cart ({numItems})</h3>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="center-container-col">
            <div className="cart-body">
              {numItems === 0 ? (
                <div>
                  <h4 className="cart-secondary-text text_dark_grey">
                    Your cart is empty
                  </h4>

                  <button
                    onClick={() => dispatch(closeCart({}))}
                    className="button secondary_bg_color text_white "
                  >
                    Keep Browsing
                  </button>
                </div>
              ) : (
                <div className="cart-items">
                  {cartItems.map((item, index) => {
                    return <CartItem key={index} item={item} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </Offcanvas.Body>
        {numItems != 0 && (
          <div className="cart-footer background_grey">
            <div className="price-title">
              <h5 className="price-text text_dark_grey">Subtotal</h5>
              <h5>${numberWithCommas(parseFloat(totalPrice).toFixed(2))}</h5>
            </div>
            <div className="price-title">
              <h6 className="text_dark_grey">Taxes</h6>
              <h6>Calculated at checkout</h6>
            </div>
            <div className="price-title">
              <h6 className="text_dark_grey">Estimated shipping</h6>
              <h6>Calculated at checkout</h6>
            </div>
            <button
              style={{ marginTop: "15px" }}
              onClick={() => navigate("/checkout")}
              className="button secondary_bg_color text_white "
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </Offcanvas>
    </div>
  );
}

export default NavCart;
