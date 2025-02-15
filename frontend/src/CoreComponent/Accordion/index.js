import React, { useState } from "react";
import "./style.scss";

const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  return (
    <div className={`accordion ${open ? "open" : "close"}`}>
      <div className="accordion-title" onClick={toggleAccordion}>
        <span>{title}</span>
        <span className="sign">{open ? "-" : "+"}</span>
      </div>
      <div className="accordion-content">{children}</div>
    </div>
  );
};

export default Accordion;
