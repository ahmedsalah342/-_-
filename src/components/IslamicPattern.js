import React from 'react';

const IslamicPattern = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <defs>
        <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M10,0 L20,5 L20,15 L10,20 L0,15 L0,5 Z"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M10,4 L16,7 L16,13 L10,16 L4,13 L4,7 Z"
            fill="currentColor"
            opacity="0.3"
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#islamic-pattern)" />
    </svg>
  );
};

export default IslamicPattern;
