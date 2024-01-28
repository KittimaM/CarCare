import React from "react";
import { Button } from "./Module";

const Index = () => {
  return (
    <div>
      <Button to="/customer" name="Customer" />
      <Button to="/admin/login" name="Admin" />
    </div>
  );
};

export default Index;
