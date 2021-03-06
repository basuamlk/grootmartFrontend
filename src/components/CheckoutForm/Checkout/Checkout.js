import React, { useEffect, useContext, useState } from 'react';
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core';
import { commerce } from '../../../lib/commerce';
import { Link, useHistory } from 'react-router-dom';
import CheckoutContext from '../../../context/checkout/checkoutContext';
import ProductContext from '../../../context/product/productContext';

import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import useStyles from './checkoutStyles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
  const checkoutContext = useContext(CheckoutContext);
  const productContext = useContext(ProductContext);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const { order, error } = checkoutContext;
  const { cart } = productContext;
  const classes = useStyles();
  const history = useHistory();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: 'cart',
          });

          setCheckoutToken(token);
        } catch {
          if (activeStep !== steps.length) {
            // console.log(activeStep);
            history.push('/dashboard');
          }
        }
      };

      generateToken();
    }
    //eslint-disable-next-line
  }, [cart]);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant='h5'>
            Thank you for your purchase, {order.customer.firstname}{' '}
            {order.customer.lastname}!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant='subtitle2'>
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button
          component={Link}
          variant='outlined'
          type='button'
          to='/dashboard'
        >
          Back to dashboard
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant='h5'>Error: {error}</Typography>
        <br />
        <Button
          component={Link}
          variant='outlined'
          type='button'
          to='/dashboard'
        >
          Back to dashboard
        </Button>
      </>
    );
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        setShippingData={setShippingData}
        test={test}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
