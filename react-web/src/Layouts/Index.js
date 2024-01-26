import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Module";

const Index = () => {
  return (
    <div>
      <Button to="/customer" name="Customer" />
      <Button to="/admin/login" name="Admin" />
      <button className="btn btn-warning">BOOK HERE!</button>
    </div>
  );
};

export default Index;
