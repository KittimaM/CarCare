import React, { useEffect, useState } from "react";
import { GetAllBooking, GetAllExpense, PostExpense } from "../Api";

const AdminAccount = () => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const getAllList = () => {
    let jsonData = [];
    GetAllBooking('WHERE processing_status = "Paid"').then((response) => {
      const { status, msg } = response;
      if (status == "SUCCESS") {
        msg.map((item) => {
          let dataToInsert = {
            list: item.car_no,
            income: item.service_price,
            expense: 0,
            isIncome: true,
            isExpense: false,
          };
          setTotal(parseInt(total) + parseInt(item.service_price));
          jsonData.push(dataToInsert);
        });
        GetAllExpense().then((response) => {
          const { status, msg } = response;
          if (status == "SUCCESS") {
            msg.map((item) => {
              let dataToInsert = {
                list: item.list,
                income: 0,
                expense: item.expense,
                isIncome: false,
                isExpense: true,
              };
              setTotal(parseInt(total) - parseInt(item.expense));
              jsonData.push(dataToInsert);
            });
            setList(jsonData);
          } else {
            console.log("status: ", status, ", msg: ", msg);
          }
        });
      } else {
        console.log("status: ", status, ", msg: ", msg);
      }
    });
  };
  useEffect(() => {
    getAllList();
  }, []);

  const handleAddIncome = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("income"));
  };

  const handleAddExpense = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      list: data.get("list"),
      expense: data.get("expense"),
    };
    PostExpense(jsonData).then((response) => {
      const { status, msg } = response;
      if (status == "SUCCESS") {
        getAllList();
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleAddIncome}>
        <label>Income</label>
        <input type="text" name="list" />
        <label>Price</label>
        <input type="number" name="income" />
        <button type="submit">Add Income</button>
      </form>
      <form onSubmit={handleAddExpense}>
        <label>Expense</label>
        <input type="text" name="list" />
        <label>Price</label>
        <input type="number" name="expense" />
        <button type="submit">Add Expense</button>
      </form>
      <table>
        <thead>
          <tr>
            <td>list</td>
            <td>income</td>
            <td>expense</td>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((item) => (
              <tr>
                <td>{item.list}</td>
                <td>{item.isIncome && item.income}</td>
                <td>{item.isExpense && item.expense}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <p>total : {total && total}</p>
    </div>
  );
};

export default AdminAccount;
