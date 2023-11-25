import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      axios
        .post("http://localhost:5000/api/customer/register", jsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const { msg } = response.data;
          navigate('/customer');
        });
    };
    return (
      <form onSubmit={handleRegister}>
        <label for="phone">phone</label>
        <input type="text" name="phone" required />
        <label for="name">name</label>
        <input type="text" name="name" required />
        <label for="password">password</label>
        <input type="password" name="password" required />
        <button type="submit">Submit</button>
      </form>
    );
}

export default CustomerRegister