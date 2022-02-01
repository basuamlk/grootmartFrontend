import React, { useReducer } from 'react';
import CheckoutContext from './checkoutContext';
import CheckoutReducer from './checkoutReducer';
import { SET_ORDER, CHECKOUT_ERROR } from '../Types';

const CheckoutState = (props) => {
  const initialState = {
    order: {},
    error: '',
  };

  const [state, dispatch] = useReducer(CheckoutReducer, initialState);

  // Set Checkout Order
  const setOrder = (incomingOrder) => {
    dispatch({
      type: SET_ORDER,
      payload: incomingOrder,
    });
  };
  // Set Checkout Error
  const setErrorMessage = (error) => {
    dispatch({
      type: CHECKOUT_ERROR,
      payload: error.data.error.message,
    });
  };

  return (
    <CheckoutContext.Provider
      value={{
        order: state.order,
        error: state.error,
        setOrder,
        setErrorMessage,
      }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutState;
