import React, { useContext } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ProductContext from '../../context/product/productContext';

import CartItem from './CartItem';

import useStyles from './cartStyles';

const Cart = () => {
  const productContext = useContext(ProductContext);
  const { cart, handleEmptyCart } = productContext;
  const classes = useStyles();

  //   const handleEmptyCart = () => handleEmptyCart();

  const renderEmptyCart = () => (
    <Typography variant='subtitle1'>
      You have no items in your shopping cart,
      <Link className={classes.link} to='/dashboard'>
        start adding some
      </Link>
      !
    </Typography>
  );

  if (!cart.line_items) return <CircularProgress />;

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem item={lineItem} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant='h4'>
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size='large'
            type='button'
            variant='contained'
            color='secondary'
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to='/checkout'
            size='large'
            type='button'
            variant='contained'
            color='primary'
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant='h3' gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
