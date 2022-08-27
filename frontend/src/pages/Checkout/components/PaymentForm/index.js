import React from "react";
import "./PaymentForm.scss";
function PaymentForm({
  payment,
  updatePaymentInput,
  setCurrentForm,
  handleSubmit,
}) {
  const canProceed = () => {
    return !(
      payment.cardNumber != "" &&
      payment.nameOnCard != "" &&
      payment.expiryDate != "" &&
      payment.ccv != ""
    );
  };
  return (
    <div className="payment-form-container">
      <form className="checkout-form">
        <h5 className="checkout-label">Payment</h5>
        <p className="text_light_grey_800">
          All transactions are secure and encrypted.
        </p>
        <input
          className="white-input checkout-input"
          type="text"
          placeholder="Card number"
          required
          onChange={(e) => updatePaymentInput("cardNumber", e.target.value)}
        />

        <input
          className="white-input checkout-input"
          type="text"
          placeholder="Name on card"
          required
          onChange={(e) => updatePaymentInput("nameOnCard", e.target.value)}
        />
        <div className="center-container-row">
          <input
            className="white-input checkout-input margin-right"
            type="text"
            placeholder="Expiration Date (MM / YY)"
            required
            onChange={(e) => updatePaymentInput("expiryDate", e.target.value)}
          />
          <input
            className="white-input checkout-input"
            type="text"
            placeholder="Security code"
            required
            onChange={(e) => updatePaymentInput("ccv", e.target.value)}
          />
        </div>
      </form>
      <div style={{ marginTop: "20px" }} className="space-b-container-row">
        <p
          onClick={() => setCurrentForm("shipping-method")}
          className="text-link"
        >
          Go back
        </p>
        <div>
          <button
            onClick={() => handleSubmit()}
            disabled={canProceed()}
            className="button secondary_bg_color text_white "
          >
            Order now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
