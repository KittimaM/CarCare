var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const CustomerCar = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, secret);
    Conn.execute(
      `SELECT * FROM customer_car WHERE customer_id = ? `,
      [id],
      function (error, results) {
        if (error) {
          res.json({ status: "ERROR", msg: error });
        }
        if (results.length == 0) {
          res.json({ status: "NO DATA", msg: "NO DATA" });
        } else {
          res.json({ status: "SUCCESS", msg: results });
        }
      }
    );
  } catch (error) {
    res.json({ status: "ERROR", msg: "token expired" });
  }
};

const CustomerAddCustomerCar = (req, res, next) => {
  try {
    const { car_no, car_color, car_size_id, car_size } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const { id, phone, name } = jwt.verify(token, secret);
    Conn.execute(
      "INSERT INTO customer_car(customer_id, customer_phone, customer_name, car_size_id, car_size, car_no, car_color) VALUES (?,?,?,?,?,?,?)",
      [id, phone, name, car_size_id, car_size, car_no, car_color],
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

module.exports = {
  CustomerCar,
  CustomerAddCustomerCar,
};
