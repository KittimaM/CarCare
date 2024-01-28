import React from "react";
import { useNavigate } from "react-router-dom";
import { PostAddCustomer } from "../Api";

const CustomerRegister = () => {
  const navigate = useNavigate();
  const handleRegister = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      name: data.get("name"),
      phone: data.get("phone"),
      password: data.get("password"),
    };

    PostAddCustomer(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        navigate("/customer");
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
    });
  };
  return (
    <form onSubmit={handleRegister}>
      <label name="phone">phone</label>
      <input type="text" name="phone" required />
      <label name="name">name</label>
      <input type="text" name="name" required />
      <label name="password">password</label>
      <input type="password" name="password" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerRegister;
