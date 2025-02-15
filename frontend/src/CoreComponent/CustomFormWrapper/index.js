import React from "react";
import "./style.scss";

const CustomFormWrapper = ({
  title,
  children,
  handleSubmit,
  setOpenForm,
  noActions = false,
  isSubmitDisabled = false
}) => {
  return (
    <div className="custom-form-wrapper">
      <div className="information-header">{title}</div>
      <div className="form-section">{children}</div>
      {!noActions && (
        <div className="actions-section-container">
          <button
            className="cancel-btn"
            onClick={() => {
              setOpenForm(false);
            }}
          >
            Cancel
          </button>
          <button
            className="submit-btn"
            type="submit"
            onClick={handleSubmit ? handleSubmit : null}
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomFormWrapper;
