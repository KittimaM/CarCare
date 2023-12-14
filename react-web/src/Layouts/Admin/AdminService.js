import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminService = () => {
  const [service, setService] = useState(null);
  const [addService, setAddService] = useState(false);
  // var service;

  const fetchData = async () => {
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
  const toggleAddService = () => {
    setAddService(!addService);
  };

  const handleSubmitAddService = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      service: data.get("service"),
    };
    axios
      .post("http://localhost:5000/api/admin/service", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { status, msg } = response.data;
        alert(status);
        if (status == "SUCCESS") {
          fetchData();
        } else {
          console.log(msg);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button onClick={toggleAddService}>
        {addService ? "cancel" : "add service"}
      </button>
      {addService && (
        <form onSubmit={handleSubmitAddService}>
          <label name="service">service</label>
          <input type="text" name="service" required />
          <button type="submit">Submit</button>
        </form>
      )}
      {service
        ? service.map((item) => (
            <p key={item.id}>
              {item.id}, {item.service}
            </p>
          ))
        : "Not available"}
    </div>
  );
};

export default AdminService;
