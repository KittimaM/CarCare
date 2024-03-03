import React, { useEffect, useState } from "react";
import {
  DeletePaymentType,
  GetAllPaymentType,
  PostAddPaymentType,
  UpdatePaymentType,
  GetPermission,
} from "../Api";
import SidebarAdmin from "./SidebarAdmin";

const AdminPaymentType = () => {
  const [paymentType, setPaymentType] = useState([]);
  const [editItem, setEditItem] = useState();
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    fetchPaymentType();
    GetPermission().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setPermission(msg["have_payment_type_access"]);
      } else {
        console.log(data);
      }
    });
  }, []);

  const fetchPaymentType = () => {
    GetAllPaymentType().then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setPaymentType(msg);
      } else {
        console.log(data);
      }
    });
  };
  const handleAddPaymentType = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      payment_type: data.get("payment_type"),
    };
    PostAddPaymentType(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchPaymentType();
      } else {
        console.log(data);
      }
    });
  };
  const handleSelectEditId = (selectedItem) => {
    setEditItem(selectedItem);
  };
  const handleEditPaymentType = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      id: editItem.id,
      payment_type: data.get("payment_type"),
      is_available: data.get("is_available"),
    };
    UpdatePaymentType(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        setEditItem(null);
        fetchPaymentType();
      } else {
        console.log(data);
      }
    });
  };
  const handleDeleteRole = (event) => {
    event.preventDefault();
    const jsonData = {
      id: event.target.value,
    };
    DeletePaymentType(jsonData).then((data) => {
      const { status, msg } = data;
      if (status == "SUCCESS") {
        fetchPaymentType();
      } else {
        console.log(data);
      }
    });
  };

  return (
    <>
      <SidebarAdmin />
      <div className="ml-80 mt-16">
        <div className="text-lg bg-yellow-100 mb-5 "> Payment Type page</div>

        {permission && permission.includes("2") && (
          <form onSubmit={handleAddPaymentType}>
            <label>Payment Type</label>
            <input type="text" name="payment_type" />
            <button className="btn" type="submit">
              Submit Payment
            </button>
          </form>
        )}

        {paymentType && (
          <table className="table table-lg">
            <thead>
              <tr>
                <td>id</td>
                <td>payment_type</td>
                <td>is_available</td>
                {permission && permission.includes("3") && <td>Edit</td>}
                {permission && permission.includes("4") && <td>Delete</td>}
              </tr>
            </thead>
            <tbody>
              {paymentType.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.payment_type}</td>
                  <td>
                    {item.is_available == 1 ? "available" : "not available"}
                  </td>
                  {permission && permission.includes("3") && (
                    <td>
                      <button
                        className="btn"
                        onClick={() => handleSelectEditId(item)}
                        value={item.id}
                      >
                        Edit
                      </button>
                    </td>
                  )}
                  {permission && permission.includes("4") && (
                    <td>
                      <button
                        className="btn"
                        onClick={handleDeleteRole}
                        value={item.id}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {permission && permission.includes("3") && editItem && (
          <form onSubmit={handleEditPaymentType}>
            <label>Payment Type</label>
            <input
              type="text"
              name="payment_type"
              defaultValue={editItem.payment_type}
            />
            <select name="is_available" defaultValue={editItem.is_available}>
              <option value={1}>available</option>
              <option value={0}>not available</option>
            </select>
            <button className="btn" type="submit">
              Submit Payment
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default AdminPaymentType;
