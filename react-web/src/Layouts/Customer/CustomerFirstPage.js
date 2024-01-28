import React from "react";
import { Button } from "../Module";

const CustomerFirstPage = () => {
  return (
    <div>
      <Button to="/customer/login" name="Login" />
      <Button to="/customer/register" name="Register" />
    </div>
  );
};
export default CustomerFirstPage;
