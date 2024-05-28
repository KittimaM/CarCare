import React, { useEffect, useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import {
  DeleteChannel,
  GetChannel,
  GetPermission,
  PostAddChannel,
  UpdateChannel,
} from "../Api";

const AdminChannel = () => {
  const [openAddChannelForm, setOpenAddChannelForm] = useState(false);
  const [permission, setPermission] = useState();
  const [channel, setChannel] = useState();
  const [editItem, setEditItem] = useState(null);

  const fetchChannel = () => {
    GetChannel().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setChannel(msg);
      } else {
        console.log(data);
      }
    });
  };
  useEffect(() => {
    fetchChannel();
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
    const data = new FormData(event.currentTarget);
    const jsonData = {
      name: data.get("name"),
      description: data.get("description"),
      is_available: data.get("is_available") !== null ? 1 : 0,
    };
    PostAddChannel(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setOpenAddChannelForm(false);
        fetchChannel();
      } else {
        console.log(data);
      }
    });
  };

  const handleSelectEditId = (selectedItem) => {
    setEditItem(selectedItem);
  };

  const handleEditChannel = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      id: editItem.id,
      name: data.get("name"),
      description: data.get("description"),
      is_available: data.get("is_available") !== null ? 1 : 0,
    };
    UpdateChannel(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setEditItem(null);
        fetchChannel();
      } else {
        console.log(data);
      }
    });
  };

  const handleDeleteChannel = (event) => {
    event.preventDefault();
    const jsonData = {
      id: event.target.value,
    };
    DeleteChannel(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchChannel();
      } else {
        console.log(data);
      }
    });
  };
  return (
    <div>
      <SidebarAdmin />
      <div className="ml-80 mt-16">
        <div className="text-lg bg-yellow-100 mb-5 ">Channel</div>
        {permission && permission.includes("2") && (
          <button class="btn" onClick={() => setOpenAddChannelForm(true)}>
            Add Channel
          </button>
        )}
        {channel && (
          <table className="table table-lg">
            <thead>
              <tr>
                <td>name</td>
                <td>description</td>
                <td>is available</td>
                {permission && permission.includes("3") && <td>Edit</td>}
                {permission && permission.includes("4") && <td>Delete</td>}
              </tr>
            </thead>
            <tbody>
              {channel.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
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
        {openAddChannelForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl mb-4">New Channel</h2>
              <form onSubmit={handleAddChannel}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    name="is_available"
                  />
                  <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                    is available
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setOpenAddChannelForm(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {editItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl mb-4">Edit Channel</h2>
              <form onSubmit={handleEditChannel}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    defaultValue={editItem.name}
                    type="text"
                    name="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <input
                    defaultValue={editItem.description}
                    type="text"
                    name="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <input
                    defaultChecked={editItem.is_available == 1}
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    name="is_available"
                  />
                  <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                    is available
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setEditItem(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChannel;
