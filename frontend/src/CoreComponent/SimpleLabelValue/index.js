import React from "react";
import "./style.scss";

const SimpleLabelValue = ({ label, value }) => {
  return (
    <div className="simple-label-value-container">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
};

export default SimpleLabelValue;
