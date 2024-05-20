import React, { useEffect, useState } from "react";
import SidebarAdmin from "./SidebarAdmin";
import { Button } from "../Module";
import { GetPermission } from "../Api";

const AdminMasterTable = () => {
  const [permission, setPermission] = useState(null);
  useEffect(() => {
    GetPermission().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setPermission(msg);
      } else {
        console.log(data);
      }
    });
  }, []);
  return (
    <div>
      <SidebarAdmin />
      <div className="ml-80 mt-16">
        <div className="text-lg bg-yellow-100 mb-5">Master Table</div>
        {permission &&
          permission["have_on_leave_type_access"].includes("1") && (
            <Button to="/admin/onleave-type" name="onleave type"></Button>
          )}
        {permission && permission["have_payment_type_access"].includes("1") && (
          <Button to="/admin/paymenttype" name="payment type"></Button>
        )}
      </div>
    </div>
  );
};

export default AdminMasterTable;
