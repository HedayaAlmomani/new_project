import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "./style.scss";
const PhoneNumberInput = ({ phone, setPhone, label, required, errorMsg }) => {
  //   const [phone, setPhone] = useState("");

  return (
    <div className={`phone-input-container ${errorMsg ? "error" : ""}`}>
      {!!label && (
        <div className="label">
          {label}
          {required && <span className="star-required">*</span>}
        </div>
      )}
      <PhoneInput
        country={"jo"}
        value={phone}
        onChange={(phone) => setPhone(phone)}
      />
      {errorMsg && <span className="error-msg-container">{errorMsg}</span>}
    </div>
  );
};

export default PhoneNumberInput;
