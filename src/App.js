import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import  './App.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),

    });
    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    /* prod_JQsR5AUYFecidx
    const {data: clientSecret } = await fetch('/v1/products', {
      method: 'POST',
      body: JSON.stringify({amount: 1000})
    })
    console.log(clientSecret)*/
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};
// pk_test_51Io0HUH5ukmsMjcusiaElA6fvE0tx7JKwFBxkjlspxuiUA85TLoVqffyMJmzpdYIoYYljKeivH2czJ3zSZuyogmz00FIvdOED5 це мій ключ
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

export const App = () => (
  <div className='App'>
    <Elements stripe={stripePromise}>
      <CheckoutForm/>
    </Elements>
  </div>
);

