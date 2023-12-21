import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../Module";

const CustomerBooking = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [car, setCar] = useState();
  const [selectedCar, setSelectedCar] = useState([]);
  const [service, setService] = useState();
  const [selectedService, setSelectedService] = useState([]);
  const [paymentType, setPaymentType] = useState();
  const [booking, setBooking] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCustomerCar = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/customer/car",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { status, msg } = response.data;
      if (status == "SUCCESS") {
        setCar(msg);
      } else {
        console.log(msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCustomerCar();
  }, []);

  const handleSubmitSelectedCar = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      ...booking,
      car_no: data.get("car_no").split(",")[0],
      car_size_id: data.get("car_no").split(",")[1],
      car_size: data.get("car_no").split(",")[2],
      customer_phone: data.get("car_no").split(",")[3],
      customer_name: data.get("car_no").split(",")[4],
      created_by_id: data.get("car_no").split(",")[3],
      created_by: data.get("car_no").split(",")[4],
    };
    axios
      .post("http://localhost:5000/api/customer/booking/service", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { status, msg } = response.data;
        if (status == "SUCCESS") {
          setService(msg);
          setBooking(jsonData);
        } else {
          setService(null);
          console.log(msg);
        }
      });
  };

  const handleSelectedService = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      service_id: data.get("service").split(",")[0],
      service_type: data.get("service").split(",")[1],
      used_time: data.get("service").split(",")[2],
    };
    setSelectedService([...selectedService, jsonData]);
  };

  const handleSubmitSelectedService = (event) => {
    event.preventDefault();
    const jsonData = {
      ...booking,
      service: selectedService,
    };
    setBooking(jsonData);
  };

  const handleDateChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  const handleSubmitSelectedTime = (event) => {
    event.preventDefault();
    const jsonData = {
      ...booking,
      service_time: selectedDateTime,
    };
    setBooking(jsonData);
  };

  const handleSubmitPaymentType = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      ...booking,
      payment_type: data.get("payment_type"),
    };
    setPaymentType(jsonData.payment_type);
    setBooking(jsonData);
  };

  const handleSubmitBooking = (event) => {
    event.preventDefault();
    console.log("booking : ", booking);
    axios
      .post("http://localhost:5000/api/customer/booking", booking, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response.data : ", response.data);
      });
  };

  return (
    <div>
      <label for="car_no">car_no</label>
      {car ? (
        <form onSubmit={handleSubmitSelectedCar}>
          <select name="car_no">
            {car.map((item) => (
              <option
                key={item.car_no}
                value={[
                  item.car_no,
                  item.car_size_id,
                  item.car_size,
                  item.customer_phone,
                  item.customer_name,
                ]}
              >
                {item.car_no}
              </option>
            ))}
          </select>
          <button type="submit">Select Car</button>
        </form>
      ) : (
        <Button to="/customer/car" name="add car" />
      )}
      {service && (
        <div>
          <form onSubmit={handleSelectedService}>
            <select name="service">
              {service.map((item) => (
                <option
                  key={item.id}
                  value={[item.id, item.service, item.used_time]}
                >
                  {item.service}
                </option>
              ))}
            </select>
            <button type="submit">Select Service</button>
          </form>
          {selectedService && (
            <div>
              {selectedService.map((item) => (
                <p>{item.service_type}</p>
              ))}
              <button onClick={handleSubmitSelectedService}>
                Done Select Service
              </button>
            </div>
          )}
        </div>
      )}
      <form onSubmit={handleSubmitSelectedTime}>
        <label>Select Date and Time:</label>
        <input
          type="datetime-local"
          name="service_time"
          value={selectedDateTime}

          onChange={handleDateChange}
        />
        <button type="submit">Select Time</button>
      </form>
      <form onSubmit={handleSubmitPaymentType}>
        <label for="payment_type">Payment Type</label>
        <input type="text" name="payment_type" />
        <button type="submit">Select Payment Type</button>
      </form>
      <button onClick={handleSubmitBooking}>Submit Booking</button>
    </div>
  );
};

export default CustomerBooking;
