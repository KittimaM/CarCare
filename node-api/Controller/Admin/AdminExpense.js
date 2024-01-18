var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const AdminExpense = (req, res, next) => {
  Conn.execute("SELECT * FROM expense", function (error, results) {
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

const AdminAddExpense = (req, res, next) => {
  const { list, expense } = req.body;
  Conn.execute(
    "INSERT INTO expense(list, expense) VALUES(?,?)",
    [list, expense],
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

module.exports = {
  AdminExpense,
  AdminAddExpense,
};
