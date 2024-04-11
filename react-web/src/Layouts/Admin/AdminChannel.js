import React, { useEffect, useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import { GetChannel, GetPermission } from "../Api";

const AdminChannel = () => {
  const [channel, setChannel] = useState([]);
  const [permission, setPermission] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isAddChannel, setIsAddChannel] = useState(false);

  useEffect(() => {
    GetChannel().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setChannel(msg);
      } else {
        console.log(data);
      }
    });
    GetPermission().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setPermission(msg["have_channel_access"]);
      } else {
        console.log(data);
      }
    });
  }, []);

  const handleAddChannel = (event) => {
    event.preventDefault();
    setIsAddChannel(true);
  };

  const addChannel = () => {
    return (
      <form onSubmit={handleAddChannel}>
        <label>name</label>
        <input type="text" />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    );
  };

  const handleSelectEditId = (selectedItem) => {
    setEditItem(selectedItem);
  };

  const handleEditChannel = (event) => {
    event.preventDefault();
  };

  const editChannel = () => {
    return (
      <form onSubmit={handleEditChannel}>
        <label>name</label>
        <input type="text" defaultValue={editItem.name} />
        <button type="submit" className="btn">
          submit
        </button>
      </form>
    );
  };

  const handleDeleteChannel = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <SidebarAdmin />
      <div className="ml-80 mt-16">
        <div className="text-lg bg-yellow-100 mb-5 "> Channel Page</div>
        {channel && (
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>use_for</th>
                <th>available</th>
                {permission && permission.includes("3") && <td>Edit</td>}
                {permission && permission.includes("4") && <td>Delete</td>}
              </tr>
            </thead>
            <tbody>
              {channel.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.use_for}</td>
                  <td>{item.is_available}</td>
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
                        onClick={handleDeleteChannel}
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
        {permission && permission.includes("2") && (
          <button className="btn" onClick={handleAddChannel}>
            Add channel
          </button>
        )}
        {isAddChannel && addChannel()}
        {permission && permission.includes("3") && editItem && editChannel()}
      </div>
    </>
  );
};

export default AdminChannel;
