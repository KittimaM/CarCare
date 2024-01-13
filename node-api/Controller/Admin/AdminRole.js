var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const AdminGetAllRole = (req, res, next) => {
  Conn.execute("SELECT * FROM role", function (error, results) {
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

const AdminAddRole = (req, res, next) => {
  const {
    role,
    have_staff_user_access,
    have_car_size_access,
    have_booking_access,
    have_role_access,
    have_service_access
  } = req.body;
  Conn.execute(
    "INSERT INTO role(role, have_staff_user_access, have_car_size_access, have_booking_access, have_role_access, have_service_access) VALUES (?,?,?,?,?,?)",
    [
      role,
      have_staff_user_access,
      have_car_size_access,
      have_booking_access,
      have_role_access,
      have_service_access
    ],
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
  AdminGetAllRole,
  AdminAddRole,
};
