import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminService = () => {
  const [service, setService] = useState();
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
      console.log(service);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {service ? service.map((item) => <p>{item.service}</p>) : "Not available"}
    </div>
  );
};

export default AdminService;
