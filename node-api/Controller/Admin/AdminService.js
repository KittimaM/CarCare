var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const AdminService = (req, res, next) => {
  Conn.execute("SELECT * FROM service", function (error, results) {
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

const AdminAddService = (req, res, next) => {
  const { service, description, car_size_id, car_size, used_time } = req.body;
  Conn.execute(
    "INSERT INTO service (service, description, car_size_id, car_size, used_time) VALUES (?, ?, ?, ? ,?)",
    [service, description, car_size_id, car_size, used_time],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        res.json({ status: "SUCCESS" });
      }
    }
  );
};

module.exports = {
  AdminService,
  AdminAddService,
};
