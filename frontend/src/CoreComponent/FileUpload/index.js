import React, { useState, useRef } from "react";
import SVG from "react-inlinesvg";
import { linkIcon, deleteIcon } from "../../icons";
import "./style.scss";

const FileUpload = ({
  label = "Upload File",
  allowedExtensions = [], // Allowed file extensions, e.g., ['jpg', 'png']
  required = true,
  inputValue, // Current base64 value
  setInputValue, // Function to set base64 value
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (
        allowedExtensions.length === 0 ||
        allowedExtensions.includes(fileExtension)
      ) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          setInputValue(base64String); // Save the base64 string in the parent state
        };
        reader.readAsDataURL(file);
      } else {
        alert(
          `Invalid file type. Allowed extensions: ${allowedExtensions.join(
            ", "
          )}`
        );
        resetFileInput();
      }
    }
  };

  const resetFileInput = () => {
    setInputValue(null); // Reset the base64 string in the parent state
    fileInputRef.current.value = null; // Reset file input element
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const imageUrl = inputValue ? `data:image/*;base64,${inputValue}` : null;

  return (
    <div className="file-upload-container">
      <label className="file-upload-label">
        {label} {required && <span className="required-star">*</span>}
      </label>
      <input
        ref={fileInputRef}
        type="file"
        className="file-upload-input"
        accept={
          allowedExtensions.length
            ? allowedExtensions.map((ext) => `.${ext}`).join(",")
            : "*"
        }
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div className="file-upload-area" onClick={handleClick}>
        {inputValue ? (
          <span className="file-name">File selected</span>
        ) : (
          <span className="file-placeholder">Choose a file</span>
        )}
      </div>
      {imageUrl && inputValue && (
        <div className="image-preview-container">
          <img src={imageUrl} alt="Preview" className="image-preview" />
          <SVG
            className="delete-icon"
            src={deleteIcon}
            onClick={resetFileInput}
            height={20}
            width={20}
            aria-label="Delete File"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
