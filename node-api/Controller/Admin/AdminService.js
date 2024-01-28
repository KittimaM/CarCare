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
  const { service, description, car_size_id, car_size, used_time, price } =
    req.body;
  Conn.execute(
    "INSERT INTO service (service, description, car_size_id, car_size, used_time, price) VALUES (?, ?, ?, ? ,?, ?)",
    [service, description, car_size_id, car_size, used_time, price],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        res.json({ status: "SUCCESS" });
      }
    }
  );
};

const AdminDeleteService = (req, res, next) => {
  const { id } = req.body;
  Conn.execute(
    "DELETE FROM service WHERE id = ?",
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

const AdminUpdateService = (req, res, next) => {
  const {
    id,
    service,
    description,
    car_size_id,
    car_size,
    used_time,
    price,
    is_available,
  } = req.body;
  Conn.execute(
    "UPDATE service SET service = ? , description = ? , car_size_id = ?, car_size = ?, used_time = ?, price = ?, is_available = ? WHERE id = ?",
    [
      service,
      description,
      car_size_id,
      car_size,
      used_time,
      price,
      is_available,
      id,
    ],
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
  AdminService,
  AdminAddService,
  AdminDeleteService,
  AdminUpdateService,
};
