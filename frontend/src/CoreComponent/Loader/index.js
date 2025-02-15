import React from "react";
import "./style.scss";

const Loader = ({ show }) => {
  if (show)
    return (
      <div className="loader">
        <div className="loader__cycle"></div>
      </div>
    );
};

export default Loader;