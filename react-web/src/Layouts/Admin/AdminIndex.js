import React, { useEffect, useState } from "react";
import { Button } from "../Module";
import { GetPermission } from "../Api";


// ---------------------

import { Avatar, Dropdown, Navbar ,Sidebar} from 'flowbite-react';
import { BiBuoy } from 'react-icons/bi';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';





const AdminIndex = () => {
  const [permission, setPermission] = useState(null);
  useEffect(() => {
    GetPermission().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        console.log(msg);
        setPermission(msg);
      } else {
        console.log(data);
      }
    });
  }, []);

  return (

    <>

<Sidebar aria-label="Sidebar with content separator example " className='h-screen '>
      
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        {permission && permission["have_staff_user_access"].includes("1") && (
          <Button to="/admin/dayoff"  name="User" >
            <Sidebar.Item href="#" icon={HiChartPie}>
                Dashboard
            </Sidebar.Item>
          </Button>
          
        )}

        {permission && permission["have_staff_user_access"].includes("1") && (
              <Sidebar.Item to="/admin/dayoff"  icon={HiChartPie}>
                  Dashboard
              </Sidebar.Item>
            
          )}

        
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox}>
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>


    {/* <div>
      {permission && permission["have_staff_user_access"].includes("1") && (
        <Button to="/admin/user" name="User" />
      )}
      {permission && permission["have_car_size_access"].includes("1") && (
        <Button to="/admin/carsize" name="Car Size" />
      )}
      {permission && permission["have_service_access"].includes("1") && (
        <Button to="/admin/service" name="Service" />
      )}
      {permission && permission["have_booking_access"].includes("1") && (
        <Button to="/admin/booking" name="Booking" />
      )}
      {permission && permission["have_role_access"].includes("1") && (
        <Button to="/admin/role" name="Role" />
      )}
      {permission && permission["have_account_access"].includes("1") && (
        <Button to="/admin/account" name="Account Management" />
      )}
      {permission && permission["have_schedule_access"].includes("1") && (
        <Button to="/admin/schedule" name="Schedule" />
      )}
      {permission && permission["have_payment_access"].includes("1") && (
        <Button to="/admin/payment" name="Payment" />
      )}
      {permission && permission["have_payment_type_access"].includes("1") && (
        <Button to="/admin/paymenttype" name="Payment Type" />
      )}
      {permission && permission["have_on_leave_list_access"].includes("1") && (
        <Button to="/admin/onleave" name="On Leave List" />
      )}
      {permission &&
        permission["have_on_leave_personal_access"].includes("1") && (
          <Button to="/admin/onleave/personal" name="On Leave" />
        )}
      {permission && permission["have_day_off_list_access"].includes("1") && (
        <Button to="/admin/dayoff" name="Day Off List" />
      )}
      {permission && permission["have_on_leave_type_access"].includes("1") && (
        <Button to="/admin/onleave-type" name="On Leave Type" />
      )}
    </div> */}
    </>
    
  );
};

export default AdminIndex;
