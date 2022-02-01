import React, { useReducer } from 'react';
import ProductContext from './productContext';
import ProductReducer from './productReducer';
import { commerce } from '../../lib/commerce';
import {
  FETCH_PRODUCTS,
  FETCH_CART,
  ADD_PRODUCT,
  UPDATE_CART,
  REMOVE_ITEM,
  EMPTY_CART,
  REFRESH_CART,
} from '../Types';

const ProductState = (props) => {
  const initialState = {
    products: [],
    cart: {},
  };

  // const [products, setProducts] = useState([])

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  // Fetch All Products
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    dispatch({
      type: FETCH_PRODUCTS,
      payload: data,
    });
  };

  // Fetch All Items in Cart
  const fetchCart = async () => {
    const cartData = await commerce.cart.retrieve();

    dispatch({
      type: FETCH_CART,
      payload: cartData,
    });
  };

  // Add Products to Cart
  const addToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    dispatch({
      type: ADD_PRODUCT,
      payload: item.cart,
    });
  };

  // Update Cart Quantity
  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    dispatch({
      type: UPDATE_CART,
      payload: response.cart,
    });
  };

  // Remove Items From Cart
  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    dispatch({
      type: REMOVE_ITEM,
      payload: response.cart,
    });
  };

  // Empty the Cart
  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    dispatch({
      type: EMPTY_CART,
      payload: response.cart,
    });
  };

  // Refresh the Cart
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    dispatch({
      type: REFRESH_CART,
      payload: newCart,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        fetchProducts,
        fetchCart,
        addToCart,
        handleUpdateCartQty,
        handleRemoveFromCart,
        handleEmptyCart,
        refreshCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
