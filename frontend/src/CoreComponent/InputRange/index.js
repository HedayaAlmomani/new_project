import React, { useEffect } from "react";
import "./style.scss";

const InputRange = ({ value = "25", setValue }) => {
  useEffect(() => {
    const fillColor = "#5e503f";
    const emptyColor = "#DDDDDD";

    const rangeInputs = document.querySelectorAll(".input-range--custom");

    rangeInputs.forEach((input) => {
      input.addEventListener("input", function () {
        const percent =
          (100 * (this.value - this.min)) / (this.max - this.min) + "%";
        this.style.backgroundImage = `linear-gradient(to right, ${fillColor}, ${fillColor} ${percent}, ${emptyColor} ${percent})`;
      });
    });

    return () => {
      rangeInputs.forEach((input) => {
        input.removeEventListener("input", () => {});
      });
    };
  }, []);

  return (
    <div className="range">
      <div className="range-container">
        <input
          type="range"
          className="input-range--custom"
          min="0"
          max="50"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputRange;
