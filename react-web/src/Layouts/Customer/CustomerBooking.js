import React, { useState, useEffect } from "react";
import {
  Button,
  FetchBooking,
  TimeFormat,
  DefaultTimeOptions,
} from "../Module";
import {
  GetAllService,
  GetCustomerCar,
  PostAddCustomerBooking,
  GetAllPaymentType,
} from "../Api";


// --------------------
import {Box} from '@mui/material'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CustomerBooking = () => {
  const [car, setCar] = useState();
  const [service, setService] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [booking, setBooking] = useState([]);
  const [dateOptions, setDateOptions] = useState([]);
  const [bookedDateTimeOptions, setBookedDateTimeOptions] = useState(null);
  const [timeOptions, setTimeOptions] = useState([]);
  const [defaultTimeOptions, setDefaultTimeOptions] = useState([]);
  const [serviceUseTime, setServiceUseTime] = useState(0);
  const [paymentType, setPaymentType] = useState();

  useEffect(() => {
    GetAllPaymentType().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setPaymentType(msg);
      } else {
        console.log(data);
      }
    });
    GetCustomerCar().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setCar(msg);
      } else {
        console.log(data);
      }
    });
    FetchBooking().then((data) => {
      setBookedDateTimeOptions(data);
    });

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

    setTimeOptions(DefaultTimeOptions());
    setDefaultTimeOptions(DefaultTimeOptions());
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
    GetAllService().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        const availableService = msg.filter(
          (item) =>
            item.is_available == 1 && jsonData.car_size_id == item.car_size_id
        );
        let serviceOptions = [];
        availableService.map((item) => {
          serviceOptions.push({ ...item, isSelected: false });
        });
        setService(serviceOptions);
        setBooking(jsonData);
      } else {
        setService(null);
        console.log(data);
      }
    });
  };

  const handleSelectedService = (event) => {
    service.map((item) => {
      if (item.id == event.target.value) item.isSelected = event.target.checked;
    });
    setService(service);
  };

  const handleSubmitSelectedService = (event) => {
    event.preventDefault();
    let serviceDetail = [];
    let servcieUseTime = 0;
    let servicePrice = 0;
    service.map((item) => {
      if (item.isSelected == true) {
        serviceDetail.push(item.id);
        servcieUseTime += parseInt(item.used_time);
        servicePrice += parseInt(item.price);
      }
    });
    const jsonData = {
      ...booking,
      service: serviceDetail,
      service_usetime: servcieUseTime,
      service_price: servicePrice,
    };
    setBooking(jsonData);
    setServiceUseTime(servcieUseTime);
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
      payment_type_id: data.get("payment_type"),
    };
    setBooking(jsonData);
  };

  const handleSubmitBooking = (event) => {
    event.preventDefault();
    PostAddCustomerBooking(booking).then((data) => console.log(data));
  };

  return (

    <>

    
     <div className="navbar bg-neutral text-neutral-content">
              <div className="flex-1">
                <a className="btn btn-ghost text-xl">Carcare</a>
              </div>
              <div className="flex-none gap-2">
                {/* <div className="form-control">
                  <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div> */}
                <div>
                    <Button to="/customer/car" name="Customer Car" />
                </div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                    
                  </div>
                  <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <div className='badge m-2'>Phattraporn Bunjongket</div>
                    {/* <li>
                      <a className="justify-between">
                        Profile
                      </a>
                    </li> */}
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                  </ul>
                </div>
              </div>
            </div>





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
              <button type="submit" className="btn">
                Select Car
              </button>
            </form>
          ) : (
            <Button to="/customer/car" name="add car" />
          )}
          {service && (
            <form onSubmit={handleSubmitSelectedService}>
              <label>Service</label>
              {service.map((item) => (
                <div>
                  <input
                    type="checkbox"
                    name={item.id}
                    value={item.id}
                    onChange={handleSelectedService}
                  />
                  <label>{item.service}</label>
                </div>
              ))}
              <button className="btn" type="submit">
                Submit Service
              </button>
            </form>
          )}
          {dateOptions &&
            dateOptions.map((item) => (

              // <Box style={{padding:"20px"}}>
              //   < LocalizationProvider dateAdapter={AdapterDayjs} 
              //   onClick={handleSubmitSelectedTime} 
              //   key={item} 
              //   value={item} >
              //     <DatePicker label="Select Date"/>
              //   </LocalizationProvider>
              // </Box>

              <button
                onClick={handleSubmitSelectedDate}
                value={item}
                key={item}
                className="btn"
              >
                {item}
              </button>
            ))}
          {selectedDate &&
            timeOptions &&
            timeOptions.map((item) => (
              
              <button
                onClick={handleSubmitSelectedTime}
                key={item}
                value={item}
                className="btn"
              >
                {item}
              </button>
            ))}
          {paymentType && (
            <form onSubmit={handleSubmitPaymentType}>
              <label name="payment_type">Payment Type</label>
              <select name="payment_type">
                {paymentType.map(
                  (item) =>
                    item.is_available == 1 && (
                      <option key={item.id} value={item.id}>
                        {item.payment_type}
                      </option>
                    )
                )}
              </select>
              <button type="submit" className="btn">
                Select Payment Type
              </button>
            </form>
          )}
          <button onClick={handleSubmitBooking} className="btn">
            Submit Booking
          </button>
        </div>


    </>
    
  );
};

export default CustomerBooking;
