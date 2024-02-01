import axios from "axios";

const initialUrl = "http://localhost:5000/api/";

const putApi = async (url, jsonData, isUseToken = false) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (isUseToken) {
      const token = localStorage.getItem("token");
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.put(initialUrl + url, jsonData, { headers });
    const { status, msg } = response.data;
    return { status: status, msg: msg };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const postApi = async (url, jsonData, isUseToken = false) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (isUseToken) {
      const token = localStorage.getItem("token");
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.post(initialUrl + url, jsonData, { headers });
    const { status, msg } = response.data;
    return { status: status, msg: msg };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const deleteApi = async (url, jsonData, isUseToken = false) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (isUseToken) {
      const token = localStorage.getItem("token");
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.delete(initialUrl + url, {
      headers: headers,
      data: jsonData,
    });
    const { status, msg } = response.data;
    return { status: status, msg: msg };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getApi = async (url, options = null, isUseToken = false) => {
  try {
    let headers = {};
    if (isUseToken) {
      const token = localStorage.getItem("token");
      headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    }
    if (options) {
      headers.params = options;
    }
    const response = await axios.get(initialUrl + url, { headers });
    const { status, msg } = response.data;
    return { status: status, msg: msg };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const GetPermission = () => {
  const isUseToken = true;
  return getApi("admin/permission", null, isUseToken);
};

export const GetAllRole = async () => {
  return getApi("admin/role");
};

export const GetAllExpense = () => {
  return getApi("admin/expense");
};

export const PostAddExpense = (jsonData) => {
  return postApi("admin/expense", jsonData);
};

export const GetAllIncome = () => {
  return getApi("admin/income");
};

export const PostAddIncome = (jsonData) => {
  return postApi("admin/income", jsonData);
};

export const GetAllBooking = (options = null) => {
  return getApi("admin/booking", options);
};

export const PostAddRole = (jsonData) => {
  return postApi("admin/role", jsonData);
};

export const PostAddStaffUser = (jsonData) => {
  return postApi("admin/user/add", jsonData);
};

export const PostLogin = (jsonData) => {
  return postApi("admin/login", jsonData);
};

export const PostUpDateBookingStatus = (jsonData) => {
  return postApi("admin/booking/update-status", jsonData);
};

export const GetAllStaff = () => {
  return getApi("admin/user");
};

export const PostAddDayOff = (jsonData) => {
  return postApi("admin/worktable/add", jsonData);
};

export const GetAllDayOff = () => {
  return getApi("admin/worktable");
};

export const PostUpdateDayOff = (jsonData) => {
  return postApi("admin/worktable/update", jsonData);
};

export const DeleteStaffUser = (jsonData) => {
  return deleteApi("admin/user", jsonData);
};

export const UpdateStaffUser = (jsonData) => {
  return putApi("admin/user", jsonData);
};

export const GetAllCarSize = () => {
  return getApi("admin/carsize");
};

export const PostAddCarSize = (jsonData) => {
  return postApi("admin/carsize", jsonData);
};

export const DeleteCarSize = (jsonData) => {
  return deleteApi("admin/carsize", jsonData);
};

export const UpdateCarSize = (jsonData) => {
  return putApi("admin/carsize", jsonData);
};

export const GetAllService = () => {
  return getApi("admin/service");
};

export const PostAddService = (jsonData) => {
  return postApi("admin/service", jsonData);
};

export const DeleteService = (jsonData) => {
  return deleteApi("admin/service", jsonData);
};

export const UpdateService = (jsonData) => {
  return putApi("admin/service", jsonData);
};

export const DeleteRole = (jsonData) => {
  return deleteApi("admin/role", jsonData);
};

export const UpdateRole = (jsonData) => {
  return putApi("admin/role", jsonData);
};

export const GetCustomerCar = () => {
  const isUseToken = true;
  return getApi("customer/car", null, isUseToken);
};

export const PostAddCustomerCar = (jsonData) => {
  const isUseToken = true;
  return postApi("customer/car", jsonData, isUseToken);
};

export const DeleteCustomerCar = (jsonData) => {
  return deleteApi("customer/car", jsonData);
};

export const UpdateCustomerCar = (jsonData) => {
  return putApi("customer/car", jsonData);
};

export const GetAllCustomerBooking = () => {
  const isUseToken = true;
  return getApi("customer/booking", null, isUseToken);
};

export const DeleteCustomerBooking = (jsonData) => {
  return deleteApi("customer/booking", jsonData);
};

export const PostAddCustomer = (jsonData) => {
  return postApi("customer/register", jsonData);
};

export const PostAddCustomerBooking = (jsonData) => {
  const isUseToken = true;
  return postApi("customer/booking", jsonData, isUseToken);
};

export const PostAddAdminBooking = (jsonData) => {
  const isUseToken = true;
  return postApi("admin/booking", jsonData, isUseToken);
};
