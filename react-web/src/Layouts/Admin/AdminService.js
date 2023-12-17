import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminService = () => {
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

  const handleAdminAddService = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      service: data.get("service"),
      description: data.get("description"),
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
  useEffect(() => {
    fetchService();
  }, []);
  return (
    <div>
      <form onSubmit={handleAdminAddService}>
        <label name="service">service</label>
        <input type="text" name="service" />
        <label name="description">description</label>
        <input type="text" name="description" />
        <button type="submit">Submit</button>
      </form>
      {service ? (
        <div>
          {service.map((item) => (
            <p>
              {item.id} , {item.service}, {item.description} ,
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
