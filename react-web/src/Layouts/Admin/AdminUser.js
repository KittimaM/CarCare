import React, { useEffect, useState } from "react";
import { GetPermission } from "../Api";
import SidebarAdmin from "./SidebarAdmin";
import AdminCustomer from "./AdminCustomer";
import AdminStaff from "./AdminStaff";

const AdminUser = () => {
  const [staffPermission, setStaffPermission] = useState(null);
  const [customerPermission, setCustomerPermission] = useState();
  const [isSelectedStaff, setIsSelectedStaff] = useState(false);
  const [isSelectedCustomer, setSelectedCustomer] = useState(false);

  useEffect(() => {
    GetPermission().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setStaffPermission(msg["have_staff_access"]);
        setCustomerPermission(msg["have_customer_access"]);
      } else {
        console.log(data);
      }
    });
  }, []);

  const handleSelectedStaff = (event) => {
    event.preventDefault();
    setIsSelectedStaff(true);
    setSelectedCustomer(false);
  };

  const handleSelectedCustomer = (event) => {
    event.preventDefault();
    setSelectedCustomer(true);
    setIsSelectedStaff(false);
  };

  return (
    <>
      <SidebarAdmin />
      <div className="ml-80 mt-16">
        <div className="text-lg bg-yellow-50 mb-5 ">Admin User page </div>
        {staffPermission && staffPermission.includes("1") && (
          <button
            className="btn"
            disabled={isSelectedStaff}
            onClick={handleSelectedStaff}
          >
            Staff
          </button>
        )}
        {customerPermission && customerPermission.includes("1") && (
          <button
            className="btn"
            disabled={isSelectedCustomer}
            onClick={handleSelectedCustomer}
          >
            Customer
          </button>
        )}
        {isSelectedStaff && <AdminStaff permission={staffPermission} />}
        {isSelectedCustomer && (
          <AdminCustomer permission={customerPermission} />
        )}
      </div>
    </>
  );
};

export default AdminUser;
