import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerCar = () => {
  const [car, setCar] = useState();
  const [carSize, setCarSize] = useState();
  const token = localStorage.getItem("token");

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
    fetchCarSize();
    fetchCustomerCar();
  }, []);

  const handleCustomerAddCar = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      car_no: data.get("car_no"),
      car_color: data.get("car_color"),
      car_size: data.get("car_size").split(",")[1],
      car_size_id: data.get("car_size").split(",")[0],
    };

    axios
      .post("http://localhost:5000/api/customer/car", jsonData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { status, msg } = response.data;
        console.log("status : ", status, " msg: ", msg);
        fetchCustomerCar();
      });
  };
  return (
    <div>
      <form onSubmit={handleCustomerAddCar}>
        <label name="car_no">car_no</label>
        <input type="text" name="car_no" />
        <label name="car_color">car_color</label>
        <input type="text" name="car_color" />
        {carSize ? (
          <select name="car_size">
            {carSize.map((item) => (
              <option value={[item.id, item.size]}>{item.size}</option>
            ))}
          </select>
        ) : (
          "Not available"
        )}
        <button type="submit">Submit</button>
      </form>
      {car &&
        car.map((item) => (
          <p>
            {item.car_no}, {item.car_size}, {item.car_color}
          </p>
        ))}
    </div>
  );
};

export default CustomerCar;
