import React from "react";
import axios from "axios";

const Login = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      user: data.get("user"),
      password: data.get("password"),
    };
    axios
      .post("http://localhost:5000/api/login", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response.data.msg));
  };
  return (
    <div>
      <h1>Login Customer</h1>
      <form onSubmit={handleLogin}>
        <input type="text" name="user" required />
        <input type="password" name="password" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
