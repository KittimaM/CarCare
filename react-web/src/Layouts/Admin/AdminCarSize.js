import React, { useEffect, useState } from "react";
import {
  DeleteCarSize,
  GetAllCarSize,
  PostAddCarSize,
  UpdateCarSize,
} from "../Api";

const AdminCarSize = () => {
  const [carSize, setCarSize] = useState(null);
  const [addCarSize, setAddCarSize] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchCarSize = async () => {
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
    fetchCarSize();
  }, []);

  const toggleAddCarSize = () => {
    setAddCarSize(!addCarSize);
  };

  const handleSubmitAddCarSize = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      size: data.get("size"),
      description: data.get("description"),
    };

    PostAddCarSize(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchCarSize();
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
    });
    setAddCarSize(false);
  };

  const handleSelectEditId = (selectedItem) => {
    setEditItem(selectedItem);
  };

  const handleDeleteUser = (event) => {
    event.preventDefault();
    const jsonData = {
      id: event.target.value,
    };
    DeleteCarSize(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchCarSize();
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
    });
  };

  const handleEditCarSize = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      id: editItem.id,
      size: data.get("size"),
      description: data.get("description"),
      is_available: data.get("is_available"),
    };
    UpdateCarSize(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setEditItem(null);
        fetchCarSize();
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
    });
  };

  return (
    <div>
      {addCarSize && (
        <form onSubmit={handleSubmitAddCarSize}>
          <label name="size">size</label>
          <input type="text" name="size" required />
          <label name="description">description</label>
          <input type="text" name="description" required />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      )}
      <button className="btn" onClick={toggleAddCarSize}>
        {addCarSize ? "cancel" : "add car size"}
      </button>
      {carSize && (
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>size</td>
              <td>description</td>
              <td>is_available</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {carSize.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.size}</td>
                <td>{item.description}</td>
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
                    onClick={handleDeleteUser}
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
        <form onSubmit={handleEditCarSize}>
          <label name="size">size</label>
          <input type="text" name="size" defaultValue={editItem.size} />
          <label name="description">description</label>
          <input
            type="text"
            name="description"
            defaultValue={editItem.description}
          />
          <select name="is_available" defaultValue={editItem.is_available}>
            <option value={1}>available</option>
            <option value={0}>not available</option>
          </select>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminCarSize;
