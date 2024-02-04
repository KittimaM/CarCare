import React, { useEffect, useState } from "react";
import {
  ApproveOnLeave,
  DeleteOnLeave,
  GetAllDayOff,
  GetAllOnLeave,
  GetAllStaff,
  PostAddDayOff,
  PostAddOnLeave,
  PostUpdateDayOff,
  UpdateOnLeave,
} from "../Api";

const AdminWorkTable = () => {
  const [staff, setStaff] = useState([]);
  const [onLeaveList, setOnLeaveList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [staffWithDayOff, setStaffWithDayOff] = useState([]);
  const [staffWithOutDayOff, setStaffWithOutDayOff] = useState([]);

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
    // GetAllStaff().then((data) => {
    //   const { status, msg } = data;
    //   if (status == "SUCCESS") {
    //     setStaff(msg);
    //     GetAllDayOff().then((response) => {
    //       if (response.status == "SUCCESS") {
    //         const data = response.msg;
    //         const haveDayOff = data.map((item) => item.staff_id);
    //         const newStaffWithOutDayOff = msg.filter(
    //           (item) => !haveDayOff.includes(item.id)
    //         );
    //         const newStaffWithDayOff = msg.filter((item) =>
    //           haveDayOff.includes(item.id)
    //         );
    //         setStaffWithDayOff(newStaffWithDayOff);
    //         setStaffWithOutDayOff(newStaffWithOutDayOff);
    //       } else {
    //         console.log("status : ", status, " , msg : ", msg);
    //       }
    //     });
    //   } else {
    //     console.log("status : ", status, " , msg : ", msg);
    //   }
    // });
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

  const handleSubmitAddDayOff = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      staff_id: data.get("staff"),
      day_off: data.get("day_off"),
    };
    PostAddDayOff(jsonData).then((data) => console.log(data));
  };

  const handleSubmitUpdateDayOff = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      staff_id: data.get("staff"),
      day_off: data.get("day_off"),
    };
    PostUpdateDayOff(jsonData).then((data) => console.log(data));
  };

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
      is_approved: editItem.is_approved,
      approved_by_id: editItem.approved_by_id,
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
      {staff && (
        <div>
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
          {/* {selectedDate && (
            <form>
              <select name="staff">
                {staff.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button type="submit">Submit</button>
            </form>
          )}
          {staffWithOutDayOff ? (
            <form onSubmit={handleSubmitAddDayOff}>
              <label>Set Day-off</label>
              <select name="day_off">
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
              <label>Set Staff</label>
              <select name="staff">
                {staffWithOutDayOff.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button type="submit">Submit</button>
            </form>
          ) : (
            <p>All staff set day off already</p>
          )}
          {staffWithDayOff && (
            <form onSubmit={handleSubmitUpdateDayOff}>
              <label>Update Day-off</label>
              <select name="day_off">
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
              <label>Set Staff</label>
              <select name="staff">
                {staffWithDayOff.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button type="submit">Submit</button>
            </form>
          )} */}
        </div>
      )}
      {onLeaveList && (
        <table>
          <thead>
            <tr>
              <td>staff_id</td>
              <td>date</td>
              <td>reason</td>
              <td>Edit</td>
              <td>Delete</td>
              <td>Approve</td>
            </tr>
          </thead>
          <tbody>
            {onLeaveList.map((item) => (
              <tr>
                <td>{item.staff_id}</td>
                <td>{item.date.split("T")[0]}</td>
                <td>{item.reason}</td>
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
                <td>
                  <button
                    className="btn"
                    onClick={handleApprovedOnLeave}
                    value={item.id}
                    disabled={item.is_approved == 1}
                  >
                    {item.is_approved == 1 ? "Approved" : "Click to approve"}
                  </button>
                </td>
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

export default AdminWorkTable;
