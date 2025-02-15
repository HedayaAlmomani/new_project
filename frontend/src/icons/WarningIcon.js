import * as React from "react";

const WarningIcon = ({ width = 18, height = 18, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M16.5 9a7.5 7.5 0 1 1-15.001-.001A7.5 7.5 0 0 1 16.5 9ZM2.625 9a6.375 6.375 0 1 0 12.75 0 6.375 6.375 0 0 0-12.75 0Zm6.379 3.41a.563.563 0 0 1-.558-.487l-.005-.076V8.533a.563.563 0 0 1 1.12-.077l.005.077v3.314c0 .31-.252.562-.562.562Zm-.57-6.257c0 .31.252.563.562.563l.084-.006a.563.563 0 0 0-.076-1.12l-.084.006a.563.563 0 0 0-.486.557Z"
      clipRule="evenodd"
    />
  </svg>
);
export default WarningIcon;
