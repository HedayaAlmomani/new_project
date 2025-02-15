import React, { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import "./style.scss";

const DateInput = ({
  errorMsg,
  required = true,
  icon,
  label,
  inputValue,
  setInputValue,
  type
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  return (
    <div className={`date-container`}>
      {label && (
        <div className="lable-container">
          <span>{label}</span>
          {required && <span className="star">*</span>}
        </div>
      )}
      <div className="text-field-container">
        <input
          className={`text-field ${errorMsg ? "error-msg" : ""} ${!inputValue ? "empty" : ""}`}
          value={inputValue}
          onChange={handleChange}
          type={type || "date"}
        />
        {icon && (
          <SVG
            fill={!inputValue ? "gray" : ""}
            className="input-icon"
            src={icon}
          />
        )}
      </div>
      {errorMsg && <span className="error-msg-container">{errorMsg}</span>}
    </div>
  );
};

export default DateInput;
