var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const AdminIncome = (req, res, next) => {
  Conn.execute("SELECT * FROM income", function (error, results) {
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

const AdminAddIncome = (req, res, next) => {
  const { list, income } = req.body;
  Conn.execute(
    "INSERT INTO income(list, income, created_at) VALUES(?,?,NOW())",
    [list, income],
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
  AdminIncome,
  AdminAddIncome,
};
