import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminCarSize = () => {
  const [carSize, setCarSize] = useState(null);
  const [addCarSize, setAddCarSize] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/carsize"
      );
      const { status, msg } = response.data;
      if (status == "SUCCESS") {
        setCarSize(msg);
      } else {
        alert(status);
        console.log(msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleAddCarSize = (event) => {
    setAddCarSize(!addCarSize);
  };

  const handleSubmitAddCarSize = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      size: data.get("size"),
      description: data.get("description"),
    };
    axios
      .post("http://localhost:5000/api/admin/carsize", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { status, msg } = response.data;
        alert(status);
        console.log(msg);
      });
    setAddCarSize(false);
    fetchData();
  };

  return (
    <div>
      <button onClick={toggleAddCarSize}>
        {addCarSize ? "cancel" : "add car size"}
      </button>
      {addCarSize && (
        <form onSubmit={handleSubmitAddCarSize}>
          <label name="size">size</label>
          <input type="text" name="size" required />
          <label name="description">description</label>
          <input type="text" name="description" required />
          <button type="submit">Submit</button>
        </form>
      )}
      {carSize ? (
        <div>
          {carSize.map((item) => (
            <p key={item.id}>
              {item.id} , {item.size} , {item.description}
            </p>
          ))}
        </div>
      ) : (
        <p>NO carSize</p>
      )}
    </div>
  );
};

export default AdminCarSize;
