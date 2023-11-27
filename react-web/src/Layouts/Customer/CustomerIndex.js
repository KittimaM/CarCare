import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerIndex = () => {
  const [bookingRecord, setBookingRecord] = useState(null);
  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/customer/index",
          token,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { status, results, msg } = response.data;
        if (status == "SUCCESS") {
          setBookingRecord(results);
        } else if (status == "ERROR") {
          alert(msg);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {/* {bookingRecord ? (
        <div>
          {bookingRecord.map((item) => (
            <p>
              {item.id}, {item.car_no}, {item.status}
            </p>
          ))}
        </div>
      ) : (
        <p>NO BOOKING RECORD</p>
      )} */}
    </div>
  );
};

export default CustomerIndex;
