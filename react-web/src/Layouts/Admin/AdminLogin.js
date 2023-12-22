import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    axios
      .post("http://localhost:5000/api/admin/login", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { status, msg } = response.data;
        alert(status);
        console.log(msg);
        if (status === "SUCCESS") {
          localStorage.setItem("token", msg);
          navigate("/admin");
        }
      });
  };
  return (
    <form onSubmit={handleLogin}>
      <label name="username">username</label>
      <input type="text" name="username" required />
      <label name="password">password</label>
      <input type="password" name="password" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AdminLogin;
