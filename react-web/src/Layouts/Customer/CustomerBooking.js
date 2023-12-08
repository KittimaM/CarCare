import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CustomerBooking = () => {
  const [carSize, setCarSize] = useState({});
  const [service, setService] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookingId, setBookingId] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCarSize = await axios.get(
          "http://localhost:5000/api/admin/carsize"
        );
        if (responseCarSize.data.status == "SUCCESS") {
          setCarSize(responseCarSize.data.msg);
        } else {
          console.log(responseCarSize.data.msg);
        }
        const responseService = await axios.get(
          "http://localhost:5000/api/admin/service"
        );
        if (responseService.data.status == "SUCCESS") {
          setService(responseService.data.msg);
        } else {
          console.log(responseService.data.msg);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      car_no: data.get("car_no"),
      car_size: data.get("car_size"),
      service_type: data.get("service_type"),
      service_date: data.get("service_date"),
      payment_type: data.get("payment_type"),
      car_size: data.get("car_size"),
    };
    console.log("jsonData : ", jsonData);
    axios
      .post("http://localhost:5000/api/customer/booking", jsonData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { status, msg } = response.data;
        alert(status);
        if (status == "SUCCESS") {
          setBookingId(msg);
        } else if (status == "ERROR") {
          console.log(msg);
          if (msg == "token expired") {
            navigate("/");
          }
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="car_no">Car NO</label>
        <input type="text" name="car_no" required />
        <div id="car_size">
          <label for="car_size">Car Size</label>
          {carSize.length > 0 ? (
            <select name="car_size">
              {carSize.map((item) => (
                <option value={item.id}>{item.size}</option>
              ))}
            </select>
          ) : (
            <div> cannot select car size</div>
          )}
        </div>
        <div id="service">
          <label for="service_type">Service type</label>
          {service.length > 0 ? (
            <select name="service_type">
              {service.map((item) => (
                <option value={item.id}>{item.service}</option>
              ))}
            </select>
          ) : (
            <div> cannot select service</div>
          )}
        </div>
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

      {bookingId && <div>your booking id is {bookingId}</div>}
    </div>
  );
};

export default CustomerBooking;
