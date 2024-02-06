import React, { useEffect, useState } from "react";
import {
  ApproveOnLeave,
  DeleteOnLeave,
  GetAllOnLeave,
  GetAllStaff,
  PostAddOnLeave,
  UpdateOnLeave,
  GetPermission,
} from "../Api";

const AdminOnLeave = () => {
  const [staff, setStaff] = useState([]);
  const [onLeaveList, setOnLeaveList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [permission, setPermission] = useState();

  const fetchOnLeaveList = () => {
    GetAllOnLeave().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setOnLeaveList(msg);
      } else {
        console.log(data);
      }
    });
  };

  useEffect(() => {
    GetPermission().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setPermission(msg);
      } else {
        alert(msg);
      }
    });
    GetAllStaff().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setStaff(msg);
      } else {
        console.log(data);
      }
    });
    fetchOnLeaveList();
  }, []);

  const handleAddOnLeave = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      staff_id: data.get("staff_id"),
      date: data.get("date"),
      reason: data.get("reason"),
    };
    PostAddOnLeave(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchOnLeaveList();
      } else {
        console.log(data);
      }
    });
  };

  const handleSelectEditId = (selectedItem) => {
    setEditItem(selectedItem);
  };

  const handleEditOnLeave = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      id: editItem.id,
      staff_id: data.get("staff_id"),
      date:
        data.get("date").length == 0
          ? editItem.date.split("T")[0]
          : data.get("date"),
      reason: data.get("reason"),
    };

    UpdateOnLeave(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setEditItem(null);
        fetchOnLeaveList();
      } else {
        console.log(data);
      }
    });
  };

  const handleDeleteOnLeave = (event) => {
    event.preventDefault();
    const jsonData = {
      id: event.target.value,
    };
    DeleteOnLeave(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchOnLeaveList();
      } else {
        console.log(data);
      }
    });
  };

  const handleApprovedOnLeave = (event) => {
    event.preventDefault();
    const jsonData = {
      id: event.target.value,
    };
    ApproveOnLeave(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchOnLeaveList();
      } else {
        console.log(data);
      }
    });
  };

  return (
    <div>
      {staff && permission && permission.have_on_leave_list_access >= 2 && (
        <form onSubmit={handleAddOnLeave}>
          <label>Staff</label>
          <select name="staff_id">
            {staff.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <lable>Date</lable>
          <input type="date" name="date" />
          <label>Reason</label>
          <input type="text" name="reason" />
          <button className="btn" type="submit">
            Submit OnLeave
          </button>
        </form>
      )}
      {onLeaveList && (
        <table>
          <thead>
            <tr>
              <td>staff_id</td>
              <td>date</td>
              <td>reason</td>
              <td>status</td>
              {permission && permission.have_on_leave_list_access >= 3 && (
                <td>Edit</td>
              )}
              {permission && permission.have_on_leave_list_access == 4 && (
                <td>Delete</td>
              )}
              {permission && permission.have_right_to_approve_on_leave == 1 && (
                <td>Approve</td>
              )}
            </tr>
          </thead>
          <tbody>
            {onLeaveList.map((item) => (
              <tr>
                <td>{item.staff_id}</td>
                <td>{item.date.split("T")[0]}</td>
                <td>{item.reason}</td>
                <td>{item.is_approved == 1 ? "Approved" : "Pending"}</td>
                {permission && permission.have_on_leave_list_access >= 3 && (
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleSelectEditId(item)}
                      value={item.id}
                      disabled={item.is_approved == 1}
                    >
                      Edit
                    </button>
                  </td>
                )}
                {permission && permission.have_on_leave_list_access == 4 && (
                  <td>
                    <button
                      className="btn"
                      onClick={handleDeleteOnLeave}
                      value={item.id}
                      disabled={item.is_approved == 1}
                    >
                      Delete
                    </button>
                  </td>
                )}
                {permission &&
                  permission.have_right_to_approve_on_leave == 1 && (
                    <td>
                      <button
                        className="btn"
                        onClick={handleApprovedOnLeave}
                        value={item.id}
                        disabled={item.is_approved == 1}
                      >
                        {item.is_approved == 1
                          ? "Approved"
                          : "Click to approve"}
                      </button>
                    </td>
                  )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editItem && (
        <form onSubmit={handleEditOnLeave}>
          <label>Staff</label>
          <select name="staff_id" defaultValue={editItem.staff_id}>
            {staff.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <lable>Date</lable>
          <input type="date" name="date" defaultValue={editItem.date} />
          <label>Reason</label>
          <input type="text" name="reason" defaultValue={editItem.reason} />
          <button className="btn" type="submit">
            Submit Edit
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminOnLeave;
