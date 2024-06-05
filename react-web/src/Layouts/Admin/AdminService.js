import React, { useEffect, useState } from "react";
import {
  DeleteService,
  GetAllCarSize,
  GetAllService,
  PostAddService,
  UpdateService,
} from "../Api";
import URLList from "../Url/URLList";
import Notification from "../Notification/Notification";

const AdminService = ({ permission }) => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [carSizeList, setCarSizeList] = useState();
  const [serviceList, setServiceList] = useState();
  const [editItem, setEditItem] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const [notificationStatus, setNotificationStatus] = useState();

  const fetchService = () => {
    GetAllService(URLList.AdminService).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setServiceList(msg);
      } else if (status == "NO DATA") {
        setServiceList(null);
      } else {
        console.log(data);
      }
      setErrors([]);
    });
  };

  useEffect(() => {
    fetchService();
    GetAllCarSize(URLList.AdminCarSizeURL).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setCarSizeList(msg);
      } else {
        console.log(data);
      }
    });
  }, []);

  const handleShowNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage(null);
    }, 3000);
  };

  const validateData = (data) => {
    let errorMsg = {};
    if (data.get("service") == null || data.get("service") == "") {
      errorMsg["service"] = "please insert data";
    }
    if (data.get("used_time") == null || data.get("used_time") == "") {
      errorMsg["used_time"] = "please insert data";
    }
    if (data.get("price") == null || data.get("price") == "") {
      errorMsg["price"] = "please insert data";
    }
    if (Object.entries(errorMsg).length !== 0) {
      return { status: "ERROR", msg: errorMsg };
    } else {
      return {
        status: "SUCCESS",
        msg: "",
      };
    }
  };

  const handleAdminAddService = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const validatedErrors = validateData(data);
    const { status, msg } = validatedErrors;
    if (status == "ERROR") {
      setErrors(msg);
    } else {
      const jsonData = {
        service: data.get("service"),
        description: data.get("description"),
        car_size_id: data.get("car_size_id"),
        used_time: data.get("used_time"),
        price: data.get("price"),
        is_available: data.get("is_available") !== null ? 1 : 0,
      };
      PostAddService(URLList.AdminService, jsonData).then((data) => {
        const { status, msg } = data;
        if (status == "SUCCESS") {
          setNotificationMessage(`success add service = ${jsonData.service}`);
          setNotificationStatus(status);
          handleShowNotification();

          setOpenAddForm(false);
          fetchService();
        } else {
          let errorMsg = {};
          if (msg.code == "ER_DUP_ENTRY") {
            errorMsg["service"] = "duplicated";
            setErrors(errorMsg);
          }
          console.log(data);
        }
      });
    }
  };

  const handleSelectEditId = (selectedItem) => {
    setEditItem(selectedItem);
  };

  const handleEditService = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const validatedErrors = validateData(data);
    const { status, msg } = validatedErrors;
    if (status == "ERROR") {
      setErrors(msg);
    } else {
      const jsonData = {
        id: editItem.id,
        service: data.get("service"),
        description: data.get("description"),
        car_size_id: data.get("car_size_id"),
        used_time: data.get("used_time"),
        price: data.get("price"),
        is_available: data.get("is_available") !== null ? 1 : 0,
      };
      UpdateService(URLList.AdminService, jsonData).then((data) => {
        const { status, msg } = data;
        if (status == "SUCCESS") {
          setNotificationMessage(`success edit carsize = ${jsonData.service}`);
          setNotificationStatus(status);
          handleShowNotification();
          setEditItem(null);

          fetchService();
        } else {
          let errorMsg = {};
          if (msg.code == "ER_DUP_ENTRY") {
            errorMsg["service"] = "duplicated";
            setErrors(errorMsg);
          }
          console.log(data);
        }
      });
    }
  };

  const handleDeleteService = (event) => {
    event.preventDefault();
    const jsonData = {
      id: event.target.value,
    };
    DeleteService(URLList.AdminService, jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setNotificationMessage("success deleted");
        setNotificationStatus(status);
        handleShowNotification();
        fetchService();
      } else {
        console.log(data);
      }
    });
  };

  return (
    <>
      <div className="ml-80 mt-16">
        <div className="text-lg bg-yellow-100 mb-5 "> Service page</div>
        {showNotification && (
          <Notification
            message={notificationMessage}
            type={notificationStatus}
          />
        )}
        {permission && permission.includes("2") && (
          <button class="btn" onClick={() => setOpenAddForm(true)}>
            Add Service
          </button>
        )}
        {carSizeList &&
          carSizeList.map(
            (carSize) =>
              carSize.is_available == 1 && (
                <div>
                  {carSize.size} - {carSize.description}
                  <table className="table table-lg">
                    <thead>
                      <tr>
                        <td>service</td>
                        <td>description</td>
                        <td>used time(mins)</td>
                        <td>price(baht)</td>
                        <td>is available</td>
                        {permission && permission.includes("3") && (
                          <td>Edit</td>
                        )}
                        {permission && permission.includes("4") && (
                          <td>Delete</td>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {serviceList &&
                        serviceList.map(
                          (service) =>
                            service.car_size_id == carSize.id && (
                              <tr key={service.id}>
                                <td>{service.service}</td>
                                <td>{service.description}</td>
                                <td>{service.used_time}</td>
                                <td>{service.price}</td>
                                <td>
                                  {service.is_available == 1
                                    ? "available"
                                    : "not available"}
                                </td>
                                {permission && permission.includes("3") && (
                                  <td>
                                    <button
                                      className="btn"
                                      onClick={() =>
                                        handleSelectEditId(service)
                                      }
                                      value={service.id}
                                    >
                                      Edit
                                    </button>
                                  </td>
                                )}
                                {permission && permission.includes("4") && (
                                  <td>
                                    <button
                                      className="btn"
                                      onClick={handleDeleteService}
                                      value={service.id}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                )}
                              </tr>
                            )
                        )}
                    </tbody>
                  </table>
                </div>
              )
          )}
        {openAddForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl mb-4">New Service</h2>
              <form onSubmit={handleAdminAddService}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Service
                  </label>
                  <input
                    type="text"
                    name="service"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.service && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.service}
                    </p>
                  )}
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Car Size
                  </label>
                  <select
                    name="car_size_id"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {carSizeList &&
                      carSizeList.map(
                        (carSize) =>
                          carSize.is_available == 1 && (
                            <option key={carSize.id} value={carSize.id}>
                              {carSize.size}
                            </option>
                          )
                      )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Used Time
                  </label>
                  <input
                    type="number"
                    name="used_time"
                    min="0"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.used_time && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.used_time}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    price
                  </label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.price && (
                    <p className="mt-1 text-red-500 text-sm">{errors.price}</p>
                  )}
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
                    onClick={() => {
                      setOpenAddForm(false);
                    }}
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
              <h2 className="text-2xl mb-4">New Service</h2>
              <form onSubmit={handleEditService}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Service
                  </label>
                  <input
                    defaultValue={editItem.service}
                    type="text"
                    name="service"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.service && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.service}
                    </p>
                  )}
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
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Car Size
                  </label>
                  <select
                    defaultValue={editItem.car_size_id}
                    name="car_size_id"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {carSizeList &&
                      carSizeList.map(
                        (carSize) =>
                          carSize.is_available == 1 && (
                            <option key={carSize.id} value={carSize.id}>
                              {carSize.size}
                            </option>
                          )
                      )}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Used Time
                  </label>
                  <input
                    defaultValue={editItem.used_time}
                    type="number"
                    name="used_time"
                    min="0"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.used_time && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.used_time}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    price
                  </label>
                  <input
                    defaultValue={editItem.price}
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.price && (
                    <p className="mt-1 text-red-500 text-sm">{errors.price}</p>
                  )}
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
                    onClick={() => {
                      setEditItem(null);
                    }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminService;
