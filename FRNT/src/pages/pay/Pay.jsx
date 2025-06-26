// src/pages/pay/Pay.jsx

import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest"; // Axios instance
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

// Stripe publishable key – dashboard'dan alınıb
const stripePromise = loadStripe("pk_test_51RaF0jCXqofpnsjryC3REwcxTrOgfmtKIPJV3ClMApQrD5vTLd36DTRWkTmDWbh4gRXpMAFukUselTSzZr9Jj15r00ZAYapOM2");

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams(); // Gig ID

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Payment intent error:", err);
      }
    };

    makeRequest();
  }, [id]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      <div className="container">
        <h2>Complete Your Payment</h2>
        {clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        ) : (
          <p>Loading payment form...</p>
        )}
      </div>
    </div>
  );
};

export default Pay;
