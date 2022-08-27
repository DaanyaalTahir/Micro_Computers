import {
  LOAD_CART,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  DECREASE_ITEM_QUANTITY,
  CLOSE_CART,
  OPEN_CART,
} from "../actions/types";

const initialState = {
  numItems: 0,
  cartItems: [],
  cartOpened: false,
  totalPrice: 0.0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        numItems: action.payload.numItems,
        cartItems: action.payload.cartItems,
        totalPrice: action.payload.totalPrice,
      };
    case ADD_CART_ITEM:
      const { payload } = action;
      const item = state.cartItems.find((item) => item.id === payload.id);

      if (item) {
        return {
          ...state,
          numItems: state.numItems + 1,
          cartItems: state.cartItems.map((item) =>
            item.id === payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
          totalPrice: state.totalPrice + parseFloat(payload.item_price),
        };
      }
      return {
        ...state,
        numItems: state.numItems + payload.quantity,
        cartItems: [...state.cartItems, payload],
        totalPrice: state.totalPrice + parseFloat(payload.item_price),
      };
    case DECREASE_ITEM_QUANTITY:
      return {
        ...state,
        numItems: state.numItems - 1,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        ),
        totalPrice: state.totalPrice - parseFloat(action.payload.item_price),
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        numItems: state.numItems - action.payload.quantity,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
        totalPrice:
          state.totalPrice -
          parseFloat(action.payload.item_price * action.payload.quantity),
      };
    case CLEAR_CART:
      return {
        ...initialState,
      };
    case OPEN_CART:
      return {
        ...state,
        cartOpened: true,
      };
    case CLOSE_CART:
      return {
        ...state,
        cartOpened: false,
      };
    default:
      return state;
  }
}
