import React, { useEffect, useState } from "react";
import {
  GetAllIncome,
  GetAllExpense,
  PostAddExpense,
  PostAddIncome,
} from "../Api";
import { TimeFormat } from "../Module";

const AdminAccount = () => {
  const [list, setList] = useState([]);
  const [totalSummary, setTotalSummary] = useState(0);

  const getAllList = () => {
    let jsonData = [];
    let total = 0;
    GetAllIncome().then((response) => {
      const { status, msg } = response;
      if (status == "SUCCESS") {
        msg.map((item) => {
          let dataToInsert = {
            list: item.list,
            income: item.income,
            expense: 0,
            isIncome: true,
            isExpense: false,
            date: item.created_at.split("T")[0],
            time: item.created_at.split("T")[1],
          };
          total = total + parseInt(item.income);
          jsonData.push(dataToInsert);
        });
      } else {
        console.log("status: ", status, ", msg: ", msg);
      }
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
            date: item.created_at.split("T")[0],
            time: item.created_at.split("T")[1],
          };
          total = total - parseInt(item.expense);
          jsonData.push(dataToInsert);
        });
        setTotalSummary(total);
        setList(jsonData);
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
    const jsonData = {
      list: data.get("list"),
      income: data.get("income"),
    };
    PostAddIncome(jsonData).then((response) => {
      const { status, msg } = response;
      if (status == "SUCCESS") {
        getAllList();
      }
    });
  };

  const handleAddExpense = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      list: data.get("list"),
      expense: data.get("expense"),
    };
    PostAddExpense(jsonData).then((response) => {
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
            <td>date</td>
            <td>time</td>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((item) => (
              <tr>
                <td>{item.list}</td>
                <td>{item.isIncome && item.income}</td>
                <td>{item.isExpense && item.expense}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <p>total : {totalSummary && totalSummary}</p>
    </div>
  );
};

export default AdminAccount;
