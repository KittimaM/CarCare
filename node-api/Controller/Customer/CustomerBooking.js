var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const CustomerBooking = (req, res, next) => {
  try {
    const { car_no, car_size, service_type, service_date, payment_type } =
      req.body;
    const token = req.headers.authorization.split(" ")[1];
    const { id, phone } = jwt.verify(token, secret);
    Conn.execute(
      `INSERT INTO booking(car_no, car_size, service_type, service_date, payment_type, customer_user_phone, customer_user_id, status) VALUES (?,?,?,?,?,?,?,"processing")`,
      [car_no, car_size, service_type, service_date, payment_type, phone, id],
      function (error, result) {
        if (error) {
          res.json({ status: "ERROR", msg: error });
        } else {
          const insertId = result.insertId;
          res.json({ status: "SUCCESS", msg: insertId });
        }
      }
    );
  } catch (error) {
    res.json({ status: "ERROR", msg: "token expired" });
  }
};

const CustomerGetServiceChoice = (req, res, next) => {
  const { car_size_id } = req.body;
  Conn.execute(
    `SELECT * FROM service WHERE car_size_id = ? AND is_available = 1`,
    [car_size_id],
    function (error, results) {
      if (error) {
        res.json({ status: "ERROR", msg: error });
      } else if (results.length == 0) {
        res.json({ status: "NO DATA", msg: "NO DATA" });
      } else {
        res.json({ status: "SUCCESS", msg: results });
      }
    }
  );
};

module.exports = {
  CustomerBooking,
  CustomerGetServiceChoice,
};
