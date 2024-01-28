import React, { useEffect, useState } from "react";
import {
  DeleteStaffUser,
  GetAllStaff,
  GetAllRole,
  UpdateStaffUser,
} from "../Api";
import { Button } from "../Module";

const AdminUser = () => {
  const [user, setUser] = useState(null);
  const [allRole, setAllRole] = useState();
  const [editItem, setEditItem] = useState(null);
  useEffect(() => {
    fetchUser();
    fetchRole();
  }, []);

  const fetchUser = () => {
    GetAllStaff().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setUser(msg);
      } else {
        console.log("status : ", status, " , msg: ", msg);
      }
    });
  };

  const fetchRole = () => {
    GetAllRole().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setAllRole(msg);
      } else {
        console.log("status : ", status, " , msg: ", msg);
      }
    });
  };

  const handleDeleteUser = (event) => {
    event.preventDefault();
    const jsonData = {
      id: event.target.value,
    };
    DeleteStaffUser(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchUser();
      } else {
        console.log("status : ", status, " , msg: ", msg);
      }
    });
  };

  const handleSelectEditId = (selectedItem) => {
    setEditItem(selectedItem);
  };

  const handleEditUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [role_id, role] = data.get("role").split(",");
    const jsonData = {
      id: editItem.id,
      name: data.get("name"),
      username: data.get("username"),
      password: data.get("password"),
      role_id: role_id,
      role: role,
    };
    UpdateStaffUser(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchUser();
        setEditItem(null);
      } else {
        console.log("status : ", status, " , msg: ", msg);
      }
    });
  };

  return (
    <div>
      <Button to="/admin/register" name="register" />
      {user && (
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>username</td>
              <td>name</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {user.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.name}</td>
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
        <form onSubmit={handleEditUser}>
          <label name="username">username</label>
          <input type="text" name="username" defaultValue={editItem.username} />
          <label name="name">name</label>
          <input type="text" name="name" defaultValue={editItem.name} />
          <label name="password">password</label>
          <input type="password" name="password" required />
          {
            <select
              name="role"
              defaultValue={[editItem.role_id, editItem.role]}
            >
              {allRole.map((item) => (
                <option value={[item.id, item.role]} key={item.id}>
                  {item.role}
                </option>
              ))}
            </select>
          }
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminUser;
