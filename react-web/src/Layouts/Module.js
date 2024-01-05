import React, { useState } from "react";
import { Link } from "react-router-dom";
export const Button = ({ to, name }) => {
  return (
    <Link to={to}>
      <button>{name}</button>
    </Link>
  );
};

export const TimeFormat = (time) => {
  const [hour, mins] = time
    .toLocaleTimeString("th-TH", { hour12: false })
    .split(":");
  return `${hour}:${mins}`;
};
