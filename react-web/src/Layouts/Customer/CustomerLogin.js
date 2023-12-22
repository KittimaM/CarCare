import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      phone: data.get("phone"),
      password: data.get("password"),
    };
    axios
      .post("http://localhost:5000/api/customer/login", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { status, msg } = response.data;
        alert(status);
        if (status === "SUCCESS") {
          localStorage.setItem("token", msg);
          navigate("/customer/index");
        }
      });
  };
  return (
    <form onSubmit={handleLogin}>
      <label name="phone">phone</label>
      <input type="text" name="phone" required />
      <label name="password">password</label>
      <input type="password" name="password" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerLogin;
