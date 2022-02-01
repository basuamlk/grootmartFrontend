import { SET_ORDER, CHECKOUT_ERROR } from '../Types';

const checkoutReducer = (state, action) => {
  switch (action.type) {
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case CHECKOUT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
