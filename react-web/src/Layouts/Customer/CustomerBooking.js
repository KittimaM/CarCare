import React from "react";

const CustomerBooking = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label for="car_no">Car NO</label>
      <input type="text" name="car_no" />
      <label for="car_size">Car Size</label>
      <input type="text" name="car_size" />
      <label for="car_color">Car Color</label>
      <input type="text" name="car_color" />
      <label for="service_type">Service type</label>
      <input type="text" name="service_type" />
      <label for="service_time">Service Time</label>
      <input type="text" name="service_time" />
      <label for="payment_type">Payment type</label>
      <input type="text" name="payment_type"/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerBooking;
