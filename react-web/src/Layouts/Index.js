import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const Button = ({ to, name }) => {
    return (
      <Link to={to}>
        <button>{name}</button>
      </Link>
    );
  };
  return (
    <div>
      <Button to="/customer" name="Customer" />
      <Button to="/admin/login" name="Admin" />
    </div>
  );
};

export default Index;
