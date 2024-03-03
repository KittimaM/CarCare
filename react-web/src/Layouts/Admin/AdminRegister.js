import React, { useEffect, useState } from "react";
import { GetAllRole, PostAddStaffUser } from "../Api";
import SidebarAdmin from "./SidebarAdmin";

const AdminRegister = () => {
  const [allRole, setAllRole] = useState();
  const handleRegister = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const [role_id, role] = data.get("role").split(",");
    const jsonData = {
      name: data.get("name"),
      username: data.get("username"),
      password: data.get("password"),
      role_id: role_id,
      role: role,
    };
    PostAddStaffUser(jsonData).then((data) => console.log(data));
  };
  useEffect(() => {
    GetAllRole().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setAllRole(msg);
      } else {
        console.log(data);
      }
    });
  }, []);

  return (
    <>
      <SidebarAdmin />

      <div className="ml-80 mt-16">
        {allRole && (
          <form onSubmit={handleRegister}>
            <label name="username">username</label>
            <input type="text" name="username" />
            <label name="name">name</label>
            <input type="text" name="name" />
            <label name="password">password</label>
            <input type="password" name="password" />
            {
              <select name="role">
                {allRole.map((item) => (
                  <option value={[item.id, item.role]} key={item.id}>
                    {item.role}
                  </option>
                ))}
              </select>
            }
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  );
};

export default AdminRegister;
