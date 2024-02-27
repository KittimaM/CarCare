import React, { useEffect, useState } from "react";
import {
  DeleteCustomerCar,
  GetAllCarSize,
  GetCustomerCar,
  PostAddCustomerCar,
  UpdateCustomerCar,
} from "../Api";

const CustomerCar = () => {
  const [car, setCar] = useState();
  const [carSize, setCarSize] = useState();
  const [editItem, setEditItem] = useState(null);

  const fetchCarSize = async () => {
    GetAllCarSize().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setCarSize(msg);
      } else {
        console.log(data);
      }
    });
  };

  const fetchCustomerCar = async () => {
    GetCustomerCar().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setCar(msg);
      } else {
        console.log(data);
      }
    });
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

    PostAddCustomerCar(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchCustomerCar();
      } else {
        console.log(data);
      }
    });
  };

  const handleSelectEditId = (selectedItem) => {
    setEditItem(selectedItem);
  };

  const handleDeleteCustomerCar = (event) => {
    event.preventDefault();
    const jsonData = {
      car_no: event.target.value,
    };
    DeleteCustomerCar(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchCustomerCar();
      } else {
        console.log(data);
      }
    });
  };

  const handleEditCustomerCar = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      car_no: data.get("car_no"),
      car_color: data.get("car_color"),
      car_size: data.get("car_size").split(",")[1],
      car_size_id: data.get("car_size").split(",")[0],
      old_car_no: editItem.car_no,
    };
    UpdateCustomerCar(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setEditItem(null);
        fetchCustomerCar();
      } else {
        console.log(data);
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleCustomerAddCar}>
        <label name="car_no">car_no</label>
        <input type="text" name="car_no" />
        <label name="car_color">car_color</label>
        <input type="text" name="car_color" />
        {carSize && (
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
        )}
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      {car && (
        <table>
          <thead>
            <tr>
              <td>car_no</td>
              <td>car_size</td>
              <td>car_color</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {car.map((item) => (
              <tr key={item.car_no}>
                <td>{item.car_no}</td>
                <td>{item.car_size}</td>
                <td>{item.car_color}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleSelectEditId(item)}
                    value={item.car_no}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={handleDeleteCustomerCar}
                    value={item.car_no}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editItem && (
        <form onSubmit={handleEditCustomerCar}>
          <label name="car_no">car_no</label>
          <input type="text" name="car_no" defaultValue={editItem.car_no} />
          <label name="car_color">car_color</label>
          <input
            type="text"
            name="car_color"
            defaultValue={editItem.car_color}
          />
          {carSize && (
            <select
              name="car_size"
              defaultValue={[editItem.car_size_id, editItem.car_size]}
            >
              {carSize.map(
                (item) =>
                  item.is_available == 1 && (
                    <option key={item.id} value={[item.id, item.size]}>
                      {item.size}
                    </option>
                  )
              )}
            </select>
          )}
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default CustomerCar;
