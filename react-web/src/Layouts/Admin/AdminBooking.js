import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FetchBooking,
  DefaultTimeOptions,
  FetchCarSize,
  TimeFormat,
} from "../Module";

const AdminBooking = () => {
  const token = localStorage.getItem("token");
  const defaultTime = new Date();
  const [service, setService] = useState();
  const [selectedService, setSelectedService] = useState([]);
  const [booking, setBooking] = useState([]);
  const [carSize, setCarSize] = useState();
  const [usedTime, setUsedTime] = useState(0);
  const [defaultTimeOptions, setDefaultTimeOptions] = useState([]);
  const [serviceUseTime, setServiceUseTime] = useState(0);
  const [bookedDateTimeOptions, setBookedDateTimeOptions] = useState(null);
  const [timeOptions, setTimeOptions] = useState([]);

  useEffect(() => {
    FetchCarSize().then((data) => setCarSize(data));
    FetchBooking().then((data) => setBookedDateTimeOptions(data));

    let defaultTimeOptions = DefaultTimeOptions();
    const newTimeOptions = defaultTimeOptions.filter(
      (item) => item > TimeFormat(defaultTime)
    );
    newTimeOptions.length > 0
      ? setDefaultTimeOptions(newTimeOptions)
      : setDefaultTimeOptions(DefaultTimeOptions());
  }, []);

  const handleSubmitCar = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [car_size_id, car_size] = data.get("car_size").split(",");
    const jsonData = {
      car_no: data.get("car_no"),
      car_size_id: car_size_id,
      car_size: car_size,
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
    const [service_id, service_type, used_time] = data
      .get("service")
      .split(",");
    const jsonData = {
      service_id: service_id,
      service_type: service_type,
      used_time: used_time,
    };
    setServiceUseTime(parseInt(serviceUseTime) + parseInt(used_time));
    setSelectedService([...selectedService, jsonData]);
  };

  const handleSubmitSelectedService = (event) => {
    event.preventDefault();
    const jsonData = {
      ...booking,
      service: selectedService,
      service_usetime: serviceUseTime,
    };
    setBooking(jsonData);

    const tempDate = new Date();
    const [date, time] = tempDate.toISOString().split("T");
    if (bookedDateTimeOptions && bookedDateTimeOptions[date]) {
      let bookedTime = [];
      bookedDateTimeOptions[date].map((item) => {
        const { start_service_time, service_usetime } = item;
        let initialTime = service_usetime;
        let newTimeOptions = new Date();
        const [hour, mins] = start_service_time.split(":");
        bookedTime.push(`${hour}:${mins}`);

        if (service_usetime > 30) {
          newTimeOptions.setHours(hour, mins, 0);
          while (initialTime > 30) {
            newTimeOptions.setMinutes(newTimeOptions.getMinutes() + 30);
            bookedTime.push(TimeFormat(newTimeOptions));
            initialTime = initialTime - 30;
          }
        }
      });
      const newTimeOptions = defaultTimeOptions.filter(
        (item) => !bookedTime.includes(item)
      );
      setTimeOptions(newTimeOptions);
    } else {
      setTimeOptions(defaultTimeOptions);
    }
  };

  const handleSubmitSelectedTime = (event) => {
    event.preventDefault();
    const [date, time] = defaultTime.toISOString().split("T");
    let service_time = event.target.value;
    let [hour, mins] = service_time.split(":");
    let endTime = new Date();
    endTime.setHours(hour, mins, 0);
    endTime.setMinutes(endTime.getMinutes() + serviceUseTime);
    endTime = TimeFormat(endTime);

    let closeTime = new Date();
    closeTime.setHours(18, 0, 0);
    closeTime = TimeFormat(closeTime);
    if (endTime <= closeTime) {
      if (bookedDateTimeOptions && bookedDateTimeOptions[date]) {
        let result = bookedDateTimeOptions[date]
          .map((item) => {
            const { start_service_time, end_service_time } = item;
            let booked_start_time = new Date();
            booked_start_time = start_service_time;
            let booked_end_time = new Date();
            booked_end_time = end_service_time;

            if (booked_start_time < endTime && endTime < booked_end_time) {
              return false;
            }
            if (
              service_time < booked_start_time &&
              booked_end_time <= endTime
            ) {
              return false;
            }
            return true;
          })
          .every((value) => value);

        if (result) {
          const jsonData = {
            ...booking,
            start_service_datetime: date + "T" + service_time,
            end_service_datetime: date + "T" + endTime,
          };
          setBooking(jsonData);
        } else {
          alert("please select other time");
        }
      } else {
        const jsonData = {
          ...booking,
          start_service_datetime: date + "T" + service_time,
          end_service_datetime: date + "T" + endTime,
        };
        setBooking(jsonData);
      }
    } else {
      alert("please select other time");
    }
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
                <p key={item.id}>{item.service_type}</p>
              ))}
              <button onClick={handleSubmitSelectedService}>
                Done Select Service
              </button>
            </div>
          )}
        </div>
      )}
      {timeOptions &&
        timeOptions.map((item) => (
          <button onClick={handleSubmitSelectedTime} key={item} value={item}>
            {item}
          </button>
        ))}
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
