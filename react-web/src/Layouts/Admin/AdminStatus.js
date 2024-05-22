import React, { useState, useEffect } from "react";
import {
  DeleteStatus,
  GetAllStatus,
  GetPermission,
  PostAddStatus,
  UpdateStatus,
} from "../Api";
import SidebarAdmin from "./SidebarAdmin";

const AdminStatus = () => {
  const [status, setStatus] = useState();
  const [permission, setPermission] = useState();
  const [editItem, setEditItem] = useState(null);

  const fetchAllStatus = () => {
    GetAllStatus().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setStatus(msg);
      } else {
        console.log(data);
      }
    });
  };
  useEffect(() => {
    fetchAllStatus();
    GetPermission().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setPermission(msg["have_status_access"]);
      } else {
        console.log(data);
      }
    });
  }, []);

  const handleAddStatus = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      code: data.get("code"),
      description: data.get("description"),
    };
    PostAddStatus(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchAllStatus();
      } else {
        console.log(data);
      }
    });
  };

  const handleSelectEditId = (selectedItem) => {
    setEditItem(selectedItem);
  };

  const handleEditStatus = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      id: editItem.id,
      code: data.get("code"),
      description: data.get("description"),
    };
    UpdateStatus(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setEditItem(null);
        fetchAllStatus();
      } else {
        console.log(data);
      }
    });
  };

  const handleDeleteStatus = (event) => {
    event.preventDefault();
    const jsonData = {
      id: event.target.value,
    };
    DeleteStatus(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchAllStatus();
      } else {
        console.log(data);
      }
    });
  };

  return (
    <div>
      <SidebarAdmin />
      <div className="ml-80 mt-16">
        <div className="text-lg bg-yellow-100 mb-5 "> Status</div>
        {permission && permission.includes("2") && (
          <div>
            <form onSubmit={handleAddStatus}>
              <label>Code</label>
              <input type="text" name="code" />
              <label>description</label>
              <input type="text" name="description" />
              <button className="btn" type="submit">
                Add
              </button>
            </form>
          </div>
        )}
        <table className="table table-lg">
          <thead>
            <tr>
              <td>code</td>
              <td>description</td>
              {permission && permission.includes("3") && <td>Edit</td>}
              {permission && permission.includes("4") && <td>Delete</td>}
            </tr>
          </thead>
          <tbody>
            {status &&
              status.map((item) => (
                <tr>
                  <td>{item.code}</td>
                  <td>{item.description}</td>
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
                        onClick={handleDeleteStatus}
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
        {permission && permission.includes("3") && editItem && (
          <form onSubmit={handleEditStatus}>
            <label>code</label>
            <input type="text" name="code" defaultValue={editItem.code} />
            <label>description</label>
            <input
              type="text"
              name="description"
              defaultValue={editItem.description}
            />
            <button className="btn" type="submit">
              Submit Edit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminStatus;
