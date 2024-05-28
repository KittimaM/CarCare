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
    if (msg == "token expired") {
      localStorage.removeItem("token");
    }
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
    if (msg == "token expired") {
      localStorage.removeItem("token");
    }
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
    if (msg == "token expired") {
      localStorage.removeItem("token");
    }
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
    if (msg == "token expired") {
      localStorage.removeItem("token");
    }
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

export const GetAllBooking = (options = null) => {
  return getApi("admin/booking", options);
};

export const PostAddRole = (jsonData) => {
  return postApi("admin/role", jsonData);
};

export const PostAddStaffUser = (jsonData) => {
  return postApi("admin/user", jsonData);
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

export const PostAddPaymentType = (jsonData) => {
  return postApi("admin/paymenttype", jsonData);
};

export const GetAllPaymentType = () => {
  return getApi("admin/paymenttype");
};

export const UpdatePaymentType = (jsonData) => {
  return putApi("admin/paymenttype", jsonData);
};

export const DeletePaymentType = (jsonData) => {
  return deleteApi("admin/paymenttype", jsonData);
};

export const GetAllAccount = () => {
  return getApi("admin/account");
};

export const PostAddAccount = (jsonData) => {
  return postApi("admin/account", jsonData);
};

export const DeleteAccount = (jsonData) => {
  return deleteApi("admin/account", jsonData);
};

export const UpdateAccount = (jsonData) => {
  return putApi("admin/account", jsonData);
};

export const GetAllOnLeave = () => {
  return getApi("admin/onleave");
};

export const PostAddOnLeave = (jsonData) => {
  return postApi("admin/onleave", jsonData);
};

export const DeleteOnLeave = (jsonData) => {
  return deleteApi("admin/onleave", jsonData);
};

export const UpdateOnLeave = (jsonData) => {
  return putApi("admin/onleave", jsonData);
};

export const ApproveOnLeave = (jsonData) => {
  const isUseToken = true;
  return putApi("admin/onleave/approve", jsonData, isUseToken);
};

export const GetOnLeavePersonal = () => {
  const isUseToken = true;
  return getApi("admin/onleave/personal", null, isUseToken);
};

export const PostAddOnLeavePersonal = (jsonData) => {
  const isUseToken = true;
  return postApi("admin/onleave/personal", jsonData, isUseToken);
};

export const GetAllDayOff = () => {
  return getApi("admin/dayoff");
};

export const UpdateDayOff = (jsonData) => {
  return putApi("admin/dayoff", jsonData);
};

export const GetAllOnLeaveType = () => {
  return getApi("admin/onleave-type");
};

export const DeleteOnLeaveType = (jsonData) => {
  return deleteApi("admin/onleave-type", jsonData);
};

export const UpdateOnLeaveType = (jsonData) => {
  return putApi("admin/onleave-type", jsonData);
};

export const AddOnLeaveType = (jsonData) => {
  return postApi("admin/onleave-type", jsonData);
};

export const GetAllProvince = () => {
  return getApi("admin/province");
};

export const GetCustomerProfile = () => {
  const isUseToken = true;
  return getApi("customer/profile", null, isUseToken);
};

export const UpdateCustomerProfile = (jsonData) => {
  const isUseToken = true;
  return putApi("customer/profile", jsonData, isUseToken);
};

export const GetChannel = () => {
  return getApi("admin/channel");
};

export const PostAddChannel = (jsonData) => {
  return postApi("admin/channel", jsonData);
};

export const DeleteChannel = (jsonData) => {
  return deleteApi("admin/channel", jsonData);
};

export const UpdateChannel = (jsonData) => {
  return putApi("admin/channel", jsonData);
};

export const GetAllStatus = () => {
  return getApi("admin/status");
};

export const PostAddStatus = (jsonData) => {
  return postApi("admin/status", jsonData);
};

export const UpdateStatus = (jsonData) => {
  return putApi("admin/status", jsonData);
};

export const DeleteStatus = (jsonData) => {
  return deleteApi("admin/status", jsonData);
};

export const GetAllStatusGroup = () => {
  return getApi("admin/status-group");
};

export const PostAddStatusGroup = (jsonData) => {
  return postApi("admin/status-group", jsonData);
};

export const UpdateStatusGroup = (jsonData) => {
  return putApi("admin/status-group", jsonData);
};

export const DeleteStatusGroup = (jsonData) => {
  return deleteApi("admin/status-group", jsonData);
};
