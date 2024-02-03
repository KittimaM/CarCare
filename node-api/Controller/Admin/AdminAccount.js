var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const AdminGetAllAccount = (req, res, next) => {
  Conn.execute("SELECT * FROM account", function (error, results) {
    if (error) {
      res.json({ status: "ERROR", msg: error });
    }
    if (results.length == 0) {
      res.json({ status: "NO DATA", msg: "NO DATA" });
    } else {
      res.json({ status: "SUCCESS", msg: results });
    }
  });
};

const AdminAddAccount = (req, res, next) => {
  const { label, income, expense, is_income, is_expense, date } = req.body;
  Conn.execute(
    "INSERT INTO account (label, income, expense, is_income, is_expense, date) VALUES (?,?,?,?,?,?)",
    [label, income, expense, is_income, is_expense, date],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        const insertId = result.insertId;
        res.json({ status: "SUCCESS", msg: insertId });
      }
    }
  );
};

const AdminDeleteAccount = (req, res, next) => {
  const { id } = req.body;
  Conn.execute(
    "DELETE FROM account WHERE id = ?",
    [id],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        res.json({ status: "SUCCESS", msg: "SUCCESS" });
      }
    }
  );
};

const AdminUpdateAccount = (req, res, next) => {
  const { id, label, income, expense, is_income, is_expense, date} = req.body;
  Conn.execute(
    "UPDATE account SET label = ?, income = ?, expense = ?, is_income = ?, is_expense = ?, date = ? WHERE id = ?",
    [label, income, expense, is_income, is_expense, date, id],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        res.json({ status: "SUCCESS", msg: "SUCCESS" });
      }
    }
  );
};
module.exports = {
  AdminGetAllAccount,
  AdminAddAccount,
  AdminDeleteAccount,
  AdminUpdateAccount,
};
