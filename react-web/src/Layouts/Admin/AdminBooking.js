import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBooking = () => {
  const [service, setService] = useState();
  const [selectedService, setSelectedService] = useState([]);
  const [booking, setBooking] = useState([]);
  const [carSize, setCarSize] = useState();
  const [usedTime, setUsedTime] = useState(0);
  const token = localStorage.getItem("token");
  const [timeOptions, setTimeOptions] = useState([
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
  ]);

  const fetchCarSize = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/carsize"
      );
      const { status, msg } = response.data;
      if (status == "SUCCESS") {
        setCarSize(msg);
      } else {
        console.log(msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCarSize();
  }, []);

  const handleSubmitCar = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      car_no: data.get("car_no"),
      car_size_id: data.get("car_size").split(",")[0],
      car_size: data.get("car_size").split(",")[1],
      car_color: data.get("car_color"),
      customer_name: data.get("customer_name"),
      customer_phone: data.get("customer_phone"),
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
    setUsedTime(usedTime + parseInt(jsonData.used_time));
    setSelectedService([...selectedService, jsonData]);
  };

  const handleSubmitSelectedService = (event) => {
    event.preventDefault();
    const jsonData = {
      ...booking,
      service: selectedService,
    };
    console.log("all time use : ", usedTime);
    setBooking(jsonData);
  };

  const handleSubmitSelectedTime = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      ...booking,
      service_time: data.get("service_time"),
    };
    const finishTime = new Date(jsonData.service_time);
    finishTime.setMinutes(finishTime.getMinutes() + usedTime);
    console.log("finish time : ", finishTime.toISOString().slice(0, 16));
    setBooking(jsonData);
  };

  const handleSubmitPaymentType = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      ...booking,
      payment_type: data.get("payment_type"),
    };
    setBooking(jsonData);
  };

  const handleSubmitBooking = (event) => {
    event.preventDefault();
    console.log("booking : ", booking);
    axios
      .post("http://localhost:5000/api/admin/booking", booking, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response.data : ", response.data);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmitCar}>
        <label name="customer_name">Customer_name</label>
        <input type="text" name="customer_name" />
        <label name="customer_phone">Customer_phone</label>
        <input type="text" name="customer_phone" />
        <label name="car_no">car_no</label>
        <input type="text" name="car_no" />
        <label name="car_color">car_color</label>
        <input type="text" name="car_color" />
        {carSize && (
          <div>
            <label name="car_size">car_size</label>
            <select name="car_size">
              {carSize.map(
                (item) =>
                  item.is_available == 1 && (
                    <option key={item.id} value={[item.id, item.size]}>
                      {item.size}
                    </option>
                  )
              )}
            </select>
          </div>
        )}
        <button type="submit">Selected Car</button>
      </form>

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
        <input type="datetime-local" name="service_time" />
        <button type="submit">Select Time</button>
      </form>
      <form onSubmit={handleSubmitPaymentType}>
        <label name="payment_type">Payment Type</label>
        <input type="text" name="payment_type" />
        <button type="submit">Select Payment Type</button>
      </form>
      <button onClick={handleSubmitBooking}>Submit Booking</button>
    </div>
  );
};

export default AdminBooking;
