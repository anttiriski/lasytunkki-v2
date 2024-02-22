import React, { SVGProps } from "react";
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const TelegramIcon = ({ ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    width="16"
    height="19"
    viewBox="0 0 16 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.954 3.52125L13.5397 14.907C13.3575 15.7105 12.8825 15.9105 12.2075 15.532L8.52897 12.8213L6.75397 14.5284C6.55754 14.7248 6.39325 14.8891 6.01468 14.8891L6.27897 11.1427L13.0968 4.98197C13.3933 4.71768 13.0325 4.57125 12.6361 4.83554L4.20754 10.1427L0.578965 9.00697C-0.210321 8.76054 -0.224607 8.21768 0.74325 7.83911L14.9361 2.37125C15.5933 2.12483 16.1683 2.51768 15.954 3.52125Z"
      fill="currentColor"
    />
  </svg>
);

export default TelegramIcon;
