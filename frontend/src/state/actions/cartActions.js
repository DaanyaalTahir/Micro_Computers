import {
  LOAD_CART,
  ADD_CART_ITEM,
  DECREASE_ITEM_QUANTITY,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  CLOSE_CART,
  OPEN_CART,
} from "./types";

export const loadCart = (data) => {
  return {
    type: LOAD_CART,
    payload: {
      numItems: data.numItems,
      cartItems: data.cartItems,
      totalPrice: data.totalPrice,
    },
  };
};

export const addCartItem = (data) => {
  return {
    type: ADD_CART_ITEM,
    payload: {
      ...data,
    },
  };
};

export const decreaseItemQuantity = (data) => {
  return {
    type: DECREASE_ITEM_QUANTITY,
    payload: {
      id: data.id,
      item_price: data.item_price,
    },
  };
};

export const removeCartItem = (data) => {
  return {
    type: REMOVE_CART_ITEM,
    payload: {
      id: data.id,
      quantity: data.quantity,
      item_price: data.item_price,
    },
  };
};

export const clearCart = (data) => {
  return {
    type: CLEAR_CART,
    payload: {},
  };
};

export const openCart = (data) => {
  return {
    type: OPEN_CART,
    payload: {},
  };
};

export const closeCart = (data) => {
  return {
    type: CLOSE_CART,
    payload: {},
  };
};
