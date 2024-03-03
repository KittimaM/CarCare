import React, { useEffect, useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import {
  GetOnLeavePersonal,
  GetPermission,
  UpdateOnLeave,
  DeleteOnLeave,
  PostAddOnLeavePersonal,
} from "../Api";

const AdminOnLeavePersonal = () => {
  const [permission, setPermission] = useState();
  const [onLeaveList, setOnLeaveList] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchOnLeaveList = () => {
    GetOnLeavePersonal().then((data) => {
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
        setPermission(msg["have_on_leave_personal_access"]);
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
      date: data.get("date"),
      reason: data.get("reason"),
    };
    PostAddOnLeavePersonal(jsonData).then((data) => {
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
  return (
    <>

    <SidebarAdmin />
    <div className="ml-80 mt-16">
    <div className="text-lg bg-yellow-100 mb-5 "> On Leave page</div>

      
      {permission && permission.includes("2") && (
        <form onSubmit={handleAddOnLeave}>
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
        <table className="table table-lg">
          <thead>
            <tr>
              <td>date</td>
              <td>reason</td>
              <td>status</td>
              {permission && permission.includes("3") && <td>Edit</td>}
              {permission && permission.includes("4") && <td>Delete</td>}
            </tr>
          </thead>
          <tbody>
            {onLeaveList.map((item) => (
              <tr key={item.id}>
                <td>{item.date.split("T")[0]}</td>
                <td>{item.reason}</td>
                <td>{item.is_approved == 1 ? "Approved" : "Pending"}</td>
                {permission && permission.includes("3") && (
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
                {permission && permission.includes("4") && (
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {permission && permission.includes("3") && editItem && (
        <form onSubmit={handleEditOnLeave}>
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
    </>
    
  );
};

export default AdminOnLeavePersonal;
