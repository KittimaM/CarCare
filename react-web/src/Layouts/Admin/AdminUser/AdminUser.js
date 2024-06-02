import React, { useEffect, useState } from "react";
import { GetPermission } from "../../Api";
import SidebarAdmin from "../SidebarAdmin";
import AdminCustomer from "./AdminCustomer";
import AdminStaff from "./AdminStaff";
import AdminCustomerCar from "./AdminCustomerCar";

const AdminUser = () => {
  const [staffPermission, setStaffPermission] = useState(null);
  const [customerPermission, setCustomerPermission] = useState();
  const [isSelectedStaff, setIsSelectedStaff] = useState(false);
  const [isSelectedCustomer, setSelectedCustomer] = useState(false);
  const [isSelectedCustomerCar, setIsSelectedCustomerCar] = useState(false);

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
    setIsSelectedCustomerCar(false);
  };

  const handleSelectedCustomer = (event) => {
    event.preventDefault();
    setSelectedCustomer(true);
    setIsSelectedStaff(false);
    setIsSelectedCustomerCar(false);
  };

  const handleSelectedCustomerCar = (event) => {
    event.preventDefault();
    setIsSelectedCustomerCar(true);
    setSelectedCustomer(false);
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
          <div>
            <button
              className="btn"
              disabled={isSelectedCustomer}
              onClick={handleSelectedCustomer}
            >
              Customer
            </button>
            <button
              className="btn"
              disabled={isSelectedCustomerCar}
              onClick={handleSelectedCustomerCar}
            >
              Customer's Car
            </button>
          </div>
        )}
        {isSelectedStaff && <AdminStaff permission={staffPermission} />}
        {isSelectedCustomer && (
          <AdminCustomer permission={customerPermission} />
        )}
        {isSelectedCustomerCar && (
          <AdminCustomerCar permission={customerPermission} />
        )}
      </div>
    </>
  );
};

export default AdminUser;
