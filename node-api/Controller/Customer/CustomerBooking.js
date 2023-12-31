var jwt = require("jsonwebtoken");
const Conn = require("../../db");
const secret = process.env.SECRET_WORD;

const CustomerBooking = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    const { phone, name } = decoded;
    const {
      car_no,
      car_size_id,
      car_size,
      customer_name,
      customer_phone,
      service,
      payment_type,
      car_color,
      start_service_datetime,
      end_service_datetime,
      service_usetime,
    } = req.body;

    Conn.execute(
      `INSERT INTO booking(car_no, car_size_id, car_size, customer_name, customer_phone, service, payment_type, created_by_id, created_by, car_color, start_service_datetime, end_service_datetime, service_usetime) 
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        car_no,
        car_size_id,
        car_size,
        customer_name,
        customer_phone,
        service,
        payment_type,
        phone,
        name,
        car_color,
        start_service_datetime,
        end_service_datetime,
        service_usetime,
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
  } catch (err) {
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
