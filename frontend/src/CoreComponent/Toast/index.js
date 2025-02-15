import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ErrorIcon, CloseIcon, WarningIcon, SuccessIcon } from "../../icons";
import "./style.scss";

const ToastComponent = ({ options, closeToast }) => {
  const [ready, setReady] = useState(false);

  const getIcon = (mode) => {
    switch (mode) {
      case "error":
        return ErrorIcon;
      case "warning":
        return WarningIcon;
      case "success":
        return SuccessIcon;
      default:
        return SuccessIcon;
    }
  };

  const Icon = getIcon(options?.mode);

  const formatFirstLetterToUpperCase = (str) => {
    if (!str) return "";
    const words = str.toLowerCase().split("_");
    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return formattedWords.join(" ");
  };

  const defaultMessages = {
    success: "The data has been updated successfully!",
    error:
      "The update has failed. Please contact your system administrator for assistance!",
  };

  useEffect(() => {
    setReady(false);
    const openTimer = setTimeout(() => setReady(true), 0);
    const closeTimer = setTimeout(() => setReady(false), 2500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, [options]);

  return ready
    ? ReactDOM.createPortal(
        <div
          className={`toast-container ${options?.overlay ? "overlay" : ""}`}
          data-id="TOAST_MESSAGE"
        >
          <div className="header">
            <Icon width="1.5rem" height="1.5rem" />
            <span className={`title ${options?.mode}`}>
              {formatFirstLetterToUpperCase(options?.mode || "")}
            </span>
            <CloseIcon className="close" onClick={closeToast} />
          </div>

          <div className="message">
            {options.message || defaultMessages[options?.mode || "error"]}
          </div>

          {(!options?.manualClose || options?.withSuccessToast) && (
            <span className="track">
              <span className={`progress ${options?.mode}`}></span>
            </span>
          )}
        </div>,
        document.body
      )
    : null;
};

function Toast(options) {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const closeToast = () => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
      resolve();
    };

    ReactDOM.render(
      <ToastComponent options={options} closeToast={closeToast} />,
      div
    );
  });
}

export default Toast;
