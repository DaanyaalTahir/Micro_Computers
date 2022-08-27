import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";

import OrderCard from "./OrderCard";

import "./OrderHistory.scss";

function OrderHistory() {
  const { user_id } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:8000/api/orders/?user_id=${user_id}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log({ ...err });
      });
  }, []);

  return (
    <div className="OrderHistory_Cont elements_small_container">
      <h1 className="text_light_grey_800">Order History</h1>
      {orders.map((order) => {
        return <OrderCard order={order} />;
      })}
    </div>
  );
}

export default OrderHistory;
