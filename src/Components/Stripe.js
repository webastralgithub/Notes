import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./StripeCheckout.js";

const stripePromise = loadStripe("pk_test_51MpIOrLKxcJdHcEhbuf308M16EVEo2fpQyhwCy0Ya2y49Z5jchQUgLUafTRfbs5hOpIFvbcttJHYv2zfdhvrrD2x00g4vbIT6s"); // starts with pk_
console.log(stripePromise)
function App() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;