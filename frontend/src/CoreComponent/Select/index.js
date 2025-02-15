import React, { useState, useRef, useEffect, useMemo } from "react";
import "./style.scss";
import SVG from "react-inlinesvg";
import { arrowBottom, arrowUp } from "../../icons";

const Select = ({
  options,
  value,
  setValue,
  errorMsg,
  required = true,
  label,
  placeholder = "Select",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [options, searchQuery]
  );
  const handleOptionClick = (option) => {
    setValue(option);
    setIsOpen(false);
    setSearchQuery(option.label);
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      setSearchQuery("");
    }
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);

      const isValueFromTheOptions = options?.find(
        (item) => item?.value === value?.value && item?.label === value?.label
      );
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!value) {
      setSearchQuery("");
      setIsOpen("");
    }
  }, [value]);
  return (
    <div className="dropdown-container2" ref={dropdownRef}>
      {label && (
        <div className="label-container">
          <span>{label}</span>
          {required && <span className="star">*</span>}
        </div>
      )}
      <div
        className={`dropdown-header ${errorMsg ? "error-msg" : ""}`}
        onClick={toggleDropdown}
      >
        {isOpen ? (
          <input
            className="search-feild"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        ) : (
          <input
            className="search-feild"
            type="text"
            placeholder="Search..."
            value={value ? value?.label : ""}
            readOnly={!isOpen}
          />
        )}
        <SVG className="arrow-icon" src={!isOpen ? arrowUp : arrowBottom}></SVG>
      </div>

      {isOpen && (
        <div className="dropdown-options">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className={`dropdown-option ${
                  value?.label === option?.label &&
                  value?.value === option?.value
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="dropdown-option">No options found</div>
          )}
        </div>
      )}
      {errorMsg && <span className="error-msg-container">{errorMsg}</span>}
    </div>
  );
};

export default Select;
