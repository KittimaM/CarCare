import React, { useEffect, useState } from "react";
import { GetAllBooking, PostUpDateBookingStatus } from "../Api";

const AdminSchedule = () => {
  const [todaySchedule, setTodaySchedule] = useState([]);

  useEffect(() => {
    GetAllBooking(
      "WHERE DATE(start_service_datetime) = CURRENT_DATE ORDER BY start_service_datetime"
    ).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setTodaySchedule(msg);
      } else {
        console.log("status : ", status, " , msg : ", msg);
      }
    });
  }, []);

  const handleUpdateStatus = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const [bookingId, processing_status] = value.split(",");
    let status = "";
    switch (processing_status) {
      case "Waiting":
        status = "Service in process";
        break;

      case "Service in process":
        status = "Finish Service";
        break;

      case "Finish Service":
        status = "Paid";
        break;

      case "Paid":
        status = "Done";
        break;
      case "Cancel":
        status = "Cancel";
        break;
    }

    const jsonData = {
      processing_status: status,
      bookingId: bookingId,
    };
    PostUpDateBookingStatus(jsonData).then((updatedResponse) => {
      if (updatedResponse.status == "SUCCESS") {
        GetAllBooking(
          "WHERE DATE(start_service_datetime) = CURRENT_DATE ORDER BY start_service_datetime"
        ).then((data) => {
          const { status, msg } = data;
          if (status == "SUCCESS") {
            setTodaySchedule(msg);
          } else {
            console.log("status : ", status, " , msg : ", msg);
          }
        });
      } else {
        console.log(
          "status : ",
          updatedResponse.status,
          " , msg : ",
          updatedResponse.msg
        );
      }
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>car_no</td>
          <td>date</td>
          <td>time</td>
          <td>status</td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {todaySchedule &&
          todaySchedule.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.car_no}</td>
              <td>{item.start_service_datetime.split("T")[0]}</td>
              <td>{item.start_service_datetime.split("T")[1]}</td>
              <td>{item.processing_status}</td>
              <td>
                {item.processing_status == "Waiting" && (
                  <button
                    onClick={handleUpdateStatus}
                    value={[item.id, item.processing_status]}
                  >
                    Start Service
                  </button>
                )}
                {item.processing_status == "Service in process" && (
                  <button
                    onClick={handleUpdateStatus}
                    value={[item.id, item.processing_status]}
                  >
                    Finish Service
                  </button>
                )}
                {item.processing_status == "Finish Service" && (
                  <button
                    onClick={handleUpdateStatus}
                    value={[item.id, item.processing_status]}
                  >
                    Pay
                  </button>
                )}
                {item.processing_status == "Paid" && <p>Done</p>}
                {item.processing_status == "Cancel" && <p>Cancel</p>}
              </td>
              {item.processing_status == "Waiting" && (
                <td>
                  <button
                    onClick={handleUpdateStatus}
                    value={[item.id, "Cancel"]}
                  >
                    Cancel
                  </button>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AdminSchedule;
