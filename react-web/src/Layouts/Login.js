import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    axios
      .post("http://localhost:5000/api/login", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { msg } = response.data;
        if (msg === "SUCCESS") {
          navigate("/select-car");
        }
      });
  };
  return (
    <form onSubmit={handleLogin}>
      <label for="username">username</label>
      <input type="text" name="username" required />
      <label for="password">password</label>
      <input type="password" name="password" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
