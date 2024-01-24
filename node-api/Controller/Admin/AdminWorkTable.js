var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const AdminWorkTable = (req, res, next) => {
  Conn.execute(`SELECT * FROM work_table`, function (error, results) {
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

const AdminAddWorkTable = (req, res, next) => {
  const { staff_id, day_off } = req.body;
  Conn.execute(
    `INSERT INTO work_table(staff_id, day_off) VALUES (?,?)`,
    [staff_id, day_off],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        res.json({ status: "SUCCESS", msg: "SUCCESS" });
      }
    }
  );
};

const AdminUpdateWorkTable = (req, res, next) => {
  const { staff_id, day_off } = req.body;
  Conn.execute(
    `UPDATE work_table SET day_off = ? WHERE staff_id = ?`,
    [day_off, staff_id],
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
  AdminWorkTable,
  AdminAddWorkTable,
  AdminUpdateWorkTable,
};
