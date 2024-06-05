import React, { useEffect, useState } from "react";
import {
  AddOnLeaveType,
  DeleteOnLeaveType,
  GetAllOnLeaveType,
  UpdateOnLeaveType,
} from "../Api";

const AdminOnLeaveType = ({ permission }) => {
  const [onLeaveType, setOnLeaveType] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const fetchOnLeaveType = () => {
    GetAllOnLeaveType().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setOnLeaveType(msg);
      } else {
        console.log(data);
      }
    });
  };

  useEffect(() => {
    fetchOnLeaveType();
  }, []);

  const handleAddOnLeaveType = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      type: data.get("type"),
      day_limit: data.get("day_limit"),
      is_available: data.get("is_available"),
    };

    AddOnLeaveType(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchOnLeaveType();
      } else {
        console.log(data);
      }
    });
  };

  const handleSelectEditId = (selectedItem) => {
    setEditItem(selectedItem);
  };

  const handleEditOnLeaveType = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      id: editItem.id,
      type: data.get("type"),
      day_limit: data.get("day_limit"),
      is_available: data.get("is_available"),
    };
    UpdateOnLeaveType(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setEditItem(null);
        fetchOnLeaveType();
      } else {
        console.log(data);
      }
    });
  };

  const handleDeleteOnLeaveType = (event) => {
    event.preventDefault();
    const jsonData = {
      id: event.target.value,
    };
    DeleteOnLeaveType(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchOnLeaveType();
      } else {
        console.log(data);
      }
    });
  };
  return (
    <>
      {permission && permission.includes("2") && onLeaveType && (
        <form onSubmit={handleAddOnLeaveType}>
          <label>type</label>
          <input type="text" name="type" />
          <label>day_limit</label>
          <input type="number" name="day_limit" />
          <label>is_available</label>
          <select name="is_available">
            <option value={1}>available</option>
            <option value={0}>not available</option>
          </select>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      )}
      {onLeaveType && (
        <table className="table table-lg">
          <thead>
            <tr>
              <td>type</td>
              <td>day limit</td>
              <td>is_available</td>
              {permission && permission.includes("3") && <td>Edit</td>}
              {permission && permission.includes("4") && <td>Delete</td>}
            </tr>
          </thead>
          <tbody>
            {onLeaveType.map((item) => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.day_limit}</td>
                <td>
                  {item.is_available == 1 ? "available" : "not available"}
                </td>
                {permission && permission.includes("3") && (
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleSelectEditId(item)}
                      value={item.id}
                    >
                      Edit
                    </button>
                  </td>
                )}
                {permission && permission.includes("4") && (
                  <td>
                    <button
                      className="btn"
                      onClick={handleDeleteOnLeaveType}
                      value={item.id}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {permission && permission.includes("3") && editItem && (
        <form onSubmit={handleEditOnLeaveType}>
          <label>type</label>
          <input type="text" name="type" defaultValue={editItem.type} />
          <label>day_limit</label>
          <input
            type="number"
            name="day_limit"
            defaultValue={editItem.day_limit}
          />
          <label>is_available</label>
          <select name="is_available" defaultValue={editItem.is_available}>
            <option value={1}>available</option>
            <option value={0}>not available</option>
          </select>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default AdminOnLeaveType;
