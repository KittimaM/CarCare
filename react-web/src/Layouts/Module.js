import React, { useState } from "react";
import { Link } from "react-router-dom";
export const Button = ({ to, name }) => {
  return (
    <Link to={to}>
      <button>{name}</button>
    </Link>
  );
};

export const TimeOptions = () => {
  const [options, setOptions] = useState([
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
  ]);

  const handleSubmitSelectedTime = (event) => {
    event.preventDefault();
    console.log("time : ", event.target.value);
  };
  return (
    <div>
      {options.map((item) => (
        <button onClick={handleSubmitSelectedTime} value={item}>
          {item}
        </button>
      ))}
    </div>
  );
};
