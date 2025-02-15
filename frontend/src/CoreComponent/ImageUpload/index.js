import React, { useState, useRef } from "react";
import SVG from "react-inlinesvg";
import { linkIcon, deleteIcon, downloadIcon } from "../../icons"; // Ensure downloadIcon is imported
import "./style.scss";
import defaultFileImage from "../../icons/fileIcon.svg";
import { backendUrlImages } from "../../common/constant";

const ImageUpload = ({
  errorMsg,
  required = false,
  label = "Upload File",
  allowedExtensions = [],
  inputValue,
  setInputValue,
}) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileURL, setFileURL] = useState(null); // URL للمعاينة
  const [imageError, setImageError] = useState(false); // Track image loading error

  const handleImageError = () => {
    setImageError(true);
  };

  // Handle initial file display
  React.useEffect(() => {
    if (typeof inputValue === "string") {
      setFileName(inputValue.split("/").pop());
      setFileURL(`${backendUrlImages}${inputValue}`);
    } else if (inputValue instanceof File) {
      setFileName(inputValue.name);
      setFileURL(URL.createObjectURL(inputValue));
    }
  }, [inputValue]);

  const handleDelete = () => {
    setInputValue(null);
    setFileName("");
    setFileURL(null);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        setFileName(file.name);
        setInputValue(file); // حفظ الملف الجديد
        setFileURL(URL.createObjectURL(file)); // إنشاء URL للمعاينة
      } else {
        alert(
          `Invalid file type. Allowed extensions are: ${allowedExtensions.join(
            ", "
          )}`
        );
        setInputValue(null);
        setFileName("");
        setFileURL(null);
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDownload = () => {
    if (fileURL) {
      // If the inputValue is a string (URL), open it in a new tab
      if (typeof inputValue === "string") {
        window.open(fileURL, "_blank"); // Open the URL in a new tab
      } else {
        // For file objects, trigger the download
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = fileName || "file"; // Set the download filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div className="image-upload-container">
      {label && (
        <div className="label-container">
          <span>{label}</span>
          {required && <span className="star">*</span>}
        </div>
      )}
      <div className={`img-upload-container ${errorMsg ? "error-msg" : ""}`}>
        <input
          ref={fileInputRef}
          type="file"
          className="upload-file"
          accept={allowedExtensions.map((ext) => `.${ext}`).join(",")}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <div className="upload-img-container" onClick={handleClick}>
          <div className="placholder">
            {fileName ? (
              <span className="file-name">{fileName}</span>
            ) : (
              "Upload"
            )}
          </div>
          <SVG
            className="link-icon"
            src={linkIcon}
            height={30}
            width={30}
            aria-label="Upload File"
          />
        </div>
        {errorMsg && <span className="error-msg-container">{errorMsg}</span>}
        {(fileName || fileURL) && (
          <div className="img-container">
            <img
              className="img"
              src={imageError ? defaultFileImage : fileURL}
              alt={fileName}
              onError={handleImageError}
            />
            <div className="actions-container">
              <SVG
                className="delete-icon"
                src={deleteIcon}
                onClick={handleDelete}
                height={20}
                width={20}
                aria-label="Delete File"
              />
              <SVG
                className="download-icon"
                src={downloadIcon}
                onClick={handleDownload}
                height={20}
                width={20}
                aria-label="Download File"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
