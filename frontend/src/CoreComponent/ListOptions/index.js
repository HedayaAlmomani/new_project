import React, { useState, useRef, useEffect } from "react";
import SVG from "react-inlinesvg";
import "./style.scss";

const ListOptions = ({ title, options }) => {
  const [open, setOpen] = useState(false);
  const listContainerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        listContainerRef.current &&
        !listContainerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="list-options-container">
      <div className="title" onClick={toggleOpen}>
        {title}
      </div>
      {open && (
        <div ref={listContainerRef} className="list-container">
          <div className="triangle"></div>
          <div className="list">
            {options?.map((item, index) => (
              <div
                key={index}
                className="option-container"
                onClick={item.onClick}
              >
                <SVG src={item.icon}></SVG>
                <div className="option">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListOptions;
