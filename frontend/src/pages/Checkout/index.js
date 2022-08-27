import React from "react";
import CompanyLogo from "../../components/CompanyLogo";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "./Checkout.scss";
import Axios from "axios";
import CheckoutItem from "./components/CheckoutItem";
import ShippingForm from "./components/ShippingForm";
import ShippingMethod from "./components/ShippingMethod";
import { numberWithCommas } from "../../global/generalFunctions";
import PaymentForm from "./components/PaymentForm";
import OrderSummary from "./components/OrderSummary";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../state/actions/cartActions";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    unit: "",
    city: "",
    country: "",
    province: "",
    postalCode: "",
  });
  const [shipping, setShipping] = useState({
    method: "",
    cost: null,
  });
  const [payment, setPayment] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    ccv: "",
  });
  const { user_id, email } = useSelector((state) => state.user);
  const [currentForm, setCurrentForm] = useState("shipping-form");
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const updateShippingInput = (method, cost) => {
    setShipping({ method, cost });
  };
  const updateAddressInput = (inputField, value) => {
    setAddress({ ...address, [inputField]: value });
  };
  const updatePaymentInput = (inputField, value) => {
    setPayment({ ...payment, [inputField]: value });
  };

  const deleteCartItem = async (id) => {
    try {
      const response = await Axios.delete(
        `http://localhost:8000/api/cart/${id}/`
      );
    } catch (err) {
      console.error(err);
    }
  };
  const postOrderItems = async (order_id) => {
    for (const item of cartItems) {
      let body = {
        order_id,
        item_id: item.item_id.id,
        quantity: item.quantity,
        purchase_price: item.item_price,
      };
      try {
        const response = await Axios.post(
          "http://localhost:8000/api/ordered-item/",
          body
        );
        await deleteCartItem(item.id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async () => {
    let date_added = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss") + "Z";
    const orderBody = {
      user_id,
      payment_method: {
        user_id,
        card_number: payment.cardNumber,
        expiry_date: payment.expiryDate,
        ccv: payment.ccv,
        payment_type: "visa",
      },
      address: {
        user_id,
        full_name: address.fullName,
        street: address.street,
        unit_apt: address.unit,
        province_state: address.province,
        postal_code: address.postalCode,
        country: address.country,
      },
      purchased_date: date_added,
      item_subtotal: totalPrice,
      shipping_cost: shipping.cost,
      tax: (totalPrice * 0.13).toFixed(2),
      grand_total: (totalPrice * 1.13 + shipping.cost).toFixed(2),
    };
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/orders/?all_info=true",
        orderBody
      );
      await postOrderItems(response.data.id);
      dispatch(clearCart({}));
      navigate("/orderHistory");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="wrap-checkout-container">
      <div className="Checkout-container">
        <div className="checkout-form-container">
          <CompanyLogo size={"larger"} />
          <OrderSummary
            email={email}
            address={address}
            shipping={shipping}
            currentForm={currentForm}
          />
          {currentForm === "shipping-form" && (
            <ShippingForm
              address={address}
              updateAddressInput={updateAddressInput}
              setCurrentForm={setCurrentForm}
            />
          )}
          {currentForm === "shipping-method" && (
            <ShippingMethod
              shipping={shipping}
              updateShippingInput={updateShippingInput}
              setCurrentForm={setCurrentForm}
            />
          )}
          {currentForm === "payment-form" && (
            <PaymentForm
              payment={payment}
              updatePaymentInput={updatePaymentInput}
              setCurrentForm={setCurrentForm}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
        <div className="checkout-info-container">
          <div className="checkout-info">
            <div className="checkout-items">
              {cartItems.map((item, index) => {
                return <CheckoutItem key={index} item={item} />;
              })}
            </div>
            <hr className="line text_light_grey" />
            <div className="checkout-price-container">
              <div className="checkout-price">
                <label>Subtotal</label>
                <p>${numberWithCommas(totalPrice)}</p>
              </div>
              <div className="checkout-price">
                <label>Shipping</label>
                <p className="text_light_grey">
                  {shipping.cost ? "$" + shipping.cost : "To be calculated"}
                </p>
              </div>
              <div className="checkout-price">
                <label>Taxes</label>
                <p className="text_light_grey">
                  ${numberWithCommas(totalPrice * 0.13)}
                </p>
              </div>
            </div>
            <hr className="line text_light_grey" />
            <div className="total-price">
              <div className="checkout-price">
                <label>Total</label>
                <div className="center-container-row">
                  <p className="text_light_grey">CAD</p>
                  <h4>
                    ${numberWithCommas(totalPrice * 1.13 + shipping.cost)}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
