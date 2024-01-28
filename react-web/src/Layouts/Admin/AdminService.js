import React, { useEffect, useState } from "react";
import {
  DeleteService,
  GetAllCarSize,
  GetAllService,
  PostAddService,
  UpdateService,
} from "../Api";

const AdminService = () => {
  const [carSize, setCarSize] = useState();
  const [service, setService] = useState();
  const [editItem, setEditItem] = useState(null);

  const fetchService = () => {
    GetAllService().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setService(msg);
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
    });
  };

  const fetchCarSize = () => {
    GetAllCarSize().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setCarSize(msg);
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
    });
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

    PostAddService(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchService();
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
    });
  };

  const handleSelectEditId = (selectedItem) => {
    setEditItem(selectedItem);
  };

  const handleEditService = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      id: editItem.id,
      service: data.get("service"),
      description: data.get("description"),
      car_size_id: data.get("car_size").split(",")[0],
      car_size: data.get("car_size").split(",")[1],
      used_time: data.get("used_time"),
      price: data.get("price"),
      is_available: data.get("is_available"),
    };
    UpdateService(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setEditItem(null);
        fetchService();
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
    });
  };

  const handleDeleteService = (event) => {
    event.preventDefault();
    const jsonData = {
      id: event.target.value,
    };
    DeleteService(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchService();
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
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
        <button type="submit" className="btn">
          Submit
        </button>
      </form>

      {service && (
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>service</td>
              <td>description</td>
              <td>car_size</td>
              <td>is_available</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {service.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.service}</td>
                <td>{item.description}</td>
                <td>{item.car_size}</td>
                <td>
                  {item.is_available == 1 ? "available" : "not available"}
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleSelectEditId(item)}
                    value={item.id}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={handleDeleteService}
                    value={item.id}
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
        <form onSubmit={handleEditService}>
          <label name="service">service</label>
          <input type="text" name="service" defaultValue={editItem.service} />
          <label name="description">description</label>
          <input
            type="text"
            name="description"
            defaultValue={editItem.description}
          />
          {carSize && (
            <div>
              <label name="car_size">car_size</label>
              <select
                name="car_size"
                defaultValue={[editItem.car_size_id, editItem.car_size]}
              >
                {carSize.map((item) => (
                  <option key={item.id} value={[item.id, item.size]}>
                    {item.size}
                  </option>
                ))}
              </select>
            </div>
          )}
          <label name="used_time">used_time</label>
          <input
            type="text"
            name="used_time"
            defaultValue={editItem.used_time}
          />
          <label name="price">price</label>
          <input type="text" name="price" defaultValue={editItem.price} />
          <select name="is_available" defaultValue={editItem.is_available}>
            <option value={1}>available</option>
            <option value={0}>not available</option>
          </select>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminService;
