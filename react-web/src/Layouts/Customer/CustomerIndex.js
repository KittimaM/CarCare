import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CustomerIndex = () => {
  const [bookingRecord, setBookingRecord] = useState(null);
  const token = localStorage.getItem("token");
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
          "http://localhost:5000/api/customer/index",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { status, msg } = response.data;
        if (status == "SUCCESS") {
          setBookingRecord(msg);
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
      <Button to="/customer/booking" name="Booking" />
      {bookingRecord ? (
        <div>
          {bookingRecord.map((item) => (
            <p key={item.id}>
              {item.id}, {item.car_no}, {item.service_type}, {item.service_date}
              , {item.status}
            </p>
          ))}
        </div>
      ) : (
        <p>NO BOOKING RECORD</p>
      )}
    </div>
  );
};

export default CustomerIndex;
