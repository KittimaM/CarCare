import React, { useEffect, useState } from "react";
import { Button } from "../Module";
import { GetPermission } from "../Api";


// ---------------------

import SidebarAdmin from "./SidebarAdmin";




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

    <SidebarAdmin/>



    
    <div className='ml-72 mt-16'>
            <div className='container '>

                    {/* --------stat-------- */}
                    <div className="w-full mt-10 tabs tabs-lifted  stats stats-vertical lg:stats-horizontal shadow bg-yellow-100 shadow-mda">

                        <div className="stat bg-red-200">
                            <div className="stat-title">Now</div>
                            <div className="stat-value">A015</div>
                            <div className="stat-desc">Queue Number</div>
                        </div>
                
                        <div className="stat">
                            <div className="stat-title">Waiting</div>
                            <div className="stat-value">4</div>
                            <div className="stat-desc">Queue</div>
                        </div>

                        <div className="stat bg-green-200">
                            <div className="stat-title">Total amount</div>
                            <div className="stat-value">31K</div>
                            <div className="stat-desc">Jan 1st </div>
                        </div>
                        
                    </div>

                    {/* -------tab------- */}

                    <div role="tablist" className="grid tabs tabs-lifted mt-10">
                        <input type="radio" name="my_tabs_2" role="tab" className="tab " aria-label="channel 1" checked />
                        <div role="tabpanel" className="tab-content  bg-base-200 border-base-300 rounded-box p-6">
                            Waiting (Queue) channel 1
                            <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                <th>Queue Number</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Time</th>
                                <th>Car Number</th>
                                <th>Size</th>
                                <th>Status</th>
                                <th></th>
                                <th>Edit</th>
                                <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>             
                                <td>
                                    <div className="flex items-center gap-3">
                                    
                                    <div>
                                        <div className="font-bold">A016</div>
                                        
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    Daniel
                                    
                                </td>
                                <td>0898765432</td>
                                <td>14.00 pm</td>
                                <td>6กด5310</td>
                                <td>M</td>
                                <td>Waiting</td>

                                
                                <th>
                                    <button className="btn bg-green-300 btn-md">Start</button>
                                </th>
                                <th>
                                    <button className="btn bg-blue-300 btn-md">Edit</button>
                                </th>
                                <th>
                                    <button className="btn bg-red-300 btn-md">Delete</button>
                                </th>
                                </tr>


                                {/* row 2 */}
                                <tr>             
                                <td>
                                    <div className="flex items-center gap-3">
                                    
                                    <div>
                                        <div className="font-bold">A016</div>
                                        
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    John
                                    
                                </td>
                                <td>0898765424</td>
                                <td>13.00 pm</td>
                                <td>1ก6365</td>
                                <td>S</td>
                                <td>Waiting</td>

                                
                                <th>
                                    <button className="btn bg-green-300 btn-md">Start</button>
                                </th>
                                <th>
                                    <button className="btn bg-blue-300 btn-md">Edit</button>
                                </th>
                                <th>
                                    <button className="btn bg-red-300 btn-md">Delete</button>
                                </th>
                                </tr>
                            
                            </tbody>
                                        
                            </table>
                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tab " aria-label="channel 2"  />
                        <div role="tabpanel" className="tab-content  bg-pink-50 border-base-300 rounded-box p-6">
                            Waiting (Queue) channel 2
                            <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                <th>Queue Number</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Time</th>
                                <th>Car Number</th>
                                <th>Size</th>
                                <th>Status</th>
                                <th></th>
                                <th>Edit</th>
                                <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>             
                                <td>
                                    <div className="flex items-center gap-3">
                                    
                                    <div>
                                        <div className="font-bold">A016</div>
                                        
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    Daniel
                                    
                                </td>
                                <td>0898765432</td>
                                <td>14.00 pm</td>
                                <td>6กด5310</td>
                                <td>M</td>
                                <td>Waiting</td>

                                
                                <th>
                                    <button className="btn bg-green-300 btn-md">Start</button>
                                </th>
                                <th>
                                    <button className="btn bg-blue-300 btn-md">Edit</button>
                                </th>
                                <th>
                                    <button className="btn bg-red-300 btn-md">Delete</button>
                                </th>
                                </tr>


                                {/* row 2 */}
                                <tr>             
                                <td>
                                    <div className="flex items-center gap-3">
                                    
                                    <div>
                                        <div className="font-bold">A016</div>
                                        
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    John
                                    
                                </td>
                                <td>0898765424</td>
                                <td>13.00 pm</td>
                                <td>1ก6365</td>
                                <td>S</td>
                                <td>Waiting</td>

                                
                                <th>
                                    <button className="btn bg-green-300 btn-md">Start</button>
                                </th>
                                <th>
                                    <button className="btn bg-blue-300 btn-md">Edit</button>
                                </th>
                                <th>
                                    <button className="btn bg-red-300 btn-md">Delete</button>
                                </th>
                                </tr>
                            
                            </tbody>
                                        
                            </table>
                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tab " aria-label="In Process"  />
                        <div role="tabpanel" className="tab-content  bg-orange-50 border-base-300 rounded-box p-6">
                                In Process
                                <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                <th>Queue Number</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Car Number</th>
                                <th>Size</th>
                                <th>Status</th>
                                <th></th>
                                {/* <th>Edit</th>
                                <th>Delete</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>             
                                <td>
                                    <div className="flex items-center gap-3">
                                    
                                    <div>
                                        <div className="font-bold">A016</div>
                                        
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    Daniel
                                    
                                </td>
                                <td>0898765432</td>
                                <td>6กด5310</td>
                                <td>M</td>
                                <td>In Process</td>

                                
                                <th>
                                    <button className="btn bg-green-300 btn-md">Finish</button>
                                </th>
                                {/* <th>
                                    <button className="btn bg-blue-300 btn-md">Edit</button>
                                </th>
                                <th>
                                    <button className="btn bg-red-300 btn-md">Delete</button>
                                </th> */}
                                </tr>


                                {/* row 2 */}
                                <tr>             
                                <td>
                                    <div className="flex items-center gap-3">
                                    
                                    <div>
                                        <div className="font-bold">A016</div>
                                        
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    John
                                    
                                </td>
                                <td>0898765424</td>
                                <td>1ก6365</td>
                                <td>S</td>
                                <td>In Process</td>

                                
                                <th>
                                    <button className="btn bg-green-300 btn-md">Finish</button>
                                </th>
                                {/* <th>
                                    <button className="btn bg-blue-300 btn-md">Edit</button>
                                </th>
                                <th>
                                    <button className="btn bg-red-300 btn-md">Delete</button>
                                </th> */}
                                </tr>
                            
                            </tbody>
                                        
                            </table>
                        </div>

                       
                        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Payment" />
                        <div role="tabpanel" className="tab-content  bg-blue-50 border-base-300 rounded-box p-6">
                            Payment
                            <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Time</th>
                                <th>Total Price</th>
                                <th></th>
                        
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>             
                                <td>
                                    <div className="flex items-center gap-3">
                                    
                                    <div>
                                        <div className="font-bold">Hart Hagerty</div>
                                        <div className="text-sm opacity-50">United States</div>
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br/>
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>Purple</td>
                                <td>Purple</td>

                                <th></th>
                                
                                </tr>

                                {/* row 2 */}
                                
                            
                            </tbody>
                                        
                            </table>
                        </div>


                    </div>
                  
            </div>
           
        </div>


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
