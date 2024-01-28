import React, { useEffect, useState } from "react";
import { DeleteRole, GetAllRole, PostAddRole, UpdateRole } from "../Api";

const AdminRole = () => {
  const [role, setRole] = useState();
  const [roleAccess, setRoleAccess] = useState();
  const [accessLabel, setAccessLabel] = useState();
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchRole();
  }, []);
  const fetchRole = () => {
    GetAllRole().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setRole(msg);
        let defaultAccess = [];
        let label = [];
        Object.keys(msg[0]).map((item) => {
          if (item !== "id" && item !== "role") {
            defaultAccess.push({ label: item, isEnable: 0 });
            label.push(item);
          }
        });
        setAccessLabel(label);
        setRoleAccess(defaultAccess);
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
    });
  };
  const handleEnableAccess = (event) => {
    event.preventDefault();
    roleAccess.map((item) => {
      if (item.label == event.target.name) {
        item["isEnable"] = 1;
      }
    });
  };

  const handleSubmitAddRole = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let accessSetting = {};
    roleAccess.map((item) => (accessSetting[item.label] = item.isEnable));
    const jsonData = {
      role: data.get("role"),
      ...accessSetting,
    };

    PostAddRole(jsonData).then((data) => console.log(data));
  };

  const handleSelectEditId = (selectedItem) => {
    setEditItem(selectedItem);
  };

  const handleEditRoleAccess = (event) => {
    event.preventDefault();
    const { checked, name } = event.target;
    editItem[name] = checked ? 1 : 0;
  };

  const handleEditRole = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      id: editItem.id,
      role: data.get("role"),
      ...editItem,
    };
    UpdateRole(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setEditItem(null);
        fetchRole();
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
    });
  };

  const handleDeleteRole = (event) => {
    event.preventDefault();
    const jsonData = {
      id: event.target.value,
    };
    DeleteRole(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchRole();
      } else {
        console.log("status : ", status, ", msg: ", msg);
      }
    });
  };

  return (
    <div>
      {roleAccess && (
        <form onSubmit={handleSubmitAddRole}>
          <label name="role"> role</label>
          <input type="text" name="role" />
          {roleAccess.map((item) => (
            <div>
              <input
                type="checkbox"
                name={item.label}
                value={item.isEnable}
                onChange={handleEnableAccess}
              />
              <label>{item.label}</label>
            </div>
          ))}
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      )}
      {role && (
        <table>
          <thead>
            <tr>
              <td>id</td>
              <td>role</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {role.map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>{item.role}</td>
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
                    onClick={handleDeleteRole}
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
        <form onSubmit={handleEditRole}>
          <label name="role"> role</label>
          <input type="text" name="role" defaultValue={editItem.role} />
          {accessLabel.map((item) => (
            <div>
              <input
                type="checkbox"
                name={item}
                // checked={editItem[item]}
                onChange={handleEditRoleAccess}
                defaultChecked={editItem[item]}
              />
              <label>{item}</label>
            </div>
          ))}
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminRole;
