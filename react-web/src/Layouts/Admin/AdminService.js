import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminService = () => {
  const [carSize, setCarSize] = useState();
  const [service, setService] = useState();
  const fetchService = async () => {

    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/service"
      );
      const { status, msg } = response.data;
      if (status == "SUCCESS") {
        setService(msg);
      } else {
        console.log(msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    fetchService();
    fetchCarSize();
  }, []);

  const handleAdminAddService = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      service: data.get("service"),
      description: data.get("description"),
      car_size_id: data.get("car_size").split(",")[0],
      car_size: data.get("car_size").split(",")[1],
      used_time: data.get("used_time"),
      price: data.get("price"),
    };
    axios
      .post("http://localhost:5000/api/admin/service", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { status, msg } = response.data;
        console.log("status : ", status, " msg: ", msg);
        fetchService();
      });
  };

  return (
    <div>
      <form onSubmit={handleAdminAddService}>
        <label name="service">service</label>
        <input type="text" name="service" />
        <label name="description">description</label>
        <input type="text" name="description" />
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
        <label name="used_time">used_time</label>
        <input type="text" name="used_time" />
        <label name="price">price</label>
        <input type="text" name="price" />
        <button type="submit">Submit</button>
      </form>
      {service ? (
        <div>
          {service.map((item) => (
            <p key={item.id}>
              {item.id} , {item.service}, {item.description} ,{" "}
              {item.car_size_id}, {item.car_size} ,
              {item.is_available == 1 ? "available" : "not available"}
            </p>
          ))}
        </div>
      ) : (
        "NO DATA"
      )}
    </div>
  );
};

export default AdminService;
