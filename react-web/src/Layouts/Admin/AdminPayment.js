import React, { useEffect, useState } from "react";
import { GetAllBooking } from "../Api";

const AdminPayment = () => {
  const [paidList, setPaidList] = useState([]);
  useEffect(() => {
    GetAllBooking('WHERE processing_status = "Paid"').then((response) => {
      const { status, msg } = response;
      if (status == "SUCCESS") {
        setPaidList(msg);
      } else {
        console.log("status : ", status, " , msg: ", msg);
      }
    });
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>car_no</td>
          <td>date</td>
          <td>time</td>
          <td>service_price</td>
        </tr>
      </thead>
      <tbody>
        {paidList &&
          paidList.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.car_no}</td>
              <td>{item.start_service_datetime.split("T")[0]}</td>
              <td>{item.start_service_datetime.split("T")[1]}</td>
              <td>{item.service_price}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AdminPayment;
