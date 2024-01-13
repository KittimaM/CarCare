import React, { useEffect, useState } from "react";
import { GetAllRole, PostAddRole } from "../Api";

const AdminRole = () => {
  const [role, setRole] = useState();
  const [roleAccess, setRoleAccess] = useState();

  useEffect(() => {
    GetAllRole().then((data) => {
      setRole(data);
      let defaultAccess = [];
      Object.keys(data[0]).map((item) => {
        if (item !== "id" && item !== "role") {
          defaultAccess.push({ label: item, isEnable: 0 });
        }
      });
      setRoleAccess(defaultAccess);
    });
  }, []);

  const handleEnableAccess = (event) => {
    event.preventDefault();
    roleAccess.map((item) => {
      if (item.label == event.target.name) {
        item["isEnable"] = 1;
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("roleAccess : ", roleAccess);

    const data = new FormData(event.currentTarget);
    let accessSetting = {};
    roleAccess.map((item) => (accessSetting[item.label] = item.isEnable));
    const jsonData = {
      role: data.get("role"),
      ...accessSetting,
    };

    PostAddRole(jsonData).then((data) => console.log(data));
  };

  return (
    <div>
      {roleAccess && (
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Add New Role</button>
        </form>
      )}
      {role &&
        role.map((item) => (
          <p>
            {item.id}, {item.role}
          </p>
        ))}
    </div>
  );
};

export default AdminRole;
