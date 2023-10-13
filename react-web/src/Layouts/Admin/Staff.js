import React, { useEffect, useState } from "react";
import axios from "axios";

const Staff = () => {
  const [data, setData] = useState("");

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/admin/role", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const results = await response.data;
    setData(results);
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>STAFF</div>;
};

export default Staff;
