import React, { useState } from "react";
import SVG from "react-inlinesvg";
import "./style.scss";

const Checkbox = ({
  errorMsg,
  required = true,
  label,
  checkboxValue,
  setCheckboxValue,
  icon,
}) => {
  const handleCheckboxChange = (e) => {
    const newValue = e.target.checked;
    setCheckboxValue(newValue);
  };

  return (
    <div className={`checkbox-container`}>
      <div className="checkbox-label-container">
        <label>
          {label && (
            <span className="checkbox-label">
              {label}
              {required && <span className="star">*</span>}
            </span>
          )}
          <input
            type="checkbox"
            checked={checkboxValue}
            onChange={handleCheckboxChange}
          />
          {icon && <SVG className="checkbox-icon" src={icon} />}
        </label>
      </div>
      {errorMsg && <span className="error-msg-container">{errorMsg}</span>}
    </div>
  );
};

export default Checkbox;
