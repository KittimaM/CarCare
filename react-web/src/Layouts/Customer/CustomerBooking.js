import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TimeFormat } from "../Module";

const CustomerBooking = () => {
  const token = localStorage.getItem("token");
  const [car, setCar] = useState();
  const [service, setService] = useState();
  const [selectedService, setSelectedService] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [booking, setBooking] = useState([]);
  const [dateOptions, setDateOptions] = useState([]);
  const [bookedDateTimeOptions, setBookedDateTimeOptions] = useState(null);
  const [timeOptions, setTimeOptions] = useState([]);
  const [defaultTimeOptions, setDefaultTimeOptions] = useState([]);
  const [serviceUseTime, setServiceUseTime] = useState(0);

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

  const fetchBooking = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/booking"
      );
      const { status, msg } = response.data;
      if (status == "SUCCESS") {
        let bookedDateTime = {};
        msg.map((item) => {
          const {
            id,
            start_service_datetime,
            end_service_datetime,
            service_usetime,
          } = item;
          const [startDate, startTime] = start_service_datetime.split("T");
          const [startHour, startMins] = startTime.split(".")[0].split(":");
          const start_service_time = startHour + ":" + startMins;
          const [endDate, endTime] = end_service_datetime.split("T");
          const [endHour, endMins] = endTime.split(".")[0].split(":");
          const end_service_time = endHour + ":" + endMins;
          if (bookedDateTime[startDate]) {
            bookedDateTime[startDate].push({
              id: id,
              start_service_time: start_service_time,
              end_service_time: end_service_time,
              service_usetime: service_usetime,
            });
          } else {
            bookedDateTime[startDate] = [
              {
                id: id,
                start_service_time: start_service_time,
                end_service_time: end_service_time,
                service_usetime: service_usetime,
              },
            ];
          }
          setBookedDateTimeOptions(bookedDateTime);
        });
      } else {
        console.log(msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCustomerCar();
    fetchBooking();

    let tempDateOptions = [];
    let newDateOptions = new Date();
    let maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    maxDate = maxDate.toISOString().split("T")[0];
    do {
      newDateOptions.setDate(newDateOptions.getDate() + 1);
      let dataToInput = newDateOptions.toISOString().split("T")[0];
      tempDateOptions.push(dataToInput);
    } while (!tempDateOptions.includes(maxDate));
    setDateOptions(tempDateOptions);

    let tempTimeOptions = [];
    let newTimeOptions = new Date();
    newTimeOptions.setHours(8, 0, 0);
    let tempMaxTime = new Date();
    tempMaxTime.setHours(17, 30, 0);
    let maxTime = TimeFormat(tempMaxTime);

    do {
      const dateToInput = TimeFormat(newTimeOptions);
      tempTimeOptions.push(dateToInput);
      newTimeOptions.setMinutes(newTimeOptions.getMinutes() + 30);
    } while (!tempTimeOptions.includes(maxTime));
    setTimeOptions(tempTimeOptions);
    setDefaultTimeOptions(tempTimeOptions);
  }, []);

  const handleSubmitSelectedCar = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [
      car_no,
      car_size_id,
      car_size,
      car_color,
      customer_phone,
      customer_name,
    ] = data.get("car_no").split(",");
    const jsonData = {
      ...booking,
      car_no: car_no,
      car_size_id: car_size_id,
      car_size: car_size,
      car_color: car_color,
      customer_phone: customer_phone,
      customer_name: customer_name,
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
    console.log("serviceUseTime : ", serviceUseTime);
    setBooking(jsonData);
  };

  const handleSubmitSelectedDate = (event) => {
    event.preventDefault();
    let dateSelected = event.target.value;
    setSelectedDate(dateSelected);

    if (bookedDateTimeOptions && bookedDateTimeOptions[dateSelected]) {
      let bookedTime = [];
      bookedDateTimeOptions[dateSelected].map((item) => {
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
    let service_date = new Date();
    service_date = selectedDate;
    let service_time = new Date();
    service_time = event.target.value;
    let [hour, mins] = service_time.split(":");
    let endTime = new Date();
    endTime.setHours(hour, mins, 0);
    endTime.setMinutes(endTime.getMinutes() + serviceUseTime);
    endTime = TimeFormat(endTime);

    let closeTime = new Date();
    closeTime.setHours(18, 0, 0);
    closeTime = TimeFormat(closeTime);
    if (endTime <= closeTime) {
      if (bookedDateTimeOptions && bookedDateTimeOptions[service_date]) {
        let result = bookedDateTimeOptions[service_date]
          .map((item) => {
            const { start_service_time, end_service_time } = item;
            let booked_start_time = new Date();
            booked_start_time = start_service_time;
            let booked_end_time = new Date();
            booked_end_time = end_service_time;

            if (booked_start_time < endTime && endTime < booked_end_time) {
              return false;
            }
            if (service_time < booked_start_time && booked_end_time <= endTime) {
              return false;
            }
            return true;
          })
          .every((value) => value);

        if (result) {
          const jsonData = {
            ...booking,
            start_service_datetime: service_date + "T" + service_time,
            end_service_datetime: service_date + "T" + endTime,
          };
          setBooking(jsonData);
        } else {
          alert("please select other time");
        }
      } else {
        const jsonData = {
          ...booking,
          start_service_datetime: service_date + "T" + service_time,
          end_service_datetime: service_date + "T" + endTime,
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
      .post("http://localhost:5000/api/customer/booking", booking, {
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
      <label name="car_no">car_no</label>
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
                  item.car_color,
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
                <p key={item.id}>{item.service_type}</p>
              ))}
              <button onClick={handleSubmitSelectedService}>
                Done Select Service
              </button>
            </div>
          )}
        </div>
      )}
      {dateOptions &&
        dateOptions.map((item) => (
          <button onClick={handleSubmitSelectedDate} value={item} key={item}>
            {item}
          </button>
        ))}
      {selectedDate &&
        timeOptions &&
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

export default CustomerBooking;
