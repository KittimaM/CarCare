import axios from "axios";

const postApi = async (url, jsonData, isUseToken = false) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (isUseToken) {
      const token = localStorage.getItem("token");
      headers.Authorization = `Bearer ${token}`;
    }
    const response = await axios.post(url, jsonData, { headers });
    const { status, msg } = response.data;
    return { status: status, msg: msg };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getApi = async (url, options = null, isUseToken = true) => {
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
    const response = await axios.get(url, { headers });
    const { status, msg } = response.data;
    return { status: status, msg: msg };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const GetPermission = () => {
  const isUseToken = true;
  return getApi("http://localhost:5000/api/admin/permission", isUseToken);
};

export const GetAllRole = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/admin/role/all"
    );
    const { status, msg } = response.data;
    if (status == "SUCCESS") {
      return msg;
    } else {
      console.log(msg);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const GetAllExpense = () => {
  return getApi("http://localhost:5000/api/admin/expense");
};

export const PostExpense = (jsonData) => {
  return postApi("http://localhost:5000/api/admin/expense", jsonData)
}


export const GetAllBooking = (options = null) => {
  return getApi("http://localhost:5000/api/admin/booking", options);
};

export const PostAddRole = (jsonData) => {
  return postApi("http://localhost:5000/api/admin/role", jsonData);
};

export const PostAddStaffUser = (jsonData) => {
  return postApi("http://localhost:5000/api/admin/user/add", jsonData);
};

export const PostLogin = (jsonData) => {
  return postApi("http://localhost:5000/api/admin/login", jsonData);
};

export const PostUpDateBookingStatus = (jsonData) => {
  return postApi(
    "http://localhost:5000/api/admin/booking/update-status",
    jsonData
  );
};
