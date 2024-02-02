var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const AdminGetAllPaymentType = (req, res, next) => {
  Conn.execute("SELECT * FROM payment_type", function (error, results) {
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

const AdminAddPaymentType = (req, res, next) => {
  const { payment_type } = req.body;
  Conn.execute(
    "INSERT INTO payment_type(payment_type) VALUES (?)",
    [payment_type],
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

const AdminUpdatePaymentType = (req, res, next) => {
  const { id, payment_type, is_available } = req.body;
  Conn.execute(
    "UPDATE payment_type SET payment_type = ?, is_available = ? WHERE id = ?",
    [payment_type, is_available, id],
    function (error, result) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else {
        res.json({ status: "SUCCESS", msg: "SUCCESS" });
      }
    }
  );
};

const AdminDeletePaymentType = (req, res, next) => {
  const { id } = req.body;
  Conn.execute(
    "DELETE FROM payment_type WHERE id = ?",
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

module.exports = {
  AdminAddPaymentType,
  AdminGetAllPaymentType,
  AdminUpdatePaymentType,
  AdminDeletePaymentType,
};
