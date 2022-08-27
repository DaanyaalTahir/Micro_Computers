import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function ShippingForm({
  address,
  updateAddressInput,
  currentForm,
  setCurrentForm,
}) {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const handleNextClick = () => {
    if (currentForm === "shipping-form") {
      setCurrentForm("shipping-method");
    }
  };
  const canProceed = () => {
    return !(
      address.fullName != "" &&
      address.address != "" &&
      address.unit != "" &&
      address.city != "" &&
      address.country != "" &&
      address.province != "" &&
      address.postalCode != ""
    );
  };
  return (
    <form className="checkout-form">
      <h5 className="checkout-label">Shipping Address</h5>

      <input
        className="white-input checkout-input"
        type="text"
        placeholder="Full name"
        required
        onChange={(e) => updateAddressInput("fullName", e.target.value)}
      />

      <input
        className="white-input checkout-input"
        type="text"
        placeholder="Street"
        required
        onChange={(e) => updateAddressInput("street", e.target.value)}
      />
      <input
        className="white-input checkout-input"
        type="text"
        placeholder="Apartment, unit, etc."
        required
        onChange={(e) => updateAddressInput("unit", e.target.value)}
      />
      <input
        className="white-input checkout-input"
        type="text"
        placeholder="City"
        required
        onChange={(e) => updateAddressInput("city", e.target.value)}
      />
      <input
        className="white-input checkout-input margin-right"
        type="text"
        placeholder="Country"
        required
        onChange={(e) => updateAddressInput("country", e.target.value)}
      />
      <div className="center-container-row">
        <input
          className="white-input checkout-input margin-right"
          type="text"
          placeholder="Province"
          required
          onChange={(e) => updateAddressInput("province", e.target.value)}
        />
        <input
          className="white-input checkout-input"
          type="text"
          placeholder="Postal Code"
          required
          onChange={(e) => updateAddressInput("postalCode", e.target.value)}
        />
      </div>
      <div style={{ marginTop: "20px" }} className="space-b-container-row">
        <p onClick={() => navigate("/")} className="text-link">
          Go back
        </p>
        <div>
          <button
            onClick={() => setCurrentForm("shipping-method")}
            disabled={canProceed()}
            className="button secondary_bg_color text_white "
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}

export default ShippingForm;
