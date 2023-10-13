import React, { useState } from "react";
import axios from "axios";
import Role from "./Role";

//แก้ api โดนเรียก 2 รอบ
const Login = () => {
  const [resMsg, setResMsg] = useState("");
  const [jsonData, setJsonData] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      user: data.get("user"),
      password: data.get("password"),
    };
    axios
      .post("http://localhost:5000/api/admin/login", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { msg, token } = response.data;
        alert(msg);
        if (msg === "SUCCESS") {
          setResMsg(msg);
          localStorage.setItem("token", token);
        }
      });
  };
  return (
    <div>
      <h1>Login admin</h1>
      {resMsg === "SUCCESS" ? (
        <Role/>
      ) : (
        <form onSubmit={handleLogin}>
          {resMsg === "ERROR" ? alert("input wrong"):""}
          <input type="text" name="user" required />
          <input type="password" name="password" required />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Login;
