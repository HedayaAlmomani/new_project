import * as React from "react";

const SuccessIcon = ({ width = 67, height = 67, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 67 67"
    {...props}
  >
    <path
      stroke="#3AAA35"
      strokeWidth={1.5}
      d="M33.5 66C51.45 66 66 51.45 66 33.5S51.45 1 33.5 1 1 15.55 1 33.5 15.55 66 33.5 66Z"
    />
    <path
      stroke="#3AAA35"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m41.83 27.831-13 13-4.394-4.394"
    />
  </svg>
);
export default SuccessIcon;
