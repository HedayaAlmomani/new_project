import React, { useState } from "react";
import SVG from "react-inlinesvg";
import "./style.scss";

const TextArea = ({
  errorMsg,
  required = true,
  icon,
  label,
  placeholder,
  value,
  setValue,
  rows = 4,
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <div className={`textarea-container`}>
      {label && (
        <div className="label-container">
          <span> {label}</span>
          {required && <span className="star">*</span>}
        </div>
      )}
      <div className="textarea-field-container">
        <textarea
          className={`textarea-field ${errorMsg ? "error-msg" : ""}`}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
        />
        {icon && (
          <SVG
            fill={!value ? "gray" : ""}
            className="textarea-icon"
            src={icon}
          ></SVG>
        )}
      </div>
      {errorMsg && <span className="error-msg-container">{errorMsg}</span>}
    </div>
  );
};

export default TextArea;
