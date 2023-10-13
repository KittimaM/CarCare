import React, { useEffect, useState } from "react";
import axios from "axios";

const Role = () => {
  const [displayData, setDisplayData] = useState([])
  const [getRole, setGetRole] = useState([]);
  const editData = {};
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/admin/role", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.data;
    if (data.msg === "No Permission") {
      // window.location.reload();
    } else if (data.msg === "SUCCESS") {
      // console.log(data);
      setGetRole(data.results);
      console.log(getRole);
    } else if (data.msg === "ERROR") {
      console.log(data.error);
    }
    // console.log(getRole);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("name"));
  };

  const handleChange = (event) => {
    let result = getRole.filter(item => item.id == event.target.value);
    setDisplayData(result);
    editData.id = event.target.value;
    console.log(editData);
  };




  return (
    <div>
      {getRole.length === 0 ? (
        "NO PERMISSION"
      ) : (
          <select onChange={handleChange}>
            <option value="">Select an option</option>
            {getRole.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name} {item.get_role}
                </option>
              );
            })}
          </select>
      )}

      {displayData ? displayData.map(item => {
        return (
         <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder={item.name}/>
          <button type="submit">Edit Role</button>
         </form>
        )
      }) : ""}

    </div>
  );
};

export default Role;
