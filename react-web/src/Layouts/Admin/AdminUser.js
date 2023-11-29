import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminUser = () => {
  const [user, setUser] = useState(null);
  const Button = ({ to, name }) => {
    return (
      <Link to={to}>
        <button>{name}</button>
      </Link>
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/user"
        );
        const { status, results } = response.data;
        if (status == "SUCCESS") {
          setUser(results);
        } else {
          alert(status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Button to="/admin/register" name="register" />
      {user ? (
        <div>
          {user.map((item) => (
            <p key={item.id}>
              {item.id} , {item.username} , {item.name}
            </p>
          ))}
        </div>
      ) : (
        <p>NO USER</p>
      )}
    </div>
  );
};

export default AdminUser;
