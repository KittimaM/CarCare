import React, { useEffect, useState } from "react";
import { Button } from "../Module";
import { DeleteCustomerBooking, GetAllCustomerBooking } from "../Api";

const CustomerIndex = () => {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchCustomerBooking();
  }, []);

  const fetchCustomerBooking = () => {
    GetAllCustomerBooking().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setBooking(msg);
      } else {
        setBooking(null);
        console.log("status : ", status, ", msg: ", msg);
      }
    });
  };

  const handleDeleteCustomerBooking = (event) => {
    event.preventDefault();
    const jsonData = {
      id: event.target.value,
    };
    DeleteCustomerBooking(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchCustomerBooking();
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
    });
  };
  return (
    <div>
      <Button to="/customer/booking" name="Booking" />
      <Button to="/customer/car" name="Customer Car" />
      {booking && (
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>car_no</td>
              <td>start_service_datetime</td>
              <td>processing_status</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {booking.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.car_no}</td>
                <td>{item.start_service_datetime}</td>
                <td>{item.processing_status}</td>
                <td>
                  {item.processing_status == "Waiting" && (
                    <button
                      className="btn"
                      onClick={handleDeleteCustomerBooking}
                      value={item.id}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerIndex;
