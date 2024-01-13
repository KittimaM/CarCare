import React, { useEffect, useState } from "react";
import { Button } from "../Module";
import { GetPermission } from "../Api";

const AdminIndex = () => {
  const [permission, setPermission] = useState();
  useEffect(() => {
    GetPermission().then((data) => setPermission(data));
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
    </div>
  );
};

export default AdminIndex;
