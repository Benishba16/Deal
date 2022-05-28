import React from "react";

function Add(width, height, color = "white") {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width={width}
    //   height={height}
    //   viewBox="0 0 32 32"
    //   style={{fill: `${color}`}}
    // >
    //   <path d="M17 6.667a1 1 0 00-2 0V15H6.667a1 1 0 000 2H15v8.333a1 1 0 002 0V17h8.333a1 1 0 000-2H17V6.667z"></path>
    // </svg>
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.16602 7H12.8327'
        stroke='white'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M7 12.8334V1.16675'
        stroke='white'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}

export default Add;
