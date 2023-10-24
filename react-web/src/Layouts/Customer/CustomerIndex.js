import React from "react";
import { Link } from "react-router-dom";

const CustomerIndex = () => {
  const Button = ({ to, name }) => {
    return (
      <Link to={to}>
        <button>{name}</button>
      </Link>
    );
  };
  return (
    <div>
      <Button to="/customer/login" name="Login" />
      <Button to="/customer/register" name="Register" />
    </div>
  );
};
export default CustomerIndex;
