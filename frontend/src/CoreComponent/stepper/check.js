import * as React from "react";

const Check = ({ width = 32, height = 32, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <circle cx={16} cy={16} r={16} fill="#090" transform="rotate(-90 16 16)" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M22.59 11.39c.547.521.547 1.365 0 1.886l-7.7 7.334a1.45 1.45 0 0 1-1.98 0l-3.5-3.334a1.289 1.289 0 0 1 0-1.886 1.45 1.45 0 0 1 1.98 0l2.51 2.391 6.71-6.39a1.45 1.45 0 0 1 1.98 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default Check;
