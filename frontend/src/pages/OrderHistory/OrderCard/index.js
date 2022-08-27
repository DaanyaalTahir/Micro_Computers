import React, { useEffect, useState } from "react";
import Axios from "axios";

import "./OrderCard.scss";

function OrderCard({ order }) {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:8000/api/ordered-item/?order_id=${order.id}`)
      .then((response) => {
        setOrderItems(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log({ ...err });
      });
  }, []);

  return (
    <div className="OrderCard_Cont">
      <div className="summary_details  background_grey">
        <div className="quick_order_details">
          <div className="order_detail">
            <div className="detail_heading">Order Placed</div>
            <div className="detail_body">
              {new Date(order.purchased_date).toDateString()}
            </div>
          </div>
          <div className="order_detail">
            <div className="detail_heading">Total</div>
            <div className="detail_body">CDN ${order.grand_total}</div>
          </div>
          <div className="order_detail">
            <div className="detail_heading">Ship To</div>
            <div className="detail_body">{order.address.full_name}</div>
          </div>
        </div>
        <div className="order_id">ORDER #: {order.id}</div>
      </div>
      <div className="order_body">
        {orderItems.map((item) => {
          const item_details = item.item_id;
          return (
            <div className="item">
              <div className="item_details">
                <img src={item_details.picture} />
                <div className="item_info">
                  <div className="item_name">{item_details.item_name}</div>
                  <div className="item_quantity">Quantity: {item.quantity}</div>
                </div>
              </div>
              <div className="item_price">${item.purchase_price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderCard;
