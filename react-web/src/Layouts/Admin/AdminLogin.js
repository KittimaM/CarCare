import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PostLogin } from "../Api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      username: data.get("username"),
      password: data.get("password"),
    };

    PostLogin(jsonData).then((data) => {
      const { status, msg } = data;
      if (status === "SUCCESS") {
        localStorage.setItem("token", msg);
        navigate("/admin");
      } else {
        console.log(data);
      }
    });
  };
  return (
    <form onSubmit={handleLogin}>
      <label name="username">username</label>
      <input type="text" name="username" required />
      <label name="password">password</label>
      <input type="password" name="password" required />
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AdminLogin;
