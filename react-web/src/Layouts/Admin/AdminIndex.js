import React, { useEffect, useState } from "react";
import { Button } from "../Module";
import { GetPermission } from "../Api";

const AdminIndex = () => {
  const [permission, setPermission] = useState(null);
  useEffect(() => {
    GetPermission().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setPermission(msg);
      } else {
        alert(msg);
      }
    });
  }, []);

  return (
    <div>
      {permission && permission.have_staff_user_access == 1 && (
        <Button to="/admin/user" name="User" />
      )}
      {permission && permission.have_car_size_access == 1 && (
        <Button to="/admin/carsize" name="Car Size" />
      )}
      {permission && permission.have_service_access == 1 && (
        <Button to="/admin/service" name="Service" />
      )}
      {permission && permission.have_booking_access == 1 && (
        <Button to="/admin/booking" name="Booking" />
      )}
      {permission && permission.have_role_access == 1 && (
        <Button to="/admin/role" name="Role" />
      )}
      {permission && permission.have_account_access == 1 && (
        <Button to="/admin/account" name="Account Management" />
      )}
      {permission && permission.have_schedule_access == 1 && (
        <Button to="/admin/schedule" name="Schedule" />
      )}
      {permission && permission.have_payment_access == 1 && (
        <Button to="/admin/payment" name="Payment" />
      )}
      {permission && permission.have_worktable_access == 1 && (
        <Button to="/admin/worktable" name="Work Table" />
      )}
    </div>
  );
};

export default AdminIndex;
