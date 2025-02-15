import React, { useState } from "react";
import SVG from "react-inlinesvg";
import "./style.scss";

const Input = ({
  errorMsg,
  required = true,
  icon,
  label,
  placeholder,
  inputValue,
  setInputValue,
  type
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  return (
    <div className={`input-container`}>
      {label && (
        <div className="lable-container">
          <span> {label}</span>
          {required && <span className="star">*</span>}
        </div>
      )}
      <div className="text-field-container">
        <input
          className={`text-field ${errorMsg ? "error-msg" : ""}`}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          type={type}
        />
        {icon && (
          <SVG
            fill={!inputValue ? "gray" : ""}
            className="input-icon"
            src={icon}
          ></SVG>
        )}
      </div>
      {errorMsg && <span className="error-msg-container">{errorMsg}</span>}{" "}
    </div>
  );
};

export default Input;
