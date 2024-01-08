import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminIndex = () => {
  const [booking, setBooking] = useState(null);
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
          "http://localhost:5000/api/admin/booking"
        );
        const { status, msg } = response.data;
        if (status == "SUCCESS") {
          setBooking(msg);
        } else {
         console.log(status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <Button to="/admin/user" name="User" />
      <Button to="/admin/carsize" name="Car Size" />
      <Button to="/admin/service" name="Service" />
      <Button to="/admin/booking" name="Booking" />
      <div>
        {booking ? (
          <div>
            {booking.map((item) => (
              <p key={item.id}>
                {item.id} , {item.car_no} , {item.service_date} ,
                {item.service_type}
              </p>
            ))}
          </div>
        ) : (
          <h1>NO BOOKING</h1>
        )}
      </div>
    </div>
  );
};

export default AdminIndex;
