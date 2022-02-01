import React, { useContext } from "react";
import CheckoutContext from "../../context/checkout/checkoutContext";
import ProductContext from "../../context/product/productContext";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import { commerce } from "../../lib/commerce";
import Review from "./Review";
// let stripeKey;
// if (process.env.NODE_ENV !== "production") {
//   stripeKey = process.env.REACT_APP_STRIPE_PRIVATE_KEY;
// } else {
//   stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
// }

const stripePromise = loadStripe(
  "pk_test_51JO0sMHHJ4wHPkUIyGozD6odMhaZeYXuOXos3a5cuSTGjIoj9hwy8BKqw4wOdvEwla8otJ7CpJpSncusQAYyeVTY00MtdnuORg"
);
console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData }) => {
  const checkoutContext = useContext(CheckoutContext);
  const productContext = useContext(ProductContext);
  const { setOrder, setErrorMessage } = checkoutContext;
  const { refreshCart } = productContext;
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    try {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      // onCaptureCheckout(checkoutToken.id, orderData);

      // Handle capture checkout
      const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
          const incomingOrder = await commerce.checkout.capture(
            checkoutTokenId,
            newOrder
          );

          setOrder(incomingOrder);

          refreshCart();
        } catch (error) {
          setErrorMessage(error);
        }
      };

      handleCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    } catch (err) {
      console.error(`${error}`);
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant='outlined' onClick={backStep}>
                  Back
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={!stripe}
                  color='primary'
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
