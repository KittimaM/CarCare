var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const CustomerBooking = (req, res, next) => {
  const {
    token,
    car_no,
    car_size,
    service_type,
    service_date,
    payment_type,
  } = req.body;

  jwt.verify(token, secret, function (error, decoded) {
    if (error) {
      res.json({ status: "ERROR", msg: error });
    }
    const phone = decoded.phone;
    const status = "processing";
    if (phone.length == 0) {
      res.json({ status: "ERROR", msg: "No phone number" });
    } else {
      Conn.execute(
        `INSERT INTO booking(car_no, car_size, service_type, service_date, payment_type, customer_user_phone, status) VALUES (?,?,?,?,?,?,?)`,
        [
          car_no,
          car_size,
          service_type,
          service_date,
          payment_type,
          phone,
          status,
        ],
        function (error, result) {
          if (error) {
            res.json({ status: "ERROR", msg: error });
          } else {
            const insertId = result.insertId;
            res.json({ status: "SUCCESS" ,msg: insertId});
          }
        }
      );
    }
  });
};

module.exports = {
  CustomerBooking,
};
