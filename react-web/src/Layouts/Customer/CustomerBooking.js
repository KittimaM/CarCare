import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomerBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookingId, setBookingId] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      token: localStorage.getItem("token"),
      car_no: data.get("car_no"),
      car_size: data.get("car_size"),
      service_type: data.get("service_type"),
      service_date: data.get("service_date"),
      payment_type: data.get("payment_type"),
    };

    axios
      .post("http://localhost:5000/api/customer/booking", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { status, msg } = response.data;
        if (status == "SUCCESS") {
          alert("SUCCESS");
          setBookingId(msg);
        } else if (status == "ERROR") {
          alert(msg);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label for="car_no">Car NO</label>
      <input type="text" name="car_no" required />
      <label for="car_size">Car Size</label>
      <input type="text" name="car_size" required />
      <label for="service_type">Service type</label>
      <input type="text" name="service_type" required />
      <label for="service_date">Service Time</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={new Date()}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
        name="service_date"
        required
      />
      {/* <input type="text" name="service_date" /> */}
      <label for="payment_type">Payment type</label>
      <input type="text" name="payment_type" required />
      <button type="submit">Submit</button>
    </form>

    {bookingId && (
      <div>
        your booking id is {bookingId}
      </div>
    )}
    </div>

  );
};

export default CustomerBooking;
