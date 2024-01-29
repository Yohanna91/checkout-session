import React from "react";

const Button = ({ text, onClickHandler }) => {
  return (
    <button
      onClick={onClickHandler}
      className="bg-gray-900 text-white p-2 inline-block mt-2"
    >
      {text}
    </button>
  );
};

export default Button;
